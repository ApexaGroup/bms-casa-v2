import { Router } from "express";

// import user handlers
import { sendMail } from "../handlers/mailHandler";

//router instance
const router = Router();

//routes
router.post("/sendMail", sendMail);

module.exports = router;
