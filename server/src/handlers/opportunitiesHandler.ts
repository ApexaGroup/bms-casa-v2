// prisma client import
import { PrismaClient } from "@prisma/client";

// Request, Response import from express
import { Request, Response } from "express";
import jwtDecode from "jwt-decode";

// custom http status codes
import http_status from "../helpers/http_status";

// prisma client
const prisma = new PrismaClient();

// add opportunity
export const addOpportunity = async (req: Request, res: Response) => {
  const requiredFields = [
    "lead_name",
    "address_id",
    "estimated_yard",
    "plant_id",
    "construction_company",
    "project_manager",
    "startDate",
    "endDate",
    "bidDueDate",
    "status",
    "notes",
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

  let data = await jwtDecode(JSON.stringify(req.headers.authorization));

  const dataString = JSON.stringify(data);

  const id = JSON.parse(dataString).id;

  const userData = await prisma.user.findUnique({ where: { id: id } });

  try {
    if (userData) {
      const addOpportunity = await prisma.opportunities.create({
        data: {
          lead_name: req.body.lead_name,
          address_id: req.body.address_id,
          estimated_yard: req.body.estimated_yard,
          plant_id: req.body.plant_id,
          construction_company: req.body.construction_company,
          project_manager: req.body.project_manager,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          bidDueDate: req.body.bidDueDate,
          status: req.body.status,
          notes: req.body.notes,
        },
      });

      if (addOpportunity) {
        let obj = [
          { key: "Lead Name", value: addOpportunity.lead_name },
          { key: "Address", value: addOpportunity.address_id },
          { key: "Estimated Yard", value: addOpportunity.estimated_yard },
          { key: "Plant", value: addOpportunity.plant_id },
          {
            key: "Construction Company",
            value: addOpportunity.construction_company,
          },
          { key: "Project Manager", value: addOpportunity.project_manager },
          { key: "Start Date", value: addOpportunity.startDate },
          { key: "End Date", value: addOpportunity.endDate },
          { key: "Bid Due Date", value: addOpportunity.bidDueDate },
          { key: "Notes", value: addOpportunity.notes },
          { key: "Status", value: addOpportunity.status },
        ];

        const addAuditLog = await prisma.audit_logs.create({
          data: {
            userName: userData?.firstName,
            email: userData?.username,
            contactNumber: userData?.contactNo,
            updatedField: JSON.stringify(obj),
            operationName: "Opportunity created",
            sectionName: "opportunity",
            sectionDataid: addOpportunity.id,
          },
        });

        if (addAuditLog) {
          return res
            .status(http_status.Created)
            .json({ message: "Opportunity created", data: addOpportunity.id });
        } else {
          return res
            .status(http_status.Bad_Request)
            .json({ message: "Something went wrong in audit logs" });
        }
      }
    } else {
      return res
        .status(http_status.Internal_Server_Error)
        .json({ message: "Something went wrong" });
    }
  } catch (error) {
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Failed to create opportunity" });
  }
};

// update opportunity
export const updateOpportunity = async (req: Request, res: Response) => {
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

    const updatedata = await prisma.opportunities.update({
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

// delete opportunity
export const deleteOpportunity = async (req: Request, res: Response) => {
  try {
    const updatedata = await prisma.opportunities.delete({
      where: {
        id: req.body.id,
      },
    });

    if (updatedata) {
      const backup = await prisma.opportunities_backup.create({
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

// get opportunity list
export const getOpportunities = async (req: Request, res: Response) => {
  try {
    const opportunity_list = await prisma.opportunities.findMany();
    let list = [];

    for (let i = 0; i < opportunity_list.length; i++) {
      const pmid = opportunity_list[i].project_manager.split("_");
      const project_manager = await prisma.project_manager.findUnique({
        where: {
          id: pmid[1],
        },
      });

      const construction_company = await prisma.construction_company.findUnique({
        where: {
          construction_company_name: opportunity_list[i].construction_company
        }
      })

      if (project_manager) {
        list.push({
          ...opportunity_list[i],
          project_manager_email: project_manager.email,
          construction_company_id: construction_company.id
        });
      }
    }

    if (list) {
      return res
        .status(http_status.OK)
        .json({ data: list, message: "Success" });
    } else {
      return res
        .status(http_status.Not_Found)
        .json({ data: null, message: "No Data Found" });
    }
  } catch (err) {
    console.log(err)
    return res
      .status(http_status.Bad_Request)
      .json({ message: "Failed to get data" });
  }
};

export const getPlants = async (req: Request, res: Response) => {
  try {
    const plant_list = await prisma.plant_information.findMany();

    if (plant_list) {
      return res
        .status(http_status.OK)
        .json({ data: plant_list, message: "Success" });
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
