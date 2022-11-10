import { connection, environment } from "../../../config.js"
import { transporter } from "../../../Helpers/Nodemailer/nodemailer.js";

export const addEmailDB = (full_name, email, subject, res) => {

    const addEmailDB = `INSERT INTO Email(Full_Name, Email, Subject) VALUES ('${full_name}','${email}','${subject}');`;

    connection.query(addEmailDB, async function (err, result, filed) {
        if (err) throw err
        if (result.affectedRows > 0) {

            let info = {
                from: environment.EMAIL_SENDER, // sender address
                to: environment.EMAIL_SENDER, // list of receivers
                subject: `${full_name} te envio un mensaje`, // Subject line
                text: `
                Full_Name= ${full_name}
                Email= ${email}
                Subject= ${subject}`,
                // plain text body
                // html: "<b>{texto}</b>", // html body
            };

            await transporter.sendMail(info, (error, info) => {
                if (error) {
                    return console.log(error)
                } else {
                    return console.log('Message sent: ' + info.response);
                }
            })

            res.json({
                msg: "Email agregado a DB correctamente",
                success: true,
                result
            })
        } else {
            res.json({
                msg: "Email NO agregado a DB",
                success: false,
                ErrorCode: 4,
                result
            })
        }
    })
}