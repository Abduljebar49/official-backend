import express from "express";
import {
  sendLinkEmail,
  sendPasswordReset,
  sendWelcomeEmail,
} from "../controllers/email.controller";

const router = express.Router();
router.post("/welcome", sendWelcomeEmail);
router.post("/link", sendLinkEmail);
router.post("/forget-password", sendPasswordReset);

export default router;