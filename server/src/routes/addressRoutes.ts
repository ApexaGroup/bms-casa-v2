import { Router } from "express";

// import user handlers
import {
  addAddress,
  updateAddress,
  deleteAddress,
  getAdresses,
} from "../handlers/addressHandler";

//router instance
const router = Router();

//routes
router.post("/addAddress", addAddress);
router.post("/updateAddress", updateAddress);
router.post("/deleteAddress", deleteAddress);
router.get("/getAdresses", getAdresses);

module.exports = router;
