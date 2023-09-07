import { Response } from "express";
import jwt from "jsonwebtoken";
import { IUserIDPayload } from "../types/authTypes";

// generate access token method
export const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, process.env.ACCESS_JWT_SECRET as string, {
    expiresIn: "365d",
  });
};

// generate refresh token method
export const generateRefreshToken = (payload: any) => {
  return jwt.sign(payload, process.env.REFRESH_JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

// verify access token method
export const verifyAccessToken = (token: string) => {
  const payload = jwt.verify(token, process.env.ACCESS_JWT_SECRET as string);
  return payload as IUserIDPayload;
};

// verify refresh token method
export const verifyRefreshToken = (token: string) => {
  const payload = jwt.verify(token, process.env.REFRESH_JWT_SECRET as string);
  return payload as IUserIDPayload;
};

// set refresh token method
export const setRefreshToken = (res: Response, token: string) => {
  res.cookie("refresh_token", token, {
    httpOnly: true,
  });
};
