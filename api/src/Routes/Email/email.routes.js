import { Router } from "express";
import { sendEmailController } from "../../Controllers/Email/email.controllers.js";

export const router = Router()

router.post("/sendEmailContact", sendEmailController)