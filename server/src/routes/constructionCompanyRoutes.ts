import { Router } from "express";

// import user handlers
import {
  addConstructionCompany,
  updateConstructionCompany,
  deleteConstructionCompany,
  getConstructionCompanies,
} from "../handlers/constructionCompanyHandler";

//router instance
const router = Router();

//routes
router.post("/addCC", addConstructionCompany);
router.post("/updateCC", updateConstructionCompany);
router.post("/deleteCC", deleteConstructionCompany);
router.get("/getCC", getConstructionCompanies);

module.exports = router;
