import { Router } from "express";

// import user handlers
import { getPlantInformation } from "../handlers/plantInformationHandler";

//router instance
const router = Router();

//routes
router.get("/getPlantInformation", getPlantInformation);

module.exports = router;
