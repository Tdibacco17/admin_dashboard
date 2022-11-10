import { useState } from "react";
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom";

import { sendEmailContact } from "../../Services/rootServices"

import "./contact.css";

const validate = (input) => {
    const errors = {};

    const regex_FullText = /^[a-zA-ZÀ-ÿñÑ]+( [a-zA-ZÀ-ÿñÑ]+)*$/i
    const regex_Email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i

    if (!regex_FullText.test(input.full_name)) {
        errors.full_name = "Nombre invalido, solo texto"
    }
    if (!regex_Email.test(input.email)) {
        errors.email = "Formato de Email invalido"
    }
    if (input.subject.length < 20) {
        errors.subject = "Asunto de minimo 20 caracteres"
    }
    return errors;
}

export default function Contact() {

    const dispatch = useDispatch()

    const [input, setInput] = useState({
        full_name: "",
        email: "",
        subject: ""
    })

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

    const handleContact = async (e) => {
        e.preventDefault();
        try {
            const sendEmail = await dispatch(sendEmailContact({
                full_name: input.full_name,
                email: input.email,
                subject: input.subject,
            }))

            if (sendEmail.payload.success) {
                setInput({
                    full_name: "",
                    email: "",
                    subject: ""
                })
                alert("Email Exitoso!")
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
            if (input.full_name.length > 0 || input.email.length > 0 || input.subject.length > 0) {
                handleContact(e)
            }
        }
    }

    return (
        <>
            <div className="Container-All-Contact">
                <form onSubmit={e => handleContact(e)} className="Container-Contact">
                    <h1>Contacto</h1>
                    <input
                        type="text"
                        placeholder="Nombre completo"
                        name="full_name"
                        value={input.full_name}
                        onChange={e => handleChange(e)}
                        onKeyPress={handleEnter}
                    />
                    {errors.full_name && errorMenssage === true && input.full_name.length > 0 && (<p >{errors.full_name}</p>)}
                    {errorMenssage === true && input.full_name.length === 0 && (<p >Falta completar este campo</p>)}
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={input.email}
                        onChange={e => handleChange(e)}
                        onKeyPress={handleEnter}
                    />
                    {errors.email && errorMenssage === true && input.email.length > 0 && (<p >{errors.email}</p>)}
                    {errorMenssage === true && input.email.length === 0 && (<p >Falta completar este campo</p>)}
                    <textarea
                        type="text"
                        placeholder="Asunto"
                        name="subject"
                        value={input.subject}
                        onChange={e => handleChange(e)}
                        onKeyPress={handleEnter}
                    />
                    {errors.subject && errorMenssage === true && input.subject.length > 0 && (<p >{errors.subject}</p>)}
                    {errorMenssage === true && input.subject.length === 0 && (<p >Falta completar este campo</p>)}

                    <div className="Container-Button-Contact">
                        <button type="submit" >Enviar</button>
                    </div>
                </form>
            </div>
            <div className="Container-Redirect">
                <h2><Link to="/login" id="linkTo">Volver a Iniciar sesión</Link></h2>
            </div>
        </>
    )
}