import { connection } from "../../../config.js";
import { tokenSign } from "../../JsonWebToken/generateToken.js"

/*---USER---*/
export const deletUserId = (id, res) => {

    connection.query(`DELETE FROM User WHERE User_ID = ?;`, [id], function (err, result, filed) {
        if (err) throw err
        if (result.affectedRows > 0) {
            res.json({
                msg: "Usuario eliminado correctamente",
                success: true,
                result
            })
        } else {
            res.json({
                msg: "Usuario no encontrado",
                success: false,
                ErrorCode: 11,
                result
            })
        }
    })
}

//juntar ambas en una sola funcion
export const getUserId = (id, res) => {

    //reutilizar misma funcion para refreshear el token en update
    connection.query(`SELECT * FROM User WHERE User_ID = ?;`, [id], function (err, result, filed) {
        if (err) throw err
        if (result.length === 0) {
            res.json({
                msg: "Usuario no encontrado",
                success: false,
                ErrorCode: 11,
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

export const getAllUsers = (res) => {
    connection.query(`SELECT * FROM User;`, function (err, result, filed) {
        if (err) throw err
        if (result.length === 0) {
            res.json({
                msg: "Usuario no encontrado",
                success: false,
                ErrorCode: 11,
            })
        } else {
            res.json({
                msg: "Usuario encontrado correctamente",
                success: true,
                token: tokenSign(result)
            })
        }
    })
}

/*---EMAIL---*/
export const deleteEmailId = (id, res) => {
    connection.query(`DELETE FROM Email WHERE Email_ID = ?;`, [id], function (err, result, filed) {
        if (err) throw err
        if (result.affectedRows > 0) {
            res.json({
                msg: "Email eliminado correctamente",
                success: true,
                result
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
//juntar ambas en una sola funcion
export const getEmailId = (id, res) => {
    connection.query(`SELECT * FROM Email WHERE Email_ID = ?;`, [id], function (err, result, filed) {
        if (err) throw err
        if (result.length === 0) {
            res.json({
                msg: "Email no encontrado",
                success: false,
                ErrorCode: 4,
            })
        } else {
            const email = result[0]
            res.json({
                msg: "Email encontrado correctamente",
                success: true,
                token: tokenSign(email)
            })
        }
    })
}

export const getAllEmails = (res) => {
    connection.query(`SELECT * FROM Email;`, function (err, result, filed) {
        if (err) throw err
        if (result.length === 0) {
            res.json({
                msg: "Email no encontrado",
                success: false,
                ErrorCode: 4
            })
        } else {
            res.json({
                msg: "Email encontrado correctamente",
                success: true,
                token: tokenSign(result)
            })
        }
    })
}

/*---SEARCHBAR USUARIOS---*/
//juntar ambas en una sola funcion

export const searchbarUserDouble = (name, last_name, res) => {
    connection.query(`SELECT * FROM User WHERE Name LIKE '%${name}%' OR Last_Name LIKE '%${last_name}%';`, function (err, result, filed) {
        if (err) throw err
        if (result.length === 0) {
            res.json({
                msg: "Usuario no encontrado",
                success: false,
                ErrorCode: 11,
            })
        } else {
            res.json({
                msg: "Usuario encontrado correctamente",
                success: true,
                token: tokenSign(result)
            })
        }
    })
}

export const searchbarUserSingleName = (name, res) => {
    connection.query(`SELECT * FROM User WHERE Name LIKE '%${name}%';`, function (err, result, filed) {
        if (err) throw err
        if (result.length === 0) {
            res.json({
                msg: "Usuario no encontrado",
                success: false,
                ErrorCode: 11,
            })
        } else {
            res.json({
                msg: "Usuario encontrado correctamente",
                success: true,
                token: tokenSign(result)
            })
        }
    })
}

export const searchbarUserSingleLast_Name = (last_name, res) => {
    connection.query(`SELECT * FROM User WHERE Last_Name LIKE '%${last_name}%';`, function (err, result, filed) {
        if (err) throw err
        if (result.length === 0) {
            res.json({
                msg: "Usuario no encontrado",
                success: false,
                ErrorCode: 11,
            })
        } else {
            res.json({
                msg: "Usuario encontrado correctamente",
                success: true,
                token: tokenSign(result)
            })
        }
    })
}

/*---SEARCHBAR EMAILS---*/
//juntar ambas en una sola funcion

export const searchbarEmailDouble = (full_name, email, res) => {
    connection.query(`SELECT * FROM Email WHERE Full_Name LIKE '%${full_name}%' OR Email LIKE '%${email}%';`, function (err, result, filed) {
        if (err) throw err
        if (result.length === 0) {
            res.json({
                msg: "Email no encontrado",
                success: false,
                ErrorCode: 4
            })
        } else {
            res.json({
                msg: "Email encontrado correctamente",
                success: true,
                token: tokenSign(result)
            })
        }
    })
}

export const searchbarEmailSingleFull_Name = (full_name, res) => {
    connection.query(`SELECT * FROM Email WHERE Full_Name LIKE '%${full_name}%';`, function (err, result, filed) {
        if (err) throw err
        if (result.length === 0) {
            res.json({
                msg: "Email no encontrado",
                success: false,
                ErrorCode: 4
            })
        } else {
            res.json({
                msg: "Email encontrado correctamente",
                success: true,
                token: tokenSign(result)
            })
        }
    })
}

export const searchbarEmailSingleEmail = (email, res) => {
    connection.query(`SELECT * FROM Email WHERE Email LIKE '%${email}%';`, function (err, result, filed) {
        if (err) throw err
        if (result.length === 0) {
            res.json({
                msg: "Email no encontrado",
                success: false,
                ErrorCode: 4
            })
        } else {
            res.json({
                msg: "Email encontrado correctamente",
                success: true,
                token: tokenSign(result)
            })
        }
    })
}