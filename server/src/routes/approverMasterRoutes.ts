import { Router, Request, Response, NextFunction } from "express"
import { createApprovalTrans } from "../handlers/approverMasterHandler"
import { httpStatus } from "../helpers"

//router instance
const router = Router();

//routes
router.post(
    "/approvaltrans/:id",
    (req: Request<any>, res: Response, next: NextFunction) => {
        createApprovalTrans(req.body, req.params.id)
            .then((ApprovalTrans) => {
                if (ApprovalTrans == null) {
                    res.status(httpStatus.Conflict).json({
                        "message": "Quote Already send!!"
                    })
                } else {
                    res.status(httpStatus.Created).json(ApprovalTrans)
                }
            })
            .catch((err) => {
                res.status(httpStatus.Bad_Request).json({
                    code: httpStatus.Bad_Request,
                    error: err,
                })
            })
    }
)

module.exports = router;