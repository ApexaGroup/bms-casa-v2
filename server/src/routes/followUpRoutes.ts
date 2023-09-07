import { Router } from "express";

// import user handlers
import {
  addFollowUp,
  updatefollowup,
  deleteFollowup,
  getFollowups,
} from "../handlers/followUpHandler";

//router instance
const router = Router();

//routes
router.post("/addFollowUp", addFollowUp);
router.post("/updatefollowup", updatefollowup);
router.post("/deleteFollowup", deleteFollowup);
router.get("/getFollowups", getFollowups);

module.exports = router;
