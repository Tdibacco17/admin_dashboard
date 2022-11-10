import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Searchbar from './Searchbar/searchbar';
import Paginado from './Paginado/paginado';
import Filters from './Filters/filters';
import { getAllUser, getAllEmail, searchbarEmail, searchbarUser } from "../../Services/rootServices"
import "./dashboard.css"

export default function Dashboard() {

    const dispatch = useDispatch()

    const users = useSelector(state => state.root.users)
    const emails = useSelector(state => state.root.emails)

    const [orderUser, setOrderUser] = useState("");
    const [orderEmail, setOrderEmail] = useState("");

    //controlador de estado user-emails
    const [viewUsersOrEmails, setViewUsersOrEmails] = useState(true)

    //paginado----------------------------------
    const [pagina, setPagina] = useState(1)
    const [porPagina, setPorPagina] = useState(8)
    let maximo;
    viewUsersOrEmails === true
        ? maximo = users.length / porPagina
        : maximo = emails.length / porPagina

    const nextPage = () => {
        setPagina(pagina + 1)
    }
    const previousPage = () => {
        setPagina(pagina - 1)
    }
    //------------------------------------------

    useEffect(() => {
        dispatch(getAllUser())
        dispatch(getAllEmail())
    }, [dispatch]) // falta agregar q al momento de elminar un mail o usuario recarga el dashboard

    const handleView = () => {
        setPagina(1)
        viewUsersOrEmails === true ? setViewUsersOrEmails(false) : setViewUsersOrEmails(true)
    }

    const handleReload = () => {
        dispatch(searchbarUser())
        dispatch(searchbarEmail())
        setPagina(1)
    }

    return (
        <>
            <div className='container-All-Searchbar-Filters'>

                <Searchbar viewUsersOrEmails={viewUsersOrEmails} setPagina={setPagina} />

                <div className='Container-All-Filters'>
                    <button onClick={handleReload}>Recargar</button>
                    {
                        viewUsersOrEmails === true
                            ? (<button onClick={handleView}>Cambiar a Emails</button>)
                            : (<button onClick={handleView}>Cambiar a Usuarios</button>)
                    }
                    <Filters viewUsersOrEmails={viewUsersOrEmails} setPagina={setPagina} setOrderUser={setOrderUser} setOrderEmail={setOrderEmail} />
                    <div className='Container-All-Filters'>
                        <button disabled={pagina === 1 || pagina < 1} onClick={previousPage}>izq</button>
                        <br></br>
                        <h4>paginado</h4>
                        <button disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)} onClick={nextPage}>der</button>
                    </div>
                </div>
            </div>

            <Paginado viewUsersOrEmails={viewUsersOrEmails} users={users} emails={emails} pagina={pagina} porPagina={porPagina} />
        </>
    )
}