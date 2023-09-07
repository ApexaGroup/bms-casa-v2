import { Router } from "express";

// multer and path for file storage
import multer from "multer";
import path from "path";

// import handlers
import { register, login, uploadfile } from "../auth/authHandler";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.body.destination === "profile") {
      cb(null, "./public/casa/profileImages");
    }

    if (req.body.destination === "logo") {
      cb(null, "./public/casa/logo");
    }

    if (req.body.destination === "houseMixDesign") {
      cb(null, "./public/casa/houseMixDesign");
    }

    if (req.body.destination === "specialMixDesign") {
      cb(null, "./public/casa/specialMixDesign");
    }
  },
  filename: function (req, file, cb) {
    if (!req.file) {
      if (req.body.destination === "profile") {
        cb(null, "profile_" + Date.now() + path.extname(file.originalname)); //Appending extension
      }

      if (req.body.destination === "logo") {
        cb(null, "logo_" + Date.now() + path.extname(file.originalname)); //Appending extension
      }

      if (req.body.destination === "specialMixDesign") {
        cb(
          null,
          "specialMixDesign_" + Date.now() + path.extname(file.originalname)
        ); //Appending extension
      }

      if (req.body.destination === "houseMixDesign") {
        cb(
          null,
          "houseMixDesign_" + Date.now() + path.extname(file.originalname)
        ); //Appending extension
      }
    } else {
      cb(null, "");
    }
  },
});

var upload = multer({ storage: storage });

//router instance
const router = Router();

//routes
router.post("/register", register);
router.post("/login", login);
router.post("/upload", upload.single("image"), uploadfile);

module.exports = router;
