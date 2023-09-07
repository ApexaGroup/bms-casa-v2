import { Router } from "express";

// import user handlers
import {
  addPremiumRates,
  updatePremiumRates,
  deletePremiumRates,
  getPremiumRates,
} from "../handlers/premiumRatesHandler";

//router instance
const router = Router();

//routes
router.post("/addPremiumRates", addPremiumRates);
router.post("/updatePremiumRates", updatePremiumRates);
router.post("/deletePremiumRates", deletePremiumRates);
router.get("/getPremiumRates", getPremiumRates);

module.exports = router;
