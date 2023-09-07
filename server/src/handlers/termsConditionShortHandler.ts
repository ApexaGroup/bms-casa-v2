// prisma client import
import { PrismaClient } from "@prisma/client";

// Request, Response import from express
import { Request, Response } from "express";

// custom http status codes
import http_status from "../helpers/http_status";

// prisma client
const prisma = new PrismaClient();

// add terms and condition short detail
export const addTnCShortDetail = async (req: Request, res: Response) => {
    const shortName = req.body.shortName;
    const fullName = req.body.fullName;
    const plantId = req.body.plantId;

    if (
        shortName === "" ||
        fullName === "" ||
        plantId === ""
    ) {
        return res.status(http_status.Bad_Request).json({
            status: http_status.Bad_Request,
            message: "Provide required details",
        });
    }

    try {
        await prisma.terms_and_condition_short_detail.create({
            data: {
                shortName,
                fullName,
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

// update terms and condition short detail
export const updateTnCShortDetail = async (req: Request, res: Response) => {
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

        const updatedata = await prisma.terms_and_condition_short_detail.update({
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

// delete terms and condition short detail
export const deleteTnCShortDetail = async (req: Request, res: Response) => {
    try {
        const updatedata = await prisma.terms_and_condition_short_detail.delete({
            where: {
                id: req.body.id,
            },
        });

        if (updatedata) {
            const backup = await prisma.terms_and_condition_short_detail_backup.create({
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

// get terms and condition short detail list
export const getTnCShortDetails = async (req: Request, res: Response) => {
    try {
        const list = await prisma.terms_and_condition_short_detail.findMany();

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
