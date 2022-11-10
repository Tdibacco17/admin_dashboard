import { useDispatch } from 'react-redux';

import { orderByName, orderByFullName, searchbarUser, searchbarEmail } from "../../../Services/rootServices"

export default function Filters({ viewUsersOrEmails, setPagina, setOrderUser, setOrderEmail }) {

    const dispatch = useDispatch()

    const handleSortUser = (e) => {
        if (e.target.value === "refresh") {
            dispatch(searchbarUser())
        } else {
            dispatch(orderByName(e.target.value));
            setOrderUser(`Ordenado ${e.target.value}`);
            setPagina(1)
        }
    };

    const handleSortEmail = (e) => {
        if (e.target.value === "refresh") {
            dispatch(searchbarEmail())
        } else {
            dispatch(orderByFullName(e.target.value));
            setOrderEmail(`Ordenado ${e.target.value}`);
            setPagina(1)
        }
    };

    return (
        <>
            {
                viewUsersOrEmails === true
                    ? (<select onChange={e => handleSortUser(e)}>
                        <option value="refresh">Filtrar</option>
                        <option value="asc">A - Z</option>
                        <option value="desc">Z - A</option>
                    </select>)
                    : (<select onChange={e => handleSortEmail(e)}>
                        <option value="refresh">Filtrar</option>
                        <option value="asc">A - Z</option>
                        <option value="desc">Z - A</option>
                    </select>)
            }
        </>
    )
}