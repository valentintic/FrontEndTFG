import { useContext, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../auth/context/AuthContext";
import './UsersPage.css';

export const UsersPage = () => {
    const {
        users,
        visibleForm,
        handlerOpenForm,
        getUsers,
    } = useContext(UserContext);

    const { login } = useContext(AuthContext);
    const [inProp, setInProp] = useState(false);

    useEffect(() => {
        getUsers();
        setInProp(true); // Trigger the animation on mount
    }, []);

    return (
        <CSSTransition in={inProp} timeout={500} classNames="page" unmountOnExit>
            <div className="animated-background">
                <div className="container my-4 users-page content-container">
                    {visibleForm && <UserModalForm />}
                    <h1 className="text-center mb-4">Gestión de Usuarios</h1>
                    <div className="text-center mb-4">
                        {login.isAdmin && !visibleForm && (
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={handlerOpenForm}
                            >
                                Nuevo Usuario
                            </button>
                        )}
                    </div>
                    <div className="row">
                        <div className="col">
                            {users.length === 0 ? (
                                <div className="alert alert-warning">No hay usuarios en el sistema!</div>
                            ) : (
                                <UsersList />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};
