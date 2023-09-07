import { Router } from "express";

// import user handlers
import {
  addProjectManager,
  updateProjectManager,
  deleteProjectManager,
  getProjectManagers,
} from "../handlers/projectManagerHandler";

//router instance
const router = Router();

//routes
router.post("/addPM", addProjectManager);
router.post("/updatePM", updateProjectManager);
router.post("/deletePM", deleteProjectManager);
router.get("/getPMs", getProjectManagers);

module.exports = router;
