import { Router } from "express";

// import user handlers
import { getUsers, updateUser, deleteUser } from "../handlers/userHandler";

//router instance
const router = Router();

//routes
router.get("/getUsers", getUsers);
router.post("/updateUser", updateUser);
router.post("/deleteUser", deleteUser);

module.exports = router;
