import { Router } from "express";

// import user handlers
import {
  addMixDesign,
  updateMixDesign,
  deleteMixDesign,
  getMixDesigns,
  getMixDesignById,
} from "../handlers/mixDesignHandler";

//router instance
const router = Router();

//routes
router.post("/addMixDesign", addMixDesign);
router.post("/updateMixDesign", updateMixDesign);
router.post("/deleteMixDesign", deleteMixDesign);
router.get("/getMixDesigns", getMixDesigns);
router.get("/getMixDesignById", getMixDesignById);

module.exports = router;
