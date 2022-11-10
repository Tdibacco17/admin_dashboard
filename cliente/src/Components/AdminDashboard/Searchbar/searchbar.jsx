import { useState } from "react";
import { useDispatch } from "react-redux";

import { searchbarEmail, searchbarUser } from "../../../Services/rootServices"
import "./searchbar.css"

const regex_FullText = /^[a-zA-ZÀ-ÿñÑ]+( [a-zA-ZÀ-ÿñÑ]+)*$/i
const regex_Email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i

const validateUser = (inputUsers) => {
    const errorsUSer = {};

    if (!regex_FullText.test(inputUsers.name)) {
        errorsUSer.name = "Nombre invalido, solo texto"
    }
    if (!regex_FullText.test(inputUsers.last_name)) {
        errorsUSer.last_name = "Apellido invalido, solo texto"
    }

    return errorsUSer
}
const validateEmail = (inputEmails) => {
    const errorsEmail = {};

    if (!regex_FullText.test(inputEmails.full_name)) {
        errorsEmail.full_name = "Nombre invalido, solo texto"
    }
    if (!regex_Email.test(inputEmails.email)) {
        errorsEmail.email = "Formato de Email invalido"
    }
    return errorsEmail
}

export default function Searchbar({ viewUsersOrEmails, setPagina }) {

    const dispatch = useDispatch()

    const [inputUsers, setInputUsers] = useState({
        name: "",
        last_name: ""
    })
    const [inputEmails, setInputEmails] = useState({
        full_name: "",
        email: ""
    })

    const [errorsUSer, setErrorsUSer] = useState({})
    const [errorsEmail, setErrorsEmail] = useState({})
    const [errorMenssage, setErrorMenssage] = useState(null)

    const handleChangeInputUser = (e) => {
        setInputUsers({
            ...inputUsers,
            [e.target.name]: e.target.value
        });
        setErrorsUSer(validateUser({
            ...inputUsers,
            [e.target.name]: e.target.value
        }));
    }
    const handleChangeInputEmail = (e) => {
        setInputEmails({
            ...inputEmails,
            [e.target.name]: e.target.value
        });
        setErrorsEmail(validateEmail({
            ...inputEmails,
            [e.target.name]: e.target.value
        }));
    }
    const handleSubmitSearchbarUser = async (e) => {
        e.preventDefault()

        try {
            const infoToSend = {}

            if (inputUsers.name) {
                infoToSend.name = inputUsers.name
            }
            if (inputUsers.last_name) {
                infoToSend.last_name = inputUsers.last_name
            }

            const searchbar = await dispatch(searchbarUser(infoToSend))

            if (searchbar.payload.success) {
                setInputUsers({
                    name: "",
                    last_name: ""
                })
                setPagina(1)
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
    const handleSubmitSearchbarEmail = async (e) => {
        e.preventDefault()

        try {
            const infoToSend = {}

            if (inputEmails.full_name) {
                infoToSend.full_name = inputEmails.full_name
            }
            if (inputEmails.email) {
                infoToSend.email = inputEmails.email
            }

            const searchbar = await dispatch(searchbarEmail(infoToSend))

            if (searchbar.payload.success) {
                setInputEmails({
                    full_name: "",
                    email: ""
                })
                setPagina(1)
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
            if (inputUsers.name.length > 0 || inputUsers.last_name.length > 0) {
                handleSubmitSearchbarUser(e)
            }
            if (inputEmails.full_name.length > 0 || inputEmails.email.length > 0) {
                handleSubmitSearchbarEmail(e)
            }
        }
    }

    return (
        <>
            <div className='Container-All-Searchbar'>
                {
                    viewUsersOrEmails === true
                        ? (<div className="Container-All-InputsSearchbar">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={inputUsers.name}
                                    placeholder='Buscar por Nombre'
                                    onChange={(e) => handleChangeInputUser(e)}
                                    onKeyPress={handleEnter}
                                />
                                {errorsUSer.name && errorMenssage === true && inputUsers.name.length > 0 && (<p >{errorsUSer.name}</p>)}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={inputUsers.last_name}
                                    placeholder='Buscar por Apellido'
                                    onChange={(e) => handleChangeInputUser(e)}
                                    onKeyPress={handleEnter}
                                />
                                {errorsUSer.last_name && errorMenssage === true && inputUsers.last_name.length > 0 && (<p >{errorsUSer.last_name}</p>)}
                            </div>
                            <button disabled={inputUsers.name.length === 0 && inputUsers.last_name.length === 0}
                                onClick={e => handleSubmitSearchbarUser(e)}>Buscar</button>
                        </div>
                        )
                        : (<div className="Container-All-InputsSearchbar">
                            <div>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={inputEmails.full_name}
                                    placeholder='Buscar por Nombre'
                                    onChange={(e) => handleChangeInputEmail(e)}
                                    onKeyPress={handleEnter}
                                />
                                {errorsEmail.full_name && errorMenssage === true && inputEmails.full_name.length > 0 && (<p >{errorsEmail.full_name}</p>)}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="email"
                                    value={inputEmails.email}
                                    placeholder='Buscar por Email'
                                    onChange={(e) => handleChangeInputEmail(e)}
                                    onKeyPress={handleEnter}
                                />
                                {errorsEmail.email && errorMenssage === true && inputEmails.email.length > 0 && (<p >{errorsEmail.email}</p>)}
                            </div>
                            <button disabled={inputEmails.full_name.length === 0 && inputEmails.email.length === 0}
                                onClick={e => handleSubmitSearchbarEmail(e)}>Buscar</button>
                        </div>)
                }
            </div>
        </>
    )
}