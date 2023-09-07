// prisma client import
import { PrismaClient } from "@prisma/client";

// random uuid imports
import { randomUUID } from "crypto";

// default req, res methods from express
import { Request, Response } from "express";

// custom http_status imports
import http_status from "../helpers/http_status";

// auth functions
import { hashPassword, comparePassowrd } from "./passwordUtils";
import { generateAccessToken } from "./token";

// prisma client instance
const prisma = new PrismaClient();

// uploadFile method
export const uploadfile = async (req: Request, res: Response) => {
  if (req.file == null) {
    res.status(http_status.Not_Found).send({
      status: http_status.Not_Found,
      imageRef: null,
      message: "Please add Image/File!",
    });
  } else {
    var imageRef = "";

    if (req.body.destination === "logo") {
      imageRef = "http://localhost:8080/public/casa/logo/" + req.file.filename;
    }

    if (req.body.destination === "houseMixDesign") {
      imageRef =
        "http://localhost:8080/public/casa/houseMixDesign/" + req.file.filename;
    }

    if (req.body.destination === "profile") {
      imageRef =
        "http://localhost:8080/public/casa/profileImages/" + req.file.filename;
    }

    if (req.body.destination === "specialMixDesign") {
      imageRef =
        "http://localhost:8080/public/casa/specialMixDesign/" +
        req.file.filename;
    }

    res.status(http_status.OK).send({
      status: http_status.OK,
      imageRef: imageRef,
      message: "Image Recieved Successfully!",
    });
  }
};

// create-user method
export const register = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const contactNo = req.body.contactNo;
  const address = req.body.address;
  const alternateNo = req.body.alternateNo;
  const userProfileImage = req.body.userProfileImage;
  const isActive = req.body.isActive;
  const defaultCompanyId = req.body.defaultCompanyId;
  const city = req.body.city;
  const state = req.body.state;
  const zipcode = req.body.zipcode;
  const hashedPassword = await hashPassword(password);

  if (
    username === "" ||
    password === "" ||
    firstName === "" ||
    lastName === "" ||
    contactNo === "" ||
    address === "" ||
    alternateNo === "" ||
    userProfileImage === "" ||
    city === "" ||
    state === "" ||
    zipcode === ""
  ) {
    return res.status(http_status.Bad_Request).json({
      status: http_status.Bad_Request,
      message: "Provide required details",
    });
  }

  try {
    const userPresent = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (userPresent) {
      return res
        .status(http_status.Conflict)
        .json({ message: "User with email already exists" });
    }
    await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        contactNo: contactNo,
        address: address,
        alternateNo: alternateNo,
        userProfileImage: userProfileImage,
        isActive: isActive,
        defaultCompanyId: defaultCompanyId,
        city: city,
        state: state,
        zipcode: zipcode,
      },
    });
    return res.status(http_status.Created).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Failed to create user" });
  }
};

// login method
export const login = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      return res
        .status(http_status.Not_Found)
        .json({ message: "User with email not found" });
    }

    const passwordVerified = await comparePassowrd(user.password, password);

    if (!passwordVerified) {
      return res
        .status(http_status.Unauthorized)
        .json({ message: "Incorrect password" });
    }

    const tokenPayload = {
      id: user.id,
    };

    const accessToken = generateAccessToken(tokenPayload);

    return res.status(http_status.OK).json({ message: "Login Successful", access_token: accessToken });
  } catch (error) {
    console.log(error);
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Login failed" });
  }
};
