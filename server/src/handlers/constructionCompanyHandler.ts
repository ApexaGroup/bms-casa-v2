// prisma client import
import { PrismaClient } from "@prisma/client";

// Request, Response import from express
import { Request, Response } from "express";

// custom http status codes
import http_status from "../helpers/http_status";

// prisma client
const prisma = new PrismaClient();

// add construction company
export const addConstructionCompany = async (req: Request, res: Response) => {
  const construction_company_name = req.body.construction_company_name;
  const contact_person_name = req.body.contact_person_name;
  const contact_no = req.body.contact_no;
  const alternate_no = req.body.alternate_no;
  const email = req.body.email;
  const address = req.body.address;
  const isActive = req.body.isActive;
  const city = req.body.city;
  const state = req.body.state;
  const zipcode = req.body.zipcode;
  const notes = req.body.notes;

  const requiredFields = [
    "construction_company_name",
    "contact_person_name",
    "contact_no",
    "alternate_no",
    "email",
    "address",
    "city",
    "state",
    "zipcode",
  ];

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
    await prisma.construction_company.create({
      data: {
        construction_company_name: construction_company_name,
        contact_person_name: contact_person_name,
        contact_no: contact_no,
        alternate_no: alternate_no,
        email: email,
        address: address,
        isActive: isActive,
        city: city,
        state: state,
        zipcode: zipcode,
        notes: notes,
      },
    });
    return res.status(http_status.Created).json({ message: "Company created" });
  } catch (error) {
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Failed to create company" });
  }

};

// update construction company
export const updateConstructionCompany = async (
  req: Request,
  res: Response
) => {
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

    const updatedata = await prisma.construction_company.update({
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

// get construction companies
export const getConstructionCompanies = async (req: Request, res: Response) => {
  try {
    const construction_company = await prisma.construction_company.findMany();

    if (construction_company) {
      return res
        .status(http_status.OK)
        .json({ data: construction_company, message: "Success" });
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

export const deleteConstructionCompany = async (
  req: Request,
  res: Response
) => {
  try {
    const updatedata = await prisma.construction_company.delete({
      where: {
        id: req.body.id,
      },
    });

    if (updatedata) {
      const backup = await prisma.construction_company_backup.create({
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
