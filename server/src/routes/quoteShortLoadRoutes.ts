import { Router } from "express";

// import user handlers
import {
    addQuoteShortLoad,
    updateQuoteShortLoad,
    deleteQuoteShortLoad,
    getShortLoadsByQuotationId,
} from "../handlers/quoteShortLoadHandler";

//router instance
const router = Router();

//routes
router.post("/addQuoteShortLoad", addQuoteShortLoad);
router.post("/updateQuoteShortLoad", updateQuoteShortLoad);
router.post("/deleteQuoteShortLoad", deleteQuoteShortLoad);
router.get("/getShortLoadsByQuotationId", getShortLoadsByQuotationId);

module.exports = router;
