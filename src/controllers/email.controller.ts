import express, { Request, Response } from "express";
import { Resend } from "resend";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (req: Request, res: Response) => {
  const { email, name } = req.body;

  if (!name || !email) {
    return res.status(400).send({ message: "Name and email are required." });
  }

  try {
    let bodyContent = fs.readFileSync(
      path.join(__dirname, "../../../html/welcome.html"),
      "utf-8"
    );
    bodyContent = bodyContent.replace("{name}", name);

    const { data, error } = await resend.emails.send({
      from: "noreply@debbal.com",
      to: email,
      subject: "Welcome to Easy",
      html: bodyContent,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ message: "Email successfully sent", data });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendLinkEmail = async (req: Request, res: Response) => {
  const { email, name, link } = req.body;

  if (!email || !name || !link) {
    return res.status(400).send("Email, name, and link are required.");
  }

  // HTML email content
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Request Response Needed</title>
      </head>
      <body
        style="
          background-color: #f0f4f8;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 40px;
        "
      >
        <div
          style="
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          "
        >
          <div
            style="
              background-color: #3182ce;
              color: #ffffff;
              padding: 20px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            "
          >
            <h1 style="font-size: 24px; margin: 0;">
              Action Required: Request Response
            </h1>
          </div>
          <div style="padding: 20px 30px; color: #4a5568;">
            <h2 style="color: #2b6cb0; font-size: 20px; margin-bottom: 16px;">
              Dear ${name},
            </h2>
            <p style="line-height: 1.6; margin: 16px 0;">
              You have received a request and we kindly ask you to respond as soon as possible.
            </p>
            <p style="line-height: 1.6; margin: 16px 0;">
              Please access the following link to proceed with your bid:
              <a
                href="${link}"
                style="
                  color: #2b6cb0;
                  text-decoration: underline;
                  word-wrap: break-word;
                "
              >${link}</a>
            </p>
            <p style="line-height: 1.6; margin: 16px 0;">Best regards,</p>
            <p style="line-height: 1.6; margin: 16px 0;">
              Abduljebar Sani<br />
              COO, EasyConnect<br />
              EasyConnect Medical Pharmaceuticals
            </p>
          </div>
          <div
            style="
              text-align: center;
              font-size: 12px;
              color: #a0aec0;
              margin-top: 30px;
            "
          >
            <p style="margin: 5px 0;">&copy; 2024 EasyConnect Medical Pharmaceuticals</p>
            <p style="margin: 5px 0;">Contact us at support@easyconnect.com</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: "noreply@debbal.com", // Change this to your verified email domain
      to: email,
      subject: "Request Response Needed",
      html: htmlContent,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    res.status(200).json({ message: "Email successfully sent", data });
  } catch (err) {
    res.status(500).json({ error: "Failed to send email", details: err });
  }
};

export const sendPasswordReset = async (req: Request, res: Response) => {
  const { email, name, code } = req.body;
  const htmlContent = `
  <html>
    <body style="font-family: Arial, sans-serif; background-color: #f7fafc; padding: 24px;">
      <div style="background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h1 style="font-size: 24px; font-weight: 600; color: #3182ce; margin-bottom: 16px;">
          Password Reset Request
        </h1>
        <p style="color: #2d3748;">Dear ${name},</p>
        <p style="color: #2d3748;">
          You requested to reset your password. Use the following code to reset your password:
        </p>
        <p style="color: #2d3748; font-size: 18px; font-weight: bold;">
          ${code}
        </p>
        <p style="color: #2d3748;">
          Please note: This code will expire in 1 hour.
        </p>
        <p style="color: #2d3748;">Best regards,</p>
        <p style="color: #2d3748;">
          Abduljebar Sani<br />
          COO EasyConnect<br />
          EasyConnect Medical Pharmaceuticals
        </p>
      </div>
    </body>
  </html>
`;

  try {
    const { data, error } = await resend.emails.send({
      from: "noreply@easyconnect.com",
      to: email,
      subject: "Password Reset Request",
      html: htmlContent,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    res.status(200).json({ message: "Email successfully sent", data });
  } catch (err) {
    res.status(500).json({ error: "Failed to send email", details: err });
  }
};
