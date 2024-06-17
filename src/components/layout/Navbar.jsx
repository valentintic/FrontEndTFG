import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import './Navbar.css';

export const Navbar = () => {
    const { login, handlerLogout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    AlmFit
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {login.isAuth && 
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/consumos">
                                        Consumos
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/alimentos">
                                        Alimentos
                                    </NavLink>
                                </li>
                                {login.isAdmin && <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/users">
                                            Usuarios
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/users/register">
                                            Register
                                        </NavLink>
                                    </li>
                                </>}
                            </>
                        }
                    </ul>
                </div>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNavLogout">
                    <span className="nav-item nav-link text-primary mx-3">
                        {login.user?.username}
                    </span>

                    <button
                        onClick={handlerLogout}
                        className="btn btn-outline-success">
                        {login.isAuth ? 'Cerrar Sesión' : 'Login'}
                    </button>
                </div>
            </div>
        </nav>
    );
};
