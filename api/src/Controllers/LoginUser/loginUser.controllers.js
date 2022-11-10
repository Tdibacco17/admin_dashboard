import { regexPassword, regexEmail, regexFullText } from "../../config/Helpers/Regex/regex.js"
import { encrypt } from "../../config/Helpers/HashPass/handleBCrypt.js"
import { addUserDB, verifyLogin, sendEmailForgotPassword, tokenForUpdatePassword, updateForgotPassword, checkEmailDb } from "../../config/Helpers/Query/LoginUser/loginUserQuerys.js"

export const addUSerController = (req, res) => {
    const { name, last_name, email, password, active } = req.body

    try {
        if (!name || !last_name || !email || !password || !active) {
            res.json({
                msg: "Faltan datos obligatorios",
                success: false,
                ErrorCode: 9
            })
        } else {
            if (regexFullText(name)) {
                if (regexFullText(last_name)) {
                    if (regexEmail(email)) {
                        //validar si esxiste un email


                        if (password) {
                            addUserDB(name, last_name, email, password, active, res)
                        } else {
                            res.json({
                                msg: "Contraseña invalida",
                                success: false,
                                ErrorCode: 8
                            })
                        }
                    } else {
                        res.json({
                            msg: "Email invalido",
                            success: false,
                            ErrorCode: 4
                        })
                    }
                } else {
                    res.json({
                        msg: "Last Name invalido",
                        success: false,
                        ErrorCode: 6
                    })
                }
            } else {
                res.json({
                    msg: "Nombre invalido",
                    success: false,
                    ErrorCode: 2
                })
            }
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

export const checkEmailDbController = (req, res) => {
    const { email } = req.query

    try {
        if (email) {
            checkEmailDb(email, res)
        } else {
            res.json({
                msg: "Email invalido",
                success: false,
                ErrorCode: 4
            })
        }
    } catch (e) {
        console.log(e)
        res.json({
            msg: "Entro al catch",
            success: false,
            ErrorCode: 111
        })
    }
}

export const verifyLoginController = (req, res) => {
    const { email, password } = req.body

    try {
        if (regexEmail(email)) {
            verifyLogin(email, password, res)
        } else {
            res.json({
                msg: "Email invalido",
                success: false,
                ErrorCode: 4
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

export const sendEmailForgotPasswordController = (req, res) => {
    const { email } = req.body

    try {
        if (regexEmail(email)) {
            sendEmailForgotPassword(email, res)
        } else {
            res.json({
                msg: "Email invalido",
                success: false,
                ErrorCode: 4
            })
        }
    } catch (e) {
        console.log(e)
        res.json({
            msg: "Entro al catch",
            success: false,
            ErrorCode: 111
        })
    }
}

export const tokenForUpdatePasswordController = (req, res) => {
    const { email } = req.query

    try {
        if (email) {
            tokenForUpdatePassword(email, res)
        } else {
            res.json({
                msg: "NO existe Email",
                success: false,
                ErrorCode: 4
            })
        }
    } catch (e) {
        console.log(e)
        res.json({
            msg: "Entro al catch",
            success: false,
            ErrorCode: 111
        })
    }
}

export const updateForgotPasswordController = (req, res) => {
    const { User_ID, password } = req.body

    try {
        if (!User_ID || !password) {
            res.json({
                msg: "Campos vacios",
                success: false,
                ErrorCode: 9
            })
        } else {
            if (User_ID) {
                if (password) {
                    // if (regexPassword(password)) {
                    updateForgotPassword(User_ID, password, res)
                    // } else {
                    //     res.json({
                    //         msg: "Contraseña invalida",
                    //         success: false,
                    //         ErrorCode: 5
                    //     })
                    // }
                } else {
                    res.json({
                        msg: "Contraseña inexistente",
                        success: false,
                        ErrorCode: 8
                    })
                }
            } else {
                res.json({
                    msg: "ID inexistente",
                    success: false,
                    ErrorCode: 1
                })
            }
        }
    } catch (e) {
        console.log(e)
        res.json({
            msg: "Entro al catch",
            success: false,
            ErrorCode: 111
        })
    }
}
