import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { getLogoutUser } from "../../Services/authServices"
import "./navbar.css"

export default function Navbar() {

    const dispatch = useDispatch()

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const isAdmin = useSelector((state) => state.auth.isAdmin);

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(getLogoutUser())
    }

    return (
        <>
            <div >
                {
                    isLoggedIn === false
                        ? (<div className="container-All-Navbar">
                            <div id="espacioButtons">
                                <Link to="/contact"><button>Contact</button></Link>
                            </div>
                        </div>)
                        : (<div className="container-All-Navbar">
                            <div id="espacioButtons">
                                <Link to="/login"><button onClick={handleLogout}>Logout</button></Link>
                            </div>
                            <div id="espacioButtons">
                                <Link to="/home"><button>Home</button></Link>
                            </div>
                            <div id="espacioButtons">
                                <Link to="/profile"><button>Profile</button></Link>
                            </div>
                            {
                                isAdmin === true
                                && <>
                                    <div id="espacioButtons">
                                        <Link to="/dashboard"><button>Dashboard</button></Link>
                                    </div>
                                    <div id="espacioButtons">
                                        <Link to="/backoffice"><button>Backoffice</button></Link>
                                    </div>
                                </>

                            }
                        </div>)
                }

            </div>
        </>
    )
}