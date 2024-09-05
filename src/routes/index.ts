import express from "express";
import userRoute from "./user.route"
import accountRoute from "./account.controller"
import requestRoute from "./request.controller"
import emailRoute from "./email.route"

const router = express.Router();


router.use("/users",userRoute);
router.use(accountRoute);
router.use("/requests", requestRoute);
router.use("/send",emailRoute);

export default router;