import express from "express";
import { sendLinkEmail, sendWelcomeEmail } from "../controllers/email.controller";

const router = express.Router();
router.post("/welcome", sendWelcomeEmail);
router.post("/link",sendLinkEmail)

export default router;
