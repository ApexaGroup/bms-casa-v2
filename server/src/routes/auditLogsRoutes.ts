import { Router } from "express";

// import user handlers
import { getAuditLogs, addLogs } from "../handlers/auditLogsHandler";

//router instance
const router = Router();

//routes
router.get("/getAuditLogs", getAuditLogs);
router.post("/addLogs", addLogs);

module.exports = router;
