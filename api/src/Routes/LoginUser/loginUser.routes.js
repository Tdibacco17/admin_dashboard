import { Router } from "express";
import { verifyLoginController, addUSerController, checkEmailDbController, sendEmailForgotPasswordController, tokenForUpdatePasswordController, updateForgotPasswordController } from "../../Controllers/LoginUser/loginUser.controllers.js";

export const router = Router()

router.post("/registerUser", addUSerController)
router.get("/checkEmailDb", checkEmailDbController)
router.post("/verifyLoginUser", verifyLoginController)
router.post("/forgotPassword", sendEmailForgotPasswordController)
router.get("/getTokenForUpdatePassword", tokenForUpdatePasswordController)
router.put("/updateForgotPassword", updateForgotPasswordController)