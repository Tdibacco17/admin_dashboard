import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"
import { useState } from "react"

import { sendEmailForgotPassword, getTokenForUpdatePassword } from "../../Services/authServices.js"
import "./forgotPassword.css"

export default function ForgotPassword() {

    const dispatch = useDispatch()
    const [inputEmail, setInputEmail] = useState("")
    const [errorMenssage, setErrorMenssage] = useState(null)

    const handleSubmitForgotPassword = async (e) => {
        e.preventDefault()

        try {

            const response = await dispatch(sendEmailForgotPassword({
                email: inputEmail
            }))

            if (response.payload.success) {
                await dispatch(getTokenForUpdatePassword({
                    email: inputEmail
                }))
                alert("Email enviado con exito!")
                setInputEmail("")
            } else {
                setErrorMenssage("Email inexistente")
                setTimeout(() => {
                    setErrorMenssage(null)
                }, 5000)
            }
        } catch (e) {
            setErrorMenssage("Email inexistente")
            setTimeout(() => {
                setErrorMenssage(null)
            }, 5000)
        }
    }

    function handleEnter(e) {
        if (e.key === "Enter") {
            if (inputEmail.length > 0) {
                handleSubmitForgotPassword(e)
            }
        }
    }

    return (
        <>
            <div className="Container-All-ForgotPassword">
                <h3>¿Tienes problemas para iniciar sesión?</h3>
                <h4>Ingresa tu correo electrónico y te enviaremos un enlace para que recuperes el acceso a tu cuenta.</h4>
                <input
                    type="text"
                    name="Input"
                    onChange={({ target }) => setInputEmail(target.value)}
                    placeholder="Correo electrónico"
                    onKeyPress={handleEnter}
                />
                <p>{errorMenssage}</p>
                <button onClick={e => handleSubmitForgotPassword(e)}>Enviar enlace de inicio de sesión</button>
                <h5>¿No puedes restablecer la contraseña?</h5>

                <div className="Container-Register-Login">
                    <Link to="/register" id="linkTo"><h2>Crear cuenta nueva</h2></Link>
                    <Link to="/login" id="linkTo"><h2>Volver a inicar sesión</h2></Link>
                </div>
            </div>
        </>
    )
}