// prisma client import
import { PrismaClient } from "@prisma/client";

// Request, Response import from express
import { Request, Response } from "express";

// custom http status codes
import http_status from "../helpers/http_status";

// prisma client
const prisma = new PrismaClient();

// add quote overtime fees
export const addQuoteOvertimefees = async (req: Request, res: Response) => {
    const title = req.body.title;
    const price = req.body.price;
    const unit = req.body.unit;
    const quoteNote = req.body.quoteNote;
    const fieldDescription = req.body.fieldDescription;
    const plantid = req.body.plantid;
    const isActive = req.body.isActive;
    const quoteId = req.body.quoteId;

    if (
        quoteId === "" ||
        title === "" ||
        price === "" ||
        unit === "" ||
        quoteNote === "" ||
        fieldDescription === ""
    ) {
        return res.status(http_status.Bad_Request).json({
            status: http_status.Bad_Request,
            message: "Provide required details",
        });
    }

    try {
        await prisma.quote_overtime_charge.create({
            data: {
                quotationId: quoteId,
                title: title,
                price: price,
                unit: unit,
                quoteNote: quoteNote,
                fieldDescription: fieldDescription,
                plantid: plantid,
                isActive: isActive,
            },
        });
        return res
            .status(http_status.Created)
            .json({ message: "Quote Overtime fees created" });
    } catch (error) {
        return res
            .status(http_status.Failed_To_Create_Resource)
            .json({ message: "Failed to create Quote Overtime fees" });
    }
};

// update quote overtime fees
export const updateQuoteOvertimefees = async (req: Request, res: Response) => {
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

        const updatedata = await prisma.quote_overtime_charge.update({
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

// delete quote overtime fees
export const deleteQuoteOvertimeFees = async (req: Request, res: Response) => {
    try {
        const updatedata = await prisma.quote_overtime_charge.delete({
            where: {
                id: req.body.id,
            },
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

// get quote overtime fees list by id
export const getQuoteOvertimeFeesByQuotationId = async (req: Request, res: Response) => {
    try {
        const quotationId = req.query.quotationId.toString();
        const overtime_fees_list = await prisma.quote_overtime_charge.findMany({
            where: {
                quotationId: quotationId
            }
        });

        if (overtime_fees_list) {
            return res
                .status(http_status.OK)
                .json({ data: overtime_fees_list, message: "Success" });
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
