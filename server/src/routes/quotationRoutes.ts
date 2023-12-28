import { Router, Request, Response, NextFunction } from "express"
import { httpStatus } from "../helpers"
import { HTMLGeneration } from "../HTML/createTable"

// import quotation handlers
import {
  addQuotationTransaction,
  updateQuotationTransaction,
  deleteQuotationTransaction,
  getQuotationTransactionList,
  addQuotationType,
  updateQuotationType,
  deleteQuotationType,
  getQuotationTypeList,
  getPendingQuotations,
  getApprovedQuotations,
  getQuotationHistory,
  getQuotationData,
  getQuotationDataForPDF
} from "../handlers/QuotationHandler";

//router instance
const router = Router();

//routes
router.post("/addQuotationTransaction", addQuotationTransaction);
router.post("/updateQuotationTransaction", updateQuotationTransaction);
router.post("/deleteQuotationTransaction", deleteQuotationTransaction);
router.get("/getQuotationTransactionList", getQuotationTransactionList);
router.post("/addQuotationType", addQuotationType);
router.post("/updateQuotationType", updateQuotationType);
router.post("/deleteQuotationType", deleteQuotationType);
router.get("/getQuotationTypeList", getQuotationTypeList);
router.get("/getPendingQuotations", getPendingQuotations);
router.get("/getApprovedQuotations", getApprovedQuotations);
router.get("/getQuotationHistory", getQuotationHistory);
router.get("/getQuotationData", getQuotationData)
router.get(
  "/get-quote-pdf/:id/:type",
  async (req: Request<any>, res: Response, next: NextFunction) => {
    // if (req.params.type.includes("Initial")) {
    getQuotationDataForPDF(req.params.id)
      .then((quotetransPdf) => {
        if (quotetransPdf == null) {
          res.status(httpStatus.No_Content)
        } else {

          HTMLGeneration(quotetransPdf).then((result: any) => {
            if (result.status) {
              res.status(httpStatus.OK).json(result)
            } else {
              if (!result.status) {
                res.status(httpStatus.Bad_Request).json({
                  code: httpStatus.Bad_Request,
                  error: result.error,
                })
              } else {
                res.status(httpStatus.Bad_Request).json({
                  code: httpStatus.Bad_Request,
                  error: "Error While Generate Quote PDF",
                })
              }
            }
          }).catch((err) =>
            res.status(httpStatus.Bad_Request).json({
              code: httpStatus.Bad_Request,
              error: err,
            }))
          // res.json(quotetransPdf)
        }
      })
      .catch((err) =>
        res.status(httpStatus.Bad_Request).json({
          code: httpStatus.Bad_Request,
          error: err,
        })
      )
  }


  // }
)

module.exports = router;
