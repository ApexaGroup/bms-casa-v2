// prisma client import
import { PrismaClient } from "@prisma/client";

// Request, Response import from express
import { Request, Response } from "express";

// custom http status codes
import http_status from "../helpers/http_status";

// prisma client
const prisma = new PrismaClient();

interface createApproverTransParam {
    approvalStatus: string
    approvalLevel: string
    userId: string
    quotationId: number
    plantId: number
    isEmailQuoteSend: boolean
    isAddendumsQuoteSend: boolean
    notes: string
    quoteType: string

}

export const createApprovalTrans = async (
    param: createApproverTransParam,
    id: string
) => {
    try {
        const ApprovalTrans = await prisma.approval_trans.create({
            data: {
                approvalStatus: param.approvalStatus,
                approvalLevel: "0",
                userId: param.userId,
                isEmailQuoteSend: param.isEmailQuoteSend,
                isAddendumsQuoteSend: param.isAddendumsQuoteSend,
                notes: param.notes,
                quoteType: param.quoteType,
                quotationId: id,
            }
        })
        return ApprovalTrans
    } catch (err: any) {
        throw err
    }
}

export const getApprovalTrans = async () => {
    try {

        const approvalTransData = await prisma.approval_trans.findMany()
        return approvalTransData

    } catch (err: any) {
        throw err
    }
}

export interface UpdateApprovalTransParam {
    id: number
    approvalStatus: string
    notes: string
    approvalLevel: number
    userId: number
    userEmail: string
    quoteId: string
    origin: string
    userName: string,
    qtype: string
}
export const updateApprovalTransById = async (req: Request, res: Response) => {
    try {
        const { id, ...requestData } = req.body;
        const updateObject = {};

        for (const [key, value] of Object.entries(requestData)) {
            if (value !== "") {
                updateObject[key] = value;
            }
        }

        if (Object.keys(updateObject).length === 0) {
            return res.status(http_status.Bad_Request).json({
                status: http_status.Bad_Request,
                message: "No valid fields provided for update.",
            });
        }

        const updatedata = await prisma.address_lead_section.update({
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
}

