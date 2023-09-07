// prisma client import
import { PrismaClient } from "@prisma/client";

// Request, Response import from express
import { Request, Response } from "express";
import { verifyAccessToken } from "../auth/token";
import jwtDecode from "jwt-decode";

// custom http status codes
import http_status from "../helpers/http_status";

// prisma client
const prisma = new PrismaClient();

// add lead information
export const addLeadInfo = async (req: Request, res: Response) => {
  const leadTitle = req.body.leadTitle;
  const address = req.body.address;
  const status = req.body.status;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const BidDueDate = req.body.BidDueDate;
  const estimatedYards = req.body.estimatedYards;
  const notes = req.body.notes;
  const isActive = req.body.isActive;

  const requiredFields = ["leadTitle", "address", "status", "startDate", "endDate", "BidDueDate", "estimatedYards"];

  // Check if any required fields are missing
  const missingFields = requiredFields.filter(field => !req.body[field]);
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

  console.log(userData);

  if (userData) {
    try {
      const addLead = await prisma.lead_information.create({
        data: {
          leadTitle: leadTitle,
          address: address,
          status: status,
          startDate: startDate,
          endDate: endDate,
          BidDueDate: BidDueDate,
          estimatedYards: estimatedYards,
          notes: notes,
          isActive: isActive,
        },
      });

      if (addLead) {
        let obj = [
          { key: "Lead Title", value: addLead.leadTitle },
          { key: "Address", value: addLead.address },
          { key: "Start Date", value: addLead.startDate },
          { key: "End Date", value: addLead.endDate },
          { key: "Bid Due Date", value: addLead.BidDueDate },
          { key: "Estimated Yards", value: addLead.estimatedYards },
          { key: "Notes", value: addLead.notes },
        ];

        const addAuditLog = await prisma.audit_logs.create({
          data: {
            userName: userData?.firstName,
            email: userData?.username,
            contactNumber: userData?.contactNo,
            updatedField: JSON.stringify(obj),
            operationName: "Lead created",
            sectionName: "lead",
            sectionDataid: addLead.id,
          },
        });

        if (addAuditLog) {
          return res
            .status(http_status.Created)
            .json({ message: "Lead created", data: addLead });
        } else {
          return res
            .status(http_status.Bad_Request)
            .json({ message: "Something went wrong in audit logs" });
        }
      } else {
        return res
          .status(http_status.Bad_Request)
          .json({ message: "Something went wrong" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(http_status.Failed_To_Create_Resource)
        .json({ message: "Failed to create lead" });
    }
  }
};

// update lead information
export const updateLeadInfo = async (req: Request, res: Response) => {
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

    const updatedata = await prisma.lead_information.update({
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

// delete lead information
export const deleteLeadInfo = async (req: Request, res: Response) => {
  try {
    const updatedata = await prisma.lead_information.delete({
      where: {
        id: req.body.id,
      },
    });

    if (updatedata) {
      const backup = await prisma.lead_information_backup.create({
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

// get lead information list
export const getLeadInfo = async (req: Request, res: Response) => {
  try {
    const lead_list = await prisma.lead_information.findMany();

    if (lead_list) {
      return res
        .status(http_status.OK)
        .json({ data: lead_list, message: "Success" });
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
