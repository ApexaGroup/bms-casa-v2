import { Router } from "express";

// import quality control handlers
import {
  addQualityControl,
  updateQualityControl,
  deleteQualityControl,
  getQualityControls,
} from "../handlers/qualityControlHandler";

//router instance
const router = Router();

//routes
router.post("/addQualityControl", addQualityControl);
router.post("/updateQualityControl", updateQualityControl);
router.post("/deleteQualityControl", deleteQualityControl);
router.get("/getQualityControls", getQualityControls);

module.exports = router;
