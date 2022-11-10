import { regexFullText, regexEmail } from "../../config/Helpers/Regex/regex.js"
import { addEmailDB } from "../../config/Helpers/Query/Email/emailQuerys.js"

export const sendEmailController = (req, res) => {
    const { full_name, email, subject } = req.body;

    try {
        if (subject.length >= 20) {
            if (regexFullText(full_name)) {
                if (regexEmail(email)) {
                    addEmailDB(full_name, email, subject, res)
                } else {
                    res.json({
                        msg: "Email invalido",
                        success: false,
                        ErrorCode: 4
                    })
                }
            } else {
                res.json({
                    msg: "Full_Name invalido",
                    success: false,
                    ErrorCode: 6
                })
            }
        } else {
            res.json({
                msg: "Subject invalido",
                success: false,
                ErrorCode: 13
            })
        }
    } catch (e) {
        console.log(e.message)
        res.json({
            msg: "Entro al catch",
            success: false,
            ErrorCode: 111
        })
    }
}