import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { updateUserProfile, checkEmailDb } from "../../Services/rootServices";
import { getTokenUpdate } from "../../Services/authServices"
import jwt_decode from "jwt-decode"
import { encrypt } from "../Helpers/handleBCypt"

import "./profile.css"

const IMAGEN_PERFIL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr0uMB7RJnAIO0zlYAfQbp4hbG9304ELUNtMnWCZ1ZXw&s"
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

export default function Profile() {

    const dispatch = useDispatch()

    let token = useSelector((state) => state.auth.token);
    const user = jwt_decode(token)

    const nombre = user.data.Name.split(" ").map(e => e[0] + e.slice(1).toLowerCase())
    const apellido = user.data.Last_Name.split(" ").map(e => e[0] + e.slice(1).toLowerCase())

    const [viewProfile, setViewProfile] = useState(true)
    const [input, setInput] = useState({
        name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({})
    const [errorMenssage, setErrorMenssage] = useState(null)
    const [checkEmail, setCheckEmail] = useState(null)

    const handleView = () => {
        viewProfile === true ? setViewProfile(false) : setViewProfile(true)
    }

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

    const handleSubmitUpdate = async (e) => {
        e.preventDefault()

        try {
            const infoToSend = {}
            if (input.name) {
                infoToSend.name = input.name
            }
            if (input.last_name) {
                infoToSend.last_name = input.last_name
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
                infoToSend.email = input.email
            }

            if (input.password) {
                if (input.password === input.confirmPassword && regex_Password.test(input.password)) {
                    infoToSend.password = await encrypt(input.password)
                } else {
                    setErrorMenssage(true)
                    setTimeout(() => {
                        setErrorMenssage(null)
                    }, 5000)
                }
            }

            const dataUpdate = await dispatch(updateUserProfile({
                id: user.data.User_ID,
                payload: infoToSend
            }))

            if (dataUpdate.payload.success) {
                await dispatch(getTokenUpdate({
                    id: user.data.User_ID,
                }))
                setInput({
                    name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                alert("Cambio Exitoso!")
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
            <div className="Container-All-Profile">

                <div className='Container-Button-Update'>
                    <button onClick={handleView}>Update Profile</button>
                </div>
                <img src={IMAGEN_PERFIL} alt="Imagen de perfil" className='imagenProfile' />

                <div className='Container-Info-Profile'>
                    {
                        viewProfile === true
                            ? (<div>
                                <h2>{nombre.join(" ")}</h2>
                                <h2>{apellido.join(" ")}</h2>
                                <h2>{user.data.Email}</h2>
                                <h2>Creado {user.data.Created.slice(0, 10)} a las {user.data.Created.slice(11, 16)} hs</h2>
                            </div>
                            ) : (<div >
                                <form onSubmit={e => handleSubmitUpdate(e)} className='Container-Info-Profile'>
                                    <div>
                                        <label>{nombre.join(" ")}</label>
                                        <input
                                            type="text"
                                            placeholder="Nombre"
                                            name="name"
                                            value={input.name}
                                            onChange={e => handleChange(e)}
                                        />
                                        {errors.name && errorMenssage === true && input.name.length > 0 && (<p >{errors.name}</p>)}
                                    </div>
                                    <div>
                                        <label>{apellido.join(" ")}</label>
                                        <input
                                            type="text"
                                            placeholder="Apellido"
                                            name="last_name"
                                            value={input.last_name}
                                            onChange={e => handleChange(e)}
                                        />
                                        {errors.last_name && errorMenssage === true && input.last_name.length > 0 && (<p >{errors.last_name}</p>)}
                                    </div>
                                    <div>
                                        <label>{user.data.Email}</label>
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            name="email"
                                            value={input.email}
                                            onChange={e => handleChange(e)}
                                        />
                                        {errors.email && errorMenssage === true && input.email.length > 0 && (<p >{errors.email}</p>)}
                                        {checkEmail && <p>{checkEmail}</p>}
                                    </div>
                                    <div>
                                        <label>Contraseña</label>
                                        <input
                                            type="password"
                                            placeholder="Contraseña entre 8 a 20 caracteres"
                                            name="password"
                                            value={input.password}
                                            onChange={e => handleChange(e)}
                                        />
                                        {errors.password && errorMenssage === true && input.password.length > 0 && (<p >{errors.password}</p>)}
                                        {errorMenssage === true && input.confirmPassword.length > 0 && input.password.length === 0 && (<p>Falta completar este campo</p>)}
                                    </div>
                                    <div>
                                        <label>Confirmar contraseña</label>
                                        <input
                                            type="password"
                                            placeholder="Contraseña entre 8 a 20 caracteres"
                                            name="confirmPassword"
                                            value={input.confirmPassword}
                                            onChange={e => handleChange(e)}
                                        />
                                        {errors.confirmPassword && errorMenssage === true && input.confirmPassword.length > 0 && (<p >{errors.confirmPassword}</p>)}
                                        {errorMenssage === true && input.password.length > 0 && input.confirmPassword.length === 0 && (<p>Falta completar este campo</p>)}
                                    </div>
                                    {
                                        input.name.length > 0 ||
                                            input.last_name.length > 0 ||
                                            input.email.length > 0 ||
                                            input.password.length > 0 ||
                                            input.confirmPassword.length > 0 ? <div className='Container-Button-FormSave'>
                                            <button type='submit'>Guardar y Salir</button>
                                        </div> : null
                                    }
                                </form>
                            </div>)
                    }
                </div>
            </div>
        </>
    )
}