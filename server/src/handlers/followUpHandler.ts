// prisma client import
import { PrismaClient } from "@prisma/client";

// Request, Response import from express
import { Request, Response } from "express";
import jwtDecode from "jwt-decode";

// custom http status codes
import http_status from "../helpers/http_status";

// prisma client
const prisma = new PrismaClient();

// add follow-up
export const addFollowUp = async (req: Request, res: Response) => {
  const contactDate = req.body.contactDate;
  const contactPersonName = req.body.contactPersonName;
  const description = req.body.description;
  const contactNo = req.body.contactNo;
  const nextMeetingDate = req.body.nextMeetingDate;
  const typeOfContact = req.body.typeOfContact;
  const email = req.body.email;
  const onSiteVisit = req.body.onSiteVisit;
  const section_name = req.body.section_name;
  const lead_id = req.body.lead_id;

  const requiredFields = [
    "contactDate",
    "contactPersonName",
    "description",
    "contactNo",
    "nextMeetingDate",
    "typeOfContact",
    "section_name",
    "lead_id",
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
    const addFollwup = await prisma.followup_section.create({
      data: {
        lead_id: lead_id,
        contactDate: contactDate,
        contactPersonName: contactPersonName,
        description: description,
        contactNo: contactNo,
        nextMeetingDate: nextMeetingDate,
        typeOfContact: typeOfContact,
        email: email,
        onSiteVisit: onSiteVisit,
        section_name: section_name,
      },
    });

    let data = await jwtDecode(JSON.stringify(req.headers.authorization));
    const dataString = JSON.stringify(data);
    const id = JSON.parse(dataString).id;
    const userData = await prisma.user.findUnique({ where: { id: id } });

    if (addFollwup) {
      let obj = [
        { key: "Contact Person Name", value: addFollwup.contactPersonName },
        { key: "Type of Contact", value: addFollwup.typeOfContact },
        { key: "Contact Date", value: addFollwup.contactDate },
        { key: "Contact No", value: addFollwup.contactNo },
        { key: "Contact Email", value: addFollwup.email },
        { key: "Follow up Description", value: addFollwup.description },
        { key: "On Site Visit", value: addFollwup.onSiteVisit },
        { key: "Next Meeting Date", value: addFollwup.nextMeetingDate },
      ];

      if (userData) {
        const addAuditLog = await prisma.audit_logs.create({
          data: {
            userName: userData?.firstName,
            email: userData?.username,
            contactNumber: userData?.contactNo,
            updatedField: JSON.stringify(obj),
            operationName: "Follow-up created",
            sectionName: section_name,
            sectionDataid: addFollwup.id,
          },
        });
        if (addAuditLog) {
          return res
            .status(http_status.Created)
            .json({ message: "Follow-up created", data: null });
        } else {
          return res
            .status(http_status.Bad_Request)
            .json({ message: "Something went wrong in audit logs" });
        }
      }
    } else {
      return res
        .status(http_status.Bad_Request)
        .json({ message: "Something went wrong in adding followup" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Failed to create follow up" });
  }

};

// update follow up
export const updatefollowup = async (req: Request, res: Response) => {
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

    const updatedata = await prisma.followup_section.update({
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
    console.log(err)
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Error" });
  }

};

// delete follow up
export const deleteFollowup = async (req: Request, res: Response) => {
  try {
    const updatedata = await prisma.followup_section.delete({
      where: {
        id: req.body.id,
      },
    });

    if (updatedata) {
      const backup = await prisma.followup_section_backup.create({
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

// get followup list
export const getFollowups = async (req: Request, res: Response) => {
  try {
    if (req.query.section_name != null) {
      let list = [];
      const section_name = req.query.section_name.toString();
      const follow_up_list = await prisma.followup_section.findMany({
        where: {
          section_name: section_name,
        },
      });

      for (let i = 0; i < follow_up_list.length; i++) {
        list.push({
          id: follow_up_list[i].id,
          lead_id: follow_up_list[i].lead_id,
          contactDate: follow_up_list[i].contactDate,
          contactPersonName: follow_up_list[i].contactPersonName,
          description: follow_up_list[i].description,
          contactNo: follow_up_list[i].contactNo,
          nextMeetingDate: follow_up_list[i].nextMeetingDate,
          typeOfContact: follow_up_list[i].typeOfContact,
          email: follow_up_list[i].email,
          onSiteVisit: follow_up_list[i].onSiteVisit,
          section_name: follow_up_list[i].section_name,
          createdOn: follow_up_list[i].createdOn,
          modifiedOn: follow_up_list[i].modifiedOn,
        });
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
    }
  } catch (err) {
    console.log(err);
    return res
      .status(http_status.Bad_Request)
      .json({ message: "Failed to get data" });
  }
};
