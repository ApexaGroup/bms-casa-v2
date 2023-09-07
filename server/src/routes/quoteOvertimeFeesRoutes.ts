import { Router } from "express";

// import user handlers
import {
    addQuoteOvertimefees,
    updateQuoteOvertimefees,
    deleteQuoteOvertimeFees,
    getQuoteOvertimeFeesByQuotationId,
} from "../handlers/quoteOvertimefeesHandler";

//router instance
const router = Router();

//routes
router.post("/addQuoteOvertimefees", addQuoteOvertimefees);
router.post("/updateQuoteOvertimefees", updateQuoteOvertimefees);
router.post("/deleteQuoteOvertimeFees", deleteQuoteOvertimeFees);
router.get("/getQuoteOvertimeFeesByQuotationId", getQuoteOvertimeFeesByQuotationId);

module.exports = router;
