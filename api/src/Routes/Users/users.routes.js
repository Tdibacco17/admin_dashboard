import { Router } from "express";
import { updateUserController, updateTokenVerifyController } from "../../Controllers/Users/users.controllers.js";

export const router = Router()

router.put("/updateUserProfile", updateUserController)
router.post("/updateTokenVerify", updateTokenVerifyController)
