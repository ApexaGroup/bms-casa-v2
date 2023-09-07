// prisma client import
import { PrismaClient } from "@prisma/client";

// Request, Response import from express
import { Request, Response } from "express";

// custom http status codes
import http_status from "../helpers/http_status";

// prisma client
const prisma = new PrismaClient();

// add project manager
export const addProjectManager = async (req: Request, res: Response) => {
  const requiredFields = [
    "construction_company_id",
    "project_manager_name",
    "contact_no",
    "email",
    "alternate_email",
    "cell_phone",
    "address",
    "city",
    "state",
    "zipcode",
  ];

  const missingFields = [];

  for (const field of requiredFields) {
    if (!req.body[field] || req.body[field] === "") {
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    return res.status(http_status.Bad_Request).json({
      status: http_status.Bad_Request,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const {
    construction_company_id,
    project_manager_name,
    contact_no,
    email,
    alternate_email,
    cell_phone,
    address,
    isActive,
    city,
    state,
    zipcode,
    notes,
  } = req.body;

  try {
    await prisma.project_manager.create({
      data: {
        construction_company_id,
        project_manager_name,
        contact_no,
        cell_phone,
        email,
        alternate_email,
        address,
        isActive,
        city,
        state,
        zipcode,
        notes,
      },
    });
    return res.status(http_status.Created).json({ message: "PM created" });
  } catch (error) {
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Failed to create PM" });
  }
};

// update project manager
export const updateProjectManager = async (req: Request, res: Response) => {
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

    const updatedata = await prisma.project_manager.update({
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

// delete project manager
export const deleteProjectManager = async (req: Request, res: Response) => {
  try {
    const updatedata = await prisma.project_manager.delete({
      where: {
        id: req.body.id,
      },
    });

    if (updatedata) {
      const backup = await prisma.project_manager_backup.create({
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

// get project managers
export const getProjectManagers = async (req: Request, res: Response) => {
  try {
    const project_managers = await prisma.project_manager.findMany();

    if (project_managers) {
      return res
        .status(http_status.OK)
        .json({ data: project_managers, message: "Success" });
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
