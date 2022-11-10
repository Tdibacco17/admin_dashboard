import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode"
import { Link } from "react-router-dom";

import { getLoginUser } from "../../Services/authServices"
import "./loginPage.css"

export default function LoginPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userEmail, setUserEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMenssage, setErrorMenssage] = useState(null)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const dataLogin = await dispatch(getLoginUser({
                email: userEmail,
                password: password
            }))
            if (!dataLogin.payload.success) {
                setErrorMenssage("Contraseña o Email invalidos")
                setTimeout(() => {
                    setErrorMenssage(null)
                }, 5000)
            } else {
                const user = jwt_decode(dataLogin.payload.token)

                setUserEmail("");
                setPassword("");
                if (user.data.Administrador === 1) {
                    navigate("/dashboard")
                } else {
                    navigate("/home")
                }
            }
        } catch (e) {
            setErrorMenssage("Contraseña o Email invalidos")
            setTimeout(() => {
                setErrorMenssage(null)
            }, 5000)
        }
    }

    return (
        <>

            <div className="Container-All-Form">
                <form onSubmit={e => handleLogin(e)} className="Container-Login">
                    <h1>Iniciar Sesión</h1>
                    <input
                        type="text"
                        placeholder="Email"
                        name="UserEmail"
                        value={userEmail}
                        onChange={({ target }) => setUserEmail(target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        name="Password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <div className="Container-Button-Login">
                        <button type="submit">Iniciar Sesión</button>
                    </div>
                    <div className="Container-ResetPassword-Register">
                        <Link to="/forgot-password" id="linkTo" ><h4>Olvidaste tu contraseña</h4></Link>
                        <Link to="/register" id="linkTo" ><h4>Registrarse</h4></Link>
                    </div>

                    <h2>{errorMenssage}</h2>
                </form>
            </div>
        </>
    )
}