import { Router } from "express";

// import user handlers
import {
  addOpportunity,
  updateOpportunity,
  deleteOpportunity,
  getOpportunities,
  getPlants,
} from "../handlers/opportunitiesHandler";

//router instance
const router = Router();

//routes
router.post("/addOpportunity", addOpportunity);
router.post("/updateOpportunity", updateOpportunity);
router.post("/deleteOpportunity", deleteOpportunity);
router.get("/getOpportunities", getOpportunities);
router.get("/getPlants", getPlants);

module.exports = router;
