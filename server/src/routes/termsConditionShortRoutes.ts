import { Router } from "express";

// import user handlers
import {
    addTnCShortDetail,
    updateTnCShortDetail,
    deleteTnCShortDetail,
    getTnCShortDetails,
} from "../handlers/termsConditionShortHandler";

//router instance
const router = Router();

//routes
router.post("/addTnCShortDetail", addTnCShortDetail);
router.post("/updateTnCShortDetail", updateTnCShortDetail);
router.post("/deleteTnCShortDetail", deleteTnCShortDetail);
router.get("/getTnCShortDetails", getTnCShortDetails);

module.exports = router;
