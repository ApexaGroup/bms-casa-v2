// prisma client import
import { PrismaClient } from "@prisma/client";

// Request, Response import from express
import { Request, Response } from "express";
import jwtDecode from "jwt-decode";

// custom http status codes
import http_status from "../helpers/http_status";

// prisma client
const prisma = new PrismaClient();

// get plan information
export const getPlantInformation = async (req: Request, res: Response) => {
  try {
    const plantInformationList = await prisma.plant_information.findMany();

    if (plantInformationList) {
      return res
        .status(http_status.OK)
        .json({ data: plantInformationList, message: "Success" });
    } else {
      return res
        .status(http_status.Not_Found)
        .json({ data: null, message: "No Data Found" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(http_status.Bad_Request)
      .json({ message: "Failed to get data" });
  }
};
