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
router.post("/auth/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = loginValidation.safeParse(body);
        if (data.error) {
            res.status(400).send({ message: data.error.message, success: false });
            return;
        }
        const modelData = yield getOneWithEmail(body.email, prisma.user);
        if (!modelData) {
            NoDataFound(res, "email or password incorrect.");
            return;
        }
        if (!bcrypt.compareSync(body.password, modelData.password)) {
            NoDataFound(res, "email or password incorrect.");
            return;
        }
        const accessToken = generateAccessToken({
            email: modelData.email,
            fullName: modelData.fullName,
        });
        RespData(res, { accessToken, data: modelData });
    }
    catch (error) {
        res.send({ message: error.message, success: false });
    }
}));
router.post("/auth/logout", (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
        const token = authHeader && authHeader.split(" ")[1];
        jwt.sign(token, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1s" }, (err, logoutToken) => {
            if (err) {
                res.status(500).send({ msg: "Error", success: false });
                return;
            }
            else if (logoutToken) {
                res.send({ msg: "You have been logged out", success: true });
                return;
            }
        });
    }
    else {
        res.sendStatus(404);
    }
    // res.send({ message: "Logout successfully", success: true });
});
