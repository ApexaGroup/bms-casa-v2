import { Router } from "express";

// import user handlers
import {
  addShortLoad,
  updateShortLoad,
  deleteShortLoad,
  getShortLoads,
} from "../handlers/shortLoadHandler";

//router instance
const router = Router();

//routes
router.post("/addShortLoad", addShortLoad);
router.post("/updateShortLoad", updateShortLoad);
router.post("/deleteShortLoad", deleteShortLoad);
router.get("/getShortLoad", getShortLoads);

module.exports = router;
