// prisma client import
import { PrismaClient } from "@prisma/client";

// Request, Response import from express
import { Request, Response } from "express";

// custom http status codes
import http_status from "../helpers/http_status";

// prisma client
const prisma = new PrismaClient();

// add address
export const addAddress = async (req: Request, res: Response) => {
  const address = req.body.address;
  const cross_street = req.body.cross_street;
  const borough = req.body.borough;
  const state = req.body.state;
  const zipcode = req.body.zipcode;
  const isActive = req.body.isActive;

  const requiredFields = ["address", "cross_street", "borough", "state", "zipcode"];
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
    await prisma.address_lead_section.create({
      data: {
        address: address,
        cross_street: cross_street,
        borough: borough,
        state: state,
        zipcode: zipcode,
        isActive: isActive,
      },
    });
    return res.status(http_status.Created).json({ message: "Address created" });
  } catch (error) {
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Failed to create address" });
  }
};

// update address
export const updateAddress = async (req: Request, res: Response) => {
  try {
    const { id, ...requestData } = req.body;
    const updateObject = {};

    for (const [key, value] of Object.entries(requestData)) {
      if (value !== "") {
        updateObject[key] = value;
      }
    }

    if (Object.keys(updateObject).length === 0) {
      return res.status(http_status.Bad_Request).json({
        status: http_status.Bad_Request,
        message: "No valid fields provided for update.",
      });
    }

    const updatedata = await prisma.address_lead_section.update({
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

// delete address
export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const updatedata = await prisma.address_lead_section.delete({
      where: {
        id: req.body.id,
      },
    });

    if (updatedata) {
      const backup = await prisma.address_lead_section_backup.create({
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

// get address list
export const getAdresses = async (req: Request, res: Response) => {
  try {
    const address_list = await prisma.address_lead_section.findMany();

    if (address_list) {
      return res
        .status(http_status.OK)
        .json({ data: address_list, message: "Success" });
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
