import { Router } from "express";

// import user handlers
import {
  addExtraCharge,
  updateExtraCharge,
  deleteExtraCharge,
  getExtraCharges,
} from "../handlers/extraChargeHandler";

//router instance
const router = Router();

//routes
router.post("/addExtraCharge", addExtraCharge);
router.post("/updateExtraCharge", updateExtraCharge);
router.post("/deleteExtraCharge", deleteExtraCharge);
router.get("/getExtraCharges", getExtraCharges);

module.exports = router;
