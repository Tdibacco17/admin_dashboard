import { connection, environment } from "../../../config.js"
import { compare, encrypt } from "../../HashPass/handleBCrypt.js"
import { tokenSign } from "../../JsonWebToken/generateToken.js"
import { transporter } from "../../../Helpers/Nodemailer/nodemailer.js";

export const addUserDB = async (name, last_name, email, password, active, res) => {

    const addUserDB = `INSERT INTO User(Name, Last_Name, Email, Password, Active) VALUES ('${name.toUpperCase()}','${last_name.toUpperCase()}','${email}','${password}',${active});`

    connection.query(addUserDB, function (err, result, filed) {
        if (err) throw err
        if (result.affectedRows > 0) {
            res.json({
                msg: "Usuario agregado correctamente",
                success: true,
                result
            })
        } else {
            res.json({
                msg: "Usuario NO agregado",
                success: false,
                ErrorCode: 11
            })
        }
    })
}

export const checkEmailDb = async (email, res) => {

    connection.query(`SELECT * FROM User WHERE Email = "${email}";`, async function (err, result, filed) {
        if (err) throw err;
        if (result.length === 0) {
            res.json({
                msg: "User no encontrado",
                success: false,
                ErrorCode: 11
            })
        } else {
            res.json({
                msg: "Usuario encontrado correctamente",
                success: true,
                result: result[0]
            })

        }
    })
}

export const verifyLogin = (email, password, res) => {

    connection.query(`SELECT * FROM User WHERE Email = "${email}";`, async function (err, result, filed) {
        if (err) throw err;
        if (result.length === 0) {
            res.json({
                msg: "User no encontrado",
                success: false,
                ErrorCode: 11
            })
        } else {
            const user = result[0]
            const checkPassword = await compare(password, user.Password)

            if (checkPassword === true) {
                res.json({
                    msg: "Usuario encontrado correctamente",
                    success: true,
                    token: tokenSign(user)
                })
            } else {
                res.json({
                    msg: "Contraseña invalida",
                    success: false,
                    ErrorCode: 15
                })
            }
        }

    })
}

export const sendEmailForgotPassword = (email, res) => {

    connection.query(`SELECT * FROM User WHERE Email= ?`, [email], async function (err, result, filed) {
        if (err) throw err

        if (result.length > 0) {

            let info = {
                from: environment.EMAIL_SENDER, // sender address
                to: email, // list of receivers
                subject: `Restablecer contraseña`, // Subject line
                text: `Ingresa en el siguiente link para cambiar tu contraseña
                http://localhost:3001/new-password`,
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
            const user = result[0]
            res.json({
                msg: "Email encontrado correctamente",
                success: true,
                token: tokenSign(user)
            })
        } else {
            res.json({
                msg: "Email no encontrado",
                success: false,
                ErrorCode: 4,
                result
            })
        }
    })
}

export const tokenForUpdatePassword = (email, res) => {

    connection.query(`SELECT * FROM User WHERE Email = "${email}";`, async function (err, result, filed) {
        if (err) throw err;
        if (result.length === 0) {
            res.json({
                msg: "User no encontrado",
                success: false,
                ErrorCode: 11
            })
        } else {
            const user = result[0]
            res.json({
                msg: "Usuario encontrado correctamente",
                success: true,
                token: tokenSign(user)
            })
        }
    })
}

export const updateForgotPassword = async (User_ID, password, res) => {

    connection.query(`UPDATE User SET Password="${password}" WHERE User_ID = ${User_ID};`, function (err, result, filed) {
        if (err) throw err
        if (result.affectedRows > 0) {
            res.json({
                msg: "Usuario modificado",
                success: true,
                result
            })
        } else {
            res.json({
                msg: "Usuario no encontrado",
                success: false,
                ErrorCode: 11
            })
        }
    })
}
