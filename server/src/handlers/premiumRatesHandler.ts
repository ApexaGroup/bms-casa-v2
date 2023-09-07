// prisma client import
import { PrismaClient } from "@prisma/client";

// Request, Response import from express
import { Request, Response } from "express";

// custom http status codes
import http_status from "../helpers/http_status";

// prisma client
const prisma = new PrismaClient();

// add premium rates
export const addPremiumRates = async (req: Request, res: Response) => {
  const requiredFields = ["title", "truckHireFee", "plantOpeningFee", "quoteNote", "fieldDescription"];
  const missingFields = [];

  for (const field of requiredFields) {
    if (!req.body[field] || req.body[field].trim() === "") {
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    return res.status(http_status.Bad_Request).json({
      status: http_status.Bad_Request,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const { id, ...requestData } = req.body;

  try {
    const newPremiumRate = await prisma.premium_rates.create({
      data: requestData,
    });

    if (newPremiumRate) {
      return res.status(http_status.Created).json({ message: "Premium rates created" });
    } else {
      return res.status(http_status.Bad_Request).json({ message: "Error creating Premium Rates" });
    }
  } catch (error) {
    console.log(error);
    return res.status(http_status.Failed_To_Create_Resource).json({ message: "Failed to create Premium Rates" });
  }

};

// update premium rates
export const updatePremiumRates = async (req: Request, res: Response) => {
  try {
    const { id, ...requestData } = req.body;
    const updateObject = {};

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

    const updatedata = await prisma.premium_rates.update({
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
    console.log(err)
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Error" });
  }
};

// delete premium rates
export const deletePremiumRates = async (req: Request, res: Response) => {
  try {
    const updatedata = await prisma.premium_rates.delete({
      where: {
        id: req.body.id,
      },
    });

    if (updatedata) {
      const backup = await prisma.premium_rates_backup.create({
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

// get premium rates list
export const getPremiumRates = async (req: Request, res: Response) => {
  try {
    const premium_rates_list = await prisma.premium_rates.findMany();

    if (premium_rates_list) {
      return res
        .status(http_status.OK)
        .json({ data: premium_rates_list, message: "Success" });
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
