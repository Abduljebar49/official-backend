import express from "express";
import userRoute from "./user.route"
import accountRoute from "./account.controller"

const router = express.Router();


router.use(userRoute);
router.use(accountRoute);

export default router;