// prisma client import
import { PrismaClient } from "@prisma/client";

// Request, Response import from express
import { Request, Response } from "express";
import jwtDecode from "jwt-decode";

// custom http status codes
import http_status from "../helpers/http_status";

// prisma client
const prisma = new PrismaClient();

// add quality-control
export const addQualityControl = async (req: Request, res: Response) => {
  const loadingPlant = req.body.loadingPlant;
  const mixDesignName = req.body.mixDesignName;
  const mixDesignId = req.body.mixDesignId;
  const minPrice = req.body.minPrice;
  const approvedDesign = req.body.approvedDesign;
  const tr3 = req.body.tr3;
  const tr2 = req.body.tr2;
  const price = req.body.price;
  const estimatedYards = req.body.estimatedYards;
  const section_name = req.body.section_name;
  const section_id = req.body.section_id;

  if (
    section_id === "" ||
    loadingPlant === "" ||
    mixDesignName === "" ||
    mixDesignId === "" ||
    minPrice === "" ||
    approvedDesign === "" ||
    tr3 === "" ||
    tr2 === "" ||
    price === "" ||
    section_name === "" ||
    estimatedYards === ""
  ) {
    return res.status(http_status.Bad_Request).json({
      status: http_status.Bad_Request,
      message: "Provide required details",
    });
  }

  try {
    const addQC = await prisma.quality_control.create({
      data: {
        section_id: section_id,
        loadingPlant: loadingPlant,
        mixDesignName: mixDesignName,
        mixDesignId: mixDesignId,
        minPrice: minPrice,
        approvedDesign: approvedDesign,
        tr3: tr3,
        tr2: tr2,
        price: price,
        estimatedYards: estimatedYards,
        section_name: section_name,
      },
    });

    let data = await jwtDecode(JSON.stringify(req.headers.authorization));

    const dataString = JSON.stringify(data);

    const id = JSON.parse(dataString).id;

    const userData = await prisma.user.findUnique({ where: { id: id } });

    if (addQC) {
      let obj = [
        { key: "Loading Plant", value: addQC.loadingPlant },
        { key: "Mix Design Name", value: addQC.mixDesignName },
        { key: "Min Price", value: addQC.minPrice },
        { key: "Approved Design", value: addQC.approvedDesign },
        { key: "tr3", value: addQC.tr3 },
        { key: "t2", value: addQC.tr2 },
        { key: "Price", value: addQC.price },
        { key: "Estimated Yards", value: addQC.estimatedYards },
      ];

      if (userData) {
        const addAuditLog = await prisma.audit_logs.create({
          data: {
            userName: userData?.firstName,
            email: userData?.username,
            contactNumber: userData?.contactNo,
            updatedField: JSON.stringify(obj),
            operationName: "Quality control created",
            sectionName: section_name,
            sectionDataid: addQC.id,
          },
        });
        if (addAuditLog) {
          return res
            .status(http_status.Created)
            .json({ message: "Quality control created", data: null });
        } else {
          return res
            .status(http_status.Bad_Request)
            .json({ message: "Something went wrong in audit logs" });
        }
      }
    } else {
      return res
        .status(http_status.Bad_Request)
        .json({ message: "Something went wrong in adding quality control" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Failed to create quality control" });
  }
};

// update qualit control
export const updateQualityControl = async (req: Request, res: Response) => {
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

    const updatedata = await prisma.quality_control.update({
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

// delete quality control
export const deleteQualityControl = async (req: Request, res: Response) => {
  try {
    const updatedata = await prisma.quality_control.delete({
      where: {
        id: req.body.id,
      },
    });

    if (updatedata) {
      const backup = await prisma.quality_control_backup.create({
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

// get quality control list
export const getQualityControls = async (req: Request, res: Response) => {
  try {
    if (req.query.section_name != null) {
      let list = [];
      const section_name = req.query.section_name.toString();
      const quality_control_list = await prisma.quality_control.findMany({
        where: {
          section_name: section_name,
        },
      });

      for (let i = 0; i < quality_control_list.length; i++) {
        const mixDesign = await prisma.mix_design.findUnique({
          where: {
            id: quality_control_list[i].mixDesignId,
          },
        });

        list.push({
          id: quality_control_list[i].id,
          section_name: quality_control_list[i].section_name,
          subMittedDesign: mixDesign?.documentPath,
          minRate: mixDesign?.minRate,
          loadingPlant: quality_control_list[i].loadingPlant,
          mixDesignName: quality_control_list[i].mixDesignName,
          minPrice: quality_control_list[i].minPrice,
          approvedDesign: quality_control_list[i].approvedDesign,
          tr3: quality_control_list[i].tr3,
          tr2: quality_control_list[i].tr2,
          price: quality_control_list[i].price,
          estimatedYards: quality_control_list[i].estimatedYards,
          createdOn: quality_control_list[i].createdOn,
          modifiedOn: quality_control_list[i].modifiedOn,
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
