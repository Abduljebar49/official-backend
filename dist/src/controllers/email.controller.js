"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLinkEmail = exports.sendWelcomeEmail = void 0;
const resend_1 = require("resend");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
const sendWelcomeEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = req.body;
    if (!name || !email) {
        return res.status(400).send({ message: "Name and email are required." });
    }
    try {
        let bodyContent = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../../html/welcome.html"), "utf-8");
        bodyContent = bodyContent.replace("{name}", name);
        const { data, error } = yield resend.emails.send({
            from: "noreply@debbal.com",
            to: email,
            subject: "Welcome to Easy",
            html: bodyContent,
        });
        if (error) {
            return res.status(400).json({ error });
        }
        return res.status(200).json({ message: "Email successfully sent", data });
    }
    catch (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendLinkEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { data, error } = yield resend.emails.send({
            from: "noreply@debbal.com", // Change this to your verified email domain
            to: email,
            subject: "Request Response Needed",
            html: htmlContent,
        });
        if (error) {
            return res.status(400).json({ error });
        }
        res.status(200).json({ message: "Email successfully sent", data });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to send email", details: err });
    }
});
exports.sendLinkEmail = sendLinkEmail;
