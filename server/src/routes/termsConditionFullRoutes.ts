import { Router } from "express";

// import user handlers
import {
    addTnCFullDetail,
    updateTnCFullDetail,
    deleteTnCFullDetail,
    getTnCFullDetails,
} from "../handlers/termsConditionFullDetailHandler";

//router instance
const router = Router();

//routes
router.post("/addTnCFullDetail", addTnCFullDetail);
router.post("/updateTnCFullDetail", updateTnCFullDetail);
router.post("/deleteTnCFullDetail", deleteTnCFullDetail);
router.get("/getTnCFullDetails", getTnCFullDetails);

module.exports = router;
