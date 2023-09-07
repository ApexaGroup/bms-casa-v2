import { Router } from "express";

// import user handlers
import {
  addOvertimefees,
  updateOvertimefees,
  deleteOvertimeFees,
  getOvertimeFees,
} from "../handlers/overtimeFeesHandler";

//router instance
const router = Router();

//routes
router.post("/addOvertimeFees", addOvertimefees);
router.post("/updateOvertimeFees", updateOvertimefees);
router.post("/deleteOvertimeFees", deleteOvertimeFees);
router.get("/getOvertimeFees", getOvertimeFees);

module.exports = router;
