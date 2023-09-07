import { Router } from "express";

// import user handlers
import {
  addLeadInfo,
  updateLeadInfo,
  deleteLeadInfo,
  getLeadInfo,
} from "../handlers/LeadInformationHandler";

//router instance
const router = Router();

//routes
router.post("/addLeadInfo", addLeadInfo);
router.post("/updateLeadInfo", updateLeadInfo);
router.post("/deleteLeadInfo", deleteLeadInfo);
router.get("/getLeadInfo", getLeadInfo);

module.exports = router;
