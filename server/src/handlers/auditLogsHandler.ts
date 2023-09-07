// prisma client import
import { PrismaClient } from "@prisma/client";

// Request, Response import from express
import { Request, Response } from "express";
import jwtDecode from "jwt-decode";

// custom http status codes
import http_status from "../helpers/http_status";

// prisma client
const prisma = new PrismaClient();

// add audit logs
export const addLogs = async (req: Request, res: Response) => {
  const updatedField = req.body.updatedField;
  const operationName = req.body.operationName;
  const sectionName = req.body.sectionName;
  const sectionDataid = req.body.sectionDataid;

  let data = await jwtDecode(JSON.stringify(req.headers.authorization));

  const dataString = JSON.stringify(data);

  const id = JSON.parse(dataString).id;

  const userData = await prisma.user.findUnique({ where: { id: id } });
  if (userData) {
    try {
      await prisma.audit_logs.create({
        data: {
          userName: userData?.firstName,
          email: userData?.username,
          contactNumber: userData?.contactNo,
          updatedField: JSON.stringify(updatedField),
          operationName: operationName,
          sectionName: sectionName,
          sectionDataid: sectionDataid,
        },
      });
      return res.status(http_status.Created).json({ message: "log created" });
    } catch (error) {
      console.log(error);
      return res
        .status(http_status.Failed_To_Create_Resource)
        .json({ message: "Failed to create log" });
    }
  }
};

// get audit logs by sectionName and sectionDataid
export const getAuditLogs = async (req: Request, res: Response) => {
  try {
    let list = [];
    const auditLogs = await prisma.audit_logs.findMany({
      where: {
        sectionName: req.query.sectionName?.toString(),
      },
    });

    if (auditLogs) {
      for (let i = 0; i < auditLogs.length; i++) {
        list.push({
          contactNumber: auditLogs[i].contactNumber,
          createdOn: auditLogs[i].createdOn.toLocaleDateString(),
          email: auditLogs[i].email,
          id: auditLogs[i].id,
          modifiedOn: auditLogs[i].modifiedOn,
          operationName: auditLogs[i].operationName,
          sectionDataid: auditLogs[i].sectionDataid,
          sectionName: auditLogs[i].sectionName,
          updatedField: auditLogs[i].updatedField,
          userName: auditLogs[i].userName,
        });
      }

      return res
        .status(http_status.OK)
        .json({ data: list, message: "Success" });
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
