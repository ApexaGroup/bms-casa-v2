import { Router } from "express";

// import user handlers
import {
    addQuoteExtraCharge,
    updateQuoteExtraCharge,
    deleteQuoteExtraCharge,
    getQuoteExtraChargesByQuotationId,
} from "../handlers/quoteExtraChargeHandler";

//router instance
const router = Router();

//routes
router.post("/addQuoteExtraCharge", addQuoteExtraCharge);
router.post("/updateQuoteExtraCharge", updateQuoteExtraCharge);
router.post("/deleteQuoteExtraCharge", deleteQuoteExtraCharge);
router.get("/getQuoteExtraChargesByQuotationId", getQuoteExtraChargesByQuotationId);

module.exports = router;
