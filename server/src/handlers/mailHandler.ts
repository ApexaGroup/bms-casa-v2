import nodemailer from "nodemailer";

// Request, Response import from express
import { Request, Response } from "express";

// custom http status codes
import http_status from "../helpers/http_status";

const smtp = nodemailer.createTransport({
  host: "gateway.apexa.in",
  secure: true,
  auth: {
    user: "Parshvee@apexa.in",
    pass: "Pp1@abcde",
  },
});

export const sendMail = async (req: Request, res: Response) => {
  const toMail = req.body.toMail;
  const body = req.body.body;
  const attachment = req.body.attachment;

  console.log(toMail);

  try {
    const mailOptions = {
      from: "Parshvee@apexa.in",
      to: toMail,
      subject: "Update for you",
      body: body,
      attachments: attachment,
    };

    // { filename: 'profile.png', path: './images/profile.png' }

    smtp.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        return res
          .status(http_status.Internal_Server_Error)
          .json({ message: "Failed to send mail" });
      } else {
        return res.status(http_status.OK).json({ message: "Mail sent" });
      }
    });
  } catch (error) {
    return res
      .status(http_status.Failed_To_Create_Resource)
      .json({ message: "Failed to send mail" });
  }
};
