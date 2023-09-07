// prisma client import
import { PrismaClient } from "@prisma/client";

// Request, Response import from express
import { Request, Response } from "express";

// custom http status codes
import http_status from "../helpers/http_status";

// prisma client
const prisma = new PrismaClient();

// add mix design
export const addMixDesign = async (req: Request, res: Response) => {
  const mixDesignName = req.body.mixDesignName;
  const mixDesignCode = req.body.mixDesignCode;
  const wcRatio = req.body.wcRatio;
  const documentPath = req.body.documentPath;
  const minRate = req.body.minRate;
  const pumpMixtestingLabName = req.body.pumpMixtestingLabName;
  const expirationDate = req.body.expirationDate;
  const plantid = req.body.plantid;
  const psi = req.body.psi;
  const mixType = req.body.mixType;
  const stoneType = req.body.stoneType;
  const airType = req.body.airType;
  const proportions = req.body.proportions;
  const status = req.body.status;
  const internalDesignType = req.body.internalDesignType;
  const isActive = req.body.isActive;

  const requiredFields = [
    "mixDesignName",
    "mixDesignCode",
    "wcRatio",
    "documentPath",
    "minRate",
    "pumpMixtestingLabName",
    "expirationDate",
    "plantid",
    "psi",
    "mixType",
    "stoneType",
    "airType",
    "proportions",
    "status",
    "internalDesignType",
  ];

  // Check if any required fields are missing
  const missingFields = requiredFields.filter(field => !req.body[field]);
  if (missingFields.length > 0) {
    return res.status(http_status.Bad_Request).json({
      status: http_status.Bad_Request,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  try {
    await prisma.mix_design.create({
      data: {
        mixDesignName: mixDesignName,
        mixDesignCode: mixDesignCode,
        wcRatio: wcRatio,
        documentPath: documentPath,
        minRate: minRate,
        stoneType: stoneType,
        airType: airType,
        proportions: proportions,
        status: status,
        internalDesignType: internalDesignType,
        pumpMixtestingLabName: pumpMixtestingLabName,
        expirationDate: expirationDate,
        psi: psi,
        mixType: mixType,
        plantid: plantid,
        isActive: isActive,
      },
    });
    return res
      .status(http_status.Created)
      .json({ message: "Mix Design created" });
  } catch (error) {
    console.log(error);
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Failed to create mix design" });
  }
};

// update mix design
export const updateMixDesign = async (req: Request, res: Response) => {
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

    const updatedata = await prisma.mix_design.update({
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

// delete mix design
export const deleteMixDesign = async (req: Request, res: Response) => {
  try {
    const updatedata = await prisma.mix_design.delete({
      where: {
        id: req.body.id,
      },
    });

    if (updatedata) {
      const backup = await prisma.mix_design_backup.create({
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

// get mix designs list by type (get api)
export const getMixDesigns = async (req: Request, res: Response) => {
  try {
    if (req.query.mixType != null) {
      const type = req.query.mixType.toString();
      const mixDesignList = await prisma.mix_design.findMany({
        where: {
          mixType: type,
        },
      });
      if (mixDesignList) {
        return res
          .status(http_status.OK)
          .json({ data: mixDesignList, message: "Success" });
      } else {
        return res
          .status(http_status.Not_Found)
          .json({ data: null, message: "No Data Found" });
      }
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

export const getMixDesignById = async (req: Request, res: Response) => {
  try {
    if (req.query.id != null) {
      const id = req.query.id.toString();
      const mixDesign = await prisma.mix_design.findUnique({
        where: {
          id: id,
        },
      });
      if (mixDesign) {
        return res
          .status(http_status.OK)
          .json({ data: mixDesign, message: "Success" });
      } else {
        return res
          .status(http_status.Not_Found)
          .json({ data: null, message: "No Data Found" });
      }
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
