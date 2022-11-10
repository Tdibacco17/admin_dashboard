import { useState } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { registerUser, checkEmailDb } from "../../Services/rootServices"
import { encrypt } from "../Helpers/handleBCypt"
import "./register.css";

const regex_FullText = /^[a-zA-ZÀ-ÿñÑ]+( [a-zA-ZÀ-ÿñÑ]+)*$/i
const regex_Email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i
const regex_Password = /^([a-zA-Z0-9_-]){8,20}$/i

const validate = (input) => {
    const errors = {};

    if (!regex_FullText.test(input.name)) {
        errors.name = "Nombre invalido, solo texto"
    }
    if (!regex_FullText.test(input.last_name)) {
        errors.last_name = "Apellido invalido, solo texto"
    }
    if (!regex_Email.test(input.email)) {
        errors.email = "Formato de Email invalido"
    }
    if (!regex_Password.test(input.password)) {
        errors.password = "Constraseña invalida, solo alfanuméricos"
    }
    if (input.password && input.confirmPassword && input.password !== input.confirmPassword) {
        errors.confirmPassword = "Constraseñas distintas"
    }
    return errors;
}

export default function Register() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [input, setInput] = useState({
        name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [checkEmail, setCheckEmail] = useState(null)
    const [errors, setErrors] = useState({})
    const [errorMenssage, setErrorMenssage] = useState(null)

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const addUserDB = {
                name: input.name,
                last_name: input.last_name,
                email: input.email,
                password: "",
                active: true
            }

            if (input.password) {
                if (input.password === input.confirmPassword && regex_Password.test(input.password)) {
                    addUserDB.password = await encrypt(input.password)
                } else {
                    addUserDB.password = ""
                    setErrorMenssage(true)
                    setTimeout(() => {
                        setErrorMenssage(null)
                    }, 5000)
                }
            }
            if (input.email) {
                const checkEmail = await dispatch(checkEmailDb({
                    email: input.email
                }))
                if ((checkEmail.payload.success)) {
                    setCheckEmail("Email ya existente")
                    setErrorMenssage(true)
                    setTimeout(() => {
                        setCheckEmail(null)
                        setErrorMenssage(null)
                    }, 5000)
                    return
                }
            }

            const postUser = await dispatch(registerUser(addUserDB))

            if (postUser.payload.success) {
                setInput({
                    name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                alert("Registro Exitoso!")

                navigate("/login")
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

    return (
        <>
            <div className="Container-All-Register">
                <form onSubmit={e => handleRegister(e)} className="Container-Register">
                    <h1>Registrate</h1>
                    <input
                        type="text"
                        placeholder="Nombre"
                        name="name"
                        value={input.name}
                        onChange={e => handleChange(e)}
                    />
                    {errors.name && errorMenssage === true && input.name.length > 0 && (<p >{errors.name}</p>)}
                    {errorMenssage === true && input.name.length === 0 && (<p >Falta completar este campo</p>)}
                    <input
                        type="text"
                        placeholder="Apellido"
                        name="last_name"
                        value={input.last_name}
                        onChange={e => handleChange(e)}
                    />
                    {errors.last_name && errorMenssage === true && input.last_name.length > 0 && (<p >{errors.last_name}</p>)}
                    {errorMenssage === true && input.last_name.length === 0 && (<p >Falta completar este campo</p>)}
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={input.email}
                        onChange={e => handleChange(e)}
                    />
                    {errors.email && errorMenssage === true && input.email.length > 0 && (<p >{errors.email}</p>)}
                    {errorMenssage === true && input.email.length === 0 && (<p >Falta completar este campo</p>)}
                    {checkEmail && <p>{checkEmail}</p>}
                    <input
                        type="password"
                        placeholder="Contraseña entre 8 a 20 caracteres"
                        name="password"
                        value={input.password}
                        onChange={e => handleChange(e)}
                    />
                    {errors.password && errorMenssage === true && input.password.length > 0 && (<p >{errors.password}</p>)}
                    {errorMenssage === true && input.password.length === 0 && (<p >Falta completar este campo</p>)}

                    <input
                        type="password"
                        placeholder="Confirmar contraseña"
                        name="confirmPassword"
                        value={input.confirmPassword}
                        onChange={e => handleChange(e)}
                    />
                    {errors.confirmPassword && errorMenssage === true && input.confirmPassword.length > 0 && (<p >{errors.confirmPassword}</p>)}
                    {errorMenssage === true && input.confirmPassword.length === 0 && (<p >Falta completar este campo</p>)}
                    <div className="Container-Button-Register">
                        <button type="submit">Registrarse</button>
                    </div>
                </form>
            </div>
            <div className="Container-Redirect">
                <h2>¿Ya tienes una cuenta? <Link to="/login" id="linkTo">Iniciar sesión</Link></h2>
            </div>
        </>
    )
}