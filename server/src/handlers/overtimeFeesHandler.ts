// prisma client import
import { PrismaClient } from "@prisma/client";

// Request, Response import from express
import { Request, Response } from "express";

// custom http status codes
import http_status from "../helpers/http_status";

// prisma client
const prisma = new PrismaClient();

// add overtime fees
export const addOvertimefees = async (req: Request, res: Response) => {
  const title = req.body.title;
  const price = req.body.price;
  const unit = req.body.unit;
  const quoteNote = req.body.quoteNote;
  const fieldDescription = req.body.fieldDescription;
  const plantid = req.body.plantid;
  const isActive = req.body.isActive;

  const requiredFields = ["title", "price", "unit", "quoteNote", "fieldDescription"];
  const missingFields = [];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    return res.status(http_status.Bad_Request).json({
      status: http_status.Bad_Request,
      message: `Missing required details: ${missingFields.join(", ")}`,
    });
  }

  try {
    await prisma.overtime_fees.create({
      data: {
        title: title,
        price: price,
        unit: unit,
        quoteNote: quoteNote,
        fieldDescription: fieldDescription,
        plantid: plantid,
        isActive: isActive,
      },
    });
    return res
      .status(http_status.Created)
      .json({ message: "Overtime fees created" });
  } catch (error) {
    console.log(error)
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Failed to create Overtime fees" });
  }
};

// update overtime fees
export const updateOvertimefees = async (req: Request, res: Response) => {
  const updateObject = {};
  const allowedFields = ["title", "price", "unit", "quoteNote", "fieldDescription", "plantid", "isActive"];
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updateObject[field] = req.body[field];
    }
  }

  if (Object.keys(updateObject).length === 0) {
    return res.status(http_status.Bad_Request).json({
      status: http_status.Bad_Request,
      message: "No valid fields provided for update.",
    });
  }

  try {
    const updatedata = await prisma.overtime_fees.update({
      where: {
        id: req.body.id,
      },
      data: updateObject,
    });

    if (updatedata) {
      return res.status(http_status.OK).json({ message: "Success" });
    } else {
      return res.status(http_status.Bad_Request).json({ message: "Error" });
    }
  } catch (err) {
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Error" });
  }

};

// delete overtime fees
export const deleteOvertimeFees = async (req: Request, res: Response) => {
  try {
    const updatedata = await prisma.overtime_fees.delete({
      where: {
        id: req.body.id,
      },
    });

    if (updatedata) {
      const backup = await prisma.overtime_fees_backup.create({
        data: {
          ...updatedata,
        },
      });

      if (backup) {
        return res.status(http_status.OK).json({ message: "Success" });
      } else {
        return res.status(http_status.Bad_Request).json({ message: "Error" });
      }
    } else {
      return res.status(http_status.Bad_Request).json({ message: "Error" });
    }
  } catch (err) {
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Error" });
  }
};

// get overtime fees list
export const getOvertimeFees = async (req: Request, res: Response) => {
  try {
    const overtime_fees_list = await prisma.overtime_fees.findMany();

    if (overtime_fees_list) {
      return res
        .status(http_status.OK)
        .json({ data: overtime_fees_list, message: "Success" });
    } else {
      return res
        .status(http_status.Not_Found)
        .json({ data: null, message: "No Data Found" });
    }
  } catch (err) {
    return res
      .status(http_status.Bad_Request)
      .json({ message: "Failed to get user" });
  }
};
