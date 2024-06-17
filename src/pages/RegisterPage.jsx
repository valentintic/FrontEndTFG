import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserForm } from "../components/UserForm";
import { UserContext } from "../context/UserContext";
import './RegisterPage.css';

export const RegisterPage = () => {
    const { users = [], initialUserForm } = useContext(UserContext);
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const user = users.find(u => u.id == id) || initialUserForm;
            setUserSelected(user);
        }
    }, [id]);

    return (
        <div className="container my-5 register-page">
            <h2 className="text-center mb-4">
                {userSelected?.id > 0 ? 'Editar' : 'Registrar'} Usuario
            </h2>
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6 d-none d-md-block">
                    <img 
                        src="/src/assets/almfit.webp" 
                        alt="Logo" 
                        className="img-fluid border shadow rounded animate__animated animate__fadeInLeft"
                    />
                </div>
                <div className="col-md-6">
                    <div className="card p-4 shadow-lg animate__animated animate__fadeInRight">
                        <UserForm userSelected={userSelected} />
                    </div>
                </div>
            </div>
        </div>
    );
};
