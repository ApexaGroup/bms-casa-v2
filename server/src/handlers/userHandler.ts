import { PrismaClient } from "@prisma/client";
import { hash } from "argon2";
import { Request, Response } from "express";
import { hashPassword } from "../auth/passwordUtils";
import http_status from "../helpers/http_status";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        username: true,
        password: false,
        firstName: true,
        lastName: true,
        contactNo: true,
        address: true,
        alternateNo: true,
        userProfileImage: true,
        isActive: false,
        defaultCompanyId: true,
        createdOn: false,
        modifiedOn: false,
        city: true,
        state: true,
        zipcode: true,
      },
    });

    if (users) {
      return res
        .status(http_status.OK)
        .json({ data: users, message: "Success" });
    } else {
      return res
        .status(http_status.Not_Found)
        .json({ data: null, message: "No Data Found" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(http_status.Bad_Request)
      .json({ message: "Failed to get user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const pass = req.body.password;
    var hashedPassword;
    var updateObject;
    if (pass) {
      hashedPassword = await hashPassword(pass);
      updateObject = {
        username: req.body.username,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contactNo: req.body.contactNo,
        address: req.body.address,
        alternateNo: req.body.alternateNo,
        userProfileImage: req.body.userProfileImage,
        isActive: req.body.isActive,
        defaultCompanyId: req.body.defaultCompanyId,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
      };
    } else {
      updateObject = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contactNo: req.body.contactNo,
        address: req.body.address,
        alternateNo: req.body.alternateNo,
        userProfileImage: req.body.userProfileImage,
        isActive: req.body.isActive,
        defaultCompanyId: req.body.defaultCompanyId,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
      };
    }

    const updatedata = await prisma.user.update({
      where: {
        id: req.body.id,
      },

      data: updateObject,
    });

    if (updatedata) {
      return res.status(http_status.OK).json({ message: "Success" });
    } else {
      return res.status(http_status.Bad_Request).json({ message: "Error" });
    }
  } catch (err) {
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const updatedata = await prisma.user.delete({
      where: {
        id: req.body.id,
      },
    });

    if (updatedata) {
      const backup = await prisma.user_backup.create({
        data: {
          id: updatedata.id,
          username: updatedata.username,
          password: updatedata.password,
          firstName: updatedata.firstName,
          lastName: updatedata.lastName,
          contactNo: updatedata.contactNo,
          address: updatedata.address,
          alternateNo: updatedata.alternateNo,
          userProfileImage: updatedata.userProfileImage,
          isActive: updatedata.isActive,
          defaultCompanyId: updatedata.defaultCompanyId,
          city: updatedata.city,
          state: updatedata.state,
          zipcode: updatedata.zipcode,
        },
      });

      if (backup) {
        return res.status(http_status.OK).json({ message: "Success" });
      } else {
        return res.status(http_status.Bad_Request).json({ message: "Error" });
      }
    } else {
      return res.status(http_status.Bad_Request).json({ message: "Error" });
    }
  } catch (err) {
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Error" });
  }
};
