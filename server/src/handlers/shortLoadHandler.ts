// prisma client import
import { PrismaClient } from "@prisma/client";

// Request, Response import from express
import { Request, Response } from "express";

// custom http status codes
import http_status from "../helpers/http_status";

// prisma client
const prisma = new PrismaClient();

// add short load
export const addShortLoad = async (req: Request, res: Response) => {
  const title = req.body.title;
  const quoteNote = req.body.quoteNote;
  const fieldDescription = req.body.fieldDescription;
  const plantid = req.body.plantid;
  const isActive = req.body.isActive;

  if (title === "" || quoteNote === "" || fieldDescription === "") {
    return res.status(http_status.Bad_Request).json({
      status: http_status.Bad_Request,
      message: "Provide required details",
    });
  }

  try {
    await prisma.short_load.create({
      data: {
        title: title,
        quoteNote: quoteNote,
        fieldDescription: fieldDescription,
        plantid: plantid,
        isActive: isActive,
      },
    });
    return res
      .status(http_status.Created)
      .json({ message: "Short load created" });
  } catch (error) {
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Failed to create short load" });
  }
};

// update short load
export const updateShortLoad = async (req: Request, res: Response) => {
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

    const updatedata = await prisma.short_load.update({
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

// delete short load
export const deleteShortLoad = async (req: Request, res: Response) => {
  try {
    const updatedata = await prisma.short_load.delete({
      where: {
        id: req.body.id,
      },
    });

    if (updatedata) {
      const backup = await prisma.short_load_backup.create({
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

// get short load list
export const getShortLoads = async (req: Request, res: Response) => {
  try {
    const shortloadlist = await prisma.short_load.findMany();

    if (shortloadlist) {
      return res
        .status(http_status.OK)
        .json({ data: shortloadlist, message: "Success" });
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
