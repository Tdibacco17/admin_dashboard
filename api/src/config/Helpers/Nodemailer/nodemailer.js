import nodemailer from "nodemailer"
import { environment } from "../../config.js";

export const transporter = nodemailer.createTransport({
    host: environment.EMAIL_SERVICE,
    port: 587,
    secure: false, // true for 465, false for other ports
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: environment.EMAIL_USERNAME, // variables de entorno
        pass: environment.EMAIL_PASSWORD, // variables de entorno
    },
});