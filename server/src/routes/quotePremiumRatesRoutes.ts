import { Router } from "express";

// import user handlers
import {
    addQuotePremiumRates,
    updateQuotePremiumRates,
    deleteQuotePremiumRates,
    getPremiumRatesByQuotationId,
} from "../handlers/quotePremiumRatesHandler";

//router instance
const router = Router();

//routes
router.post("/addQuotePremiumRates", addQuotePremiumRates);
router.post("/updateQuotePremiumRates", updateQuotePremiumRates);
router.post("/deleteQuotePremiumRates", deleteQuotePremiumRates);
router.get("/getPremiumRatesByQuotationId", getPremiumRatesByQuotationId);

module.exports = router;
