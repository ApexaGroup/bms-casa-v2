// prisma client import
import { PrismaClient } from "@prisma/client";

// Request, Response import from express
import { Request, Response } from "express";

// custom http status codes
import http_status from "../helpers/http_status";

// prisma client
const prisma = new PrismaClient();

// add terms and condition full detail
export const addTnCFullDetail = async (req: Request, res: Response) => {
    const srNo = req.body.srNo;
    const title = req.body.title;
    const description = req.body.description;
    const plantId = req.body.plantId;

    if (
        srNo === "" ||
        title === "" ||
        description === "" ||
        plantId === ""
    ) {
        return res.status(http_status.Bad_Request).json({
            status: http_status.Bad_Request,
            message: "Provide required details",
        });
    }

    try {
        await prisma.terms_and_condition_full_detail.create({
            data: {
                srNo,
                title,
                description,
                plantId
            },
        });
        return res.status(http_status.Created).json({ message: "Created" });
    } catch (error) {
        return res
            .status(http_status.Failed_To_Create_Resource)
            .json({ message: "Failed to create" });
    }
};

// update terms and condition full detail
export const updateTnCFullDetail = async (req: Request, res: Response) => {
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

        const updatedata = await prisma.terms_and_condition_full_detail.update({
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

// delete terms and condition full detail
export const deleteTnCFullDetail = async (req: Request, res: Response) => {
    try {
        const updatedata = await prisma.terms_and_condition_full_detail.delete({
            where: {
                id: req.body.id,
            },
        });

        if (updatedata) {
            const backup = await prisma.terms_and_condition_full_detail_backup.create({
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

// get terms and condition full detail list
export const getTnCFullDetails = async (req: Request, res: Response) => {
    try {
        const list = await prisma.terms_and_condition_full_detail.findMany();

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
        return res
            .status(http_status.Bad_Request)
            .json({ message: "Failed to get data" });
    }
};
