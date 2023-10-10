import { Router } from "express";

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
  getQuotationHistory
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

module.exports = router;
