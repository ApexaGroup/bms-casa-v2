// prisma client import
import { PrismaClient } from "@prisma/client";

// Request, Response import from express
import { Request, Response } from "express";

// custom http status codes
import http_status from "../helpers/http_status";

// prisma client
const prisma = new PrismaClient();

// add extra charge
export const addExtraCharge = async (req: Request, res: Response) => {
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
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  try {
    await prisma.extra_charge.create({
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
    return res.status(http_status.Created).json({ message: "Extra Charge created" });
  } catch (error) {
    console.log(error)
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Failed to create extra charge" });
  }

};

// update extra charge
export const updateExtraCharge = async (req: Request, res: Response) => {
  try {
    const { id, ...requestData } = req.body;
    const updateObject = {};

    // Populate updateObject with only non-empty fields from the requestData
    for (const [key, value] of Object.entries(requestData)) {
      if (value !== undefined && value !== null) {
        updateObject[key] = value;
      }
    }

    if (Object.keys(updateObject).length === 0) {
      return res.status(http_status.Bad_Request).json({
        status: http_status.Bad_Request,
        message: "No valid fields provided for update.",
      });
    }

    const updatedata = await prisma.extra_charge.update({
      where: {
        id: id,
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

// delete extra charge
export const deleteExtraCharge = async (req: Request, res: Response) => {
  try {
    const updatedata = await prisma.extra_charge.delete({
      where: {
        id: req.body.id,
      },
    });

    if (updatedata) {
      const backup = await prisma.extra_charge_backup.create({
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

// get extra charges list
export const getExtraCharges = async (req: Request, res: Response) => {
  try {
    const extra_charges_list = await prisma.extra_charge.findMany();

    if (extra_charges_list) {
      return res
        .status(http_status.OK)
        .json({ data: extra_charges_list, message: "Success" });
    } else {
      return res
        .status(http_status.Not_Found)
        .json({ data: null, message: "No Data Found" });
    }
  } catch (err) {
    return res
      .status(http_status.Bad_Request)
      .json({ message: "Failed to get data" });
  }
};
