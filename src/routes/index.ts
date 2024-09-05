import express from "express";
import userRoute from "./user.route"
import accountRoute from "./account.route"
import courseRoute from "./course.route"

const router = express.Router();


router.use("/users",userRoute);
router.use(accountRoute);
router.use('/courses',courseRoute);

export default router;