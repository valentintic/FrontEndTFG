import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { UserForm } from "./UserForm";
import './UserModalForm.css';

export const UserModalForm = () => {
    const { userSelected, handlerCloseForm, getUsers } = useContext(UserContext); // Asegúrate de que getUsers se incluye

    return (
        <div className="modal-container">
            <div className="modal" style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">
                                {userSelected.id > 0 ? 'Editar' : 'Crear'} Usuario
                            </h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={handlerCloseForm}></button>
                        </div>
                        <div className="modal-body">
                            <UserForm
                                userSelected={userSelected}
                                handlerCloseForm={handlerCloseForm}
                                getUsers={getUsers} // Pasar getUsers a UserForm
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
