import { useDispatch } from 'react-redux';

import { deleteUserId, deleteEmailId } from "../../../Services/rootServices"
import "./paginado.css"

export default function Paginado({ viewUsersOrEmails, users, emails, pagina, porPagina }) {

    const dispatch = useDispatch()

    const handleDeleteUser = async (h, User_ID) => {
        h.preventDefault()

        try {
            const userDelete = await dispatch(deleteUserId({
                id: User_ID,
            }))
            if (userDelete.payload.success) {
                alert("Usuario eliminado correctamente")
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleDeleteEmail = async (h, Email_ID) => {
        h.preventDefault()

        try {
            const emailDelete = await dispatch(deleteEmailId({
                id: Email_ID,
            }))
            if (emailDelete.payload.success) {
                alert("Email eliminado correctamente")
            } else {
                alert("Ocurrio un error")
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className='Container-AllCards-Dashboard'>
                {
                    viewUsersOrEmails === true
                        ?
                        (users.length > 0
                            && users.slice(
                                (pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina
                            ).map(e => {
                                return (
                                    <div key={e.User_ID} className="Container-Card-Dashboard">
                                        <h4>NOMBRE: {e.Name} {e.Last_Name}</h4>
                                        <h4>EMAIL: {e.Email}</h4>
                                        <button onClick={(h) => handleDeleteUser(h, e.User_ID)}>Eliminar Usuario</button>
                                    </div>
                                )
                            }))
                        :
                        (emails.length > 0
                            && emails.slice(
                                (pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina
                            ).map(e => {
                                return (
                                    <div key={e.Email_ID} className="Container-Card-Dashboard">
                                        <h4>NOMBRE: {e.Full_Name}</h4>
                                        <h4>EMAIL: {e.Email}</h4>
                                        <h4>ASUNTO: {e.Subject}</h4>
                                        <button onClick={(h) => handleDeleteEmail(h, e.Email_ID)}>Eliminar Email</button>
                                    </div>
                                )
                            }))
                }
            </div>
        </>
    )
}