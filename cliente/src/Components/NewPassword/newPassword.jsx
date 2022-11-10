import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { updateForgotPassword } from "../../Services/authServices"
import jwt_decode from "jwt-decode"
import { encrypt } from "../Helpers/handleBCypt"
import "./newPassword.css"

const regex_Password = /^([a-zA-Z0-9_-]){8,20}$/i

const validate = (input) => {
    const errors = {}

    if (!regex_Password.test(input.password)) {
        errors.password = "Constraseña invalida, solo alfanuméricos"
    }
    if (input.password && input.confirmPassword && input.password !== input.confirmPassword) {
        errors.confirmPassword = "Constraseñas distintas"
    }
    return errors;
}

export default function NewPassword() {

    const dispatch = useDispatch()

    const tokenUserNewPass = useSelector(state => state.auth.tokenNewPass)
    const [input, setInput] = useState({
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({})
    const [errorMenssage, setErrorMenssage] = useState(null)
    const user = jwt_decode(tokenUserNewPass)

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmitNewPassword = async (e) => {
        e.preventDefault()

        try {
            if (input.password === input.confirmPassword && regex_Password.test(input.password)) {
                const passUpdate = {
                    User_ID: user.data.User_ID,
                    password: await encrypt(input.password)
                }
                const sendNewPassword = await dispatch(updateForgotPassword(passUpdate))
               
                if (sendNewPassword.payload.success) {
                    setInput("")
                    alert("Contraseña modificada con exito!")

                } else {
                    setErrorMenssage(true)
                    setTimeout(() => {
                        setErrorMenssage(null)
                    }, 5000)
                }
            } else {
                setErrorMenssage(true)
                setTimeout(() => {
                    setErrorMenssage(null)
                }, 5000)
            }
        } catch (e) {
            setErrorMenssage(true)
            setTimeout(() => {
                setErrorMenssage(null)
            }, 5000)
        }
    }

    function handleEnter(e) {
        if (e.key === "Enter") {
            if (input.password.length > 0 || input.confirmPassword.length > 0) {
                handleSubmitNewPassword(e)
            }
        }
    }

    return (
        <>
            <div className="Container-All-NewPassword">
                <h2>Escriba su nueva contraseña</h2>
                <h4>Contraseña entre 8 a 20 caracteres</h4>
                <input
                    type="password"
                    name="password"
                    value={input.password}
                    onChange={e => handleChange(e)}
                    placeholder="Nueva contraseña"
                    onKeyPress={handleEnter}
                />
                {errors.password && errorMenssage === true && input.password.length > 0 && (<p >{errors.password}</p>)}
                {errorMenssage === true && input.confirmPassword.length > 0 && input.password.length === 0 && (<p>Falta completar este campo</p>)}
                <input
                    type="password"
                    name="confirmPassword"
                    value={input.confirmPassword}
                    onChange={e => handleChange(e)}
                    placeholder="Confirmar contraseña"
                    onKeyPress={handleEnter}
                />
                {errors.confirmPassword && errorMenssage === true && input.confirmPassword.length > 0 && (<p >{errors.confirmPassword}</p>)}
                {errorMenssage === true && input.password.length > 0 && input.confirmPassword.length === 0 && (<p>Falta completar este campo</p>)}
                {errorMenssage === true && input.password.length === 0 && input.confirmPassword.length === 0 && (<p>Falta completar ambos campo</p>)}
                <button onClick={e => handleSubmitNewPassword(e)}>Aplicar cambios</button>
            </div>
        </>
    )
}