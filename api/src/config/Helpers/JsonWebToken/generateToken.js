import jwt from "jsonwebtoken";
import { environment } from "../../config.js"

export const tokenSign = (data) => {
    return jwt.sign({ data }, environment.JWT_SECRET, { algorithm: "HS256" }, { expiresIn: "2h", }, (err, token) => {
        return token
    })
}

export const verifyToken = async (token) => {
    try {
        return jwt.verify(token, key)
    } catch (e) {
        return null
    }
}
