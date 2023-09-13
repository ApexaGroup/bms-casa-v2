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

