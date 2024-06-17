import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { UserRow } from "./UserRow";
import { AuthContext } from "../auth/context/AuthContext";
import { Link } from "react-router-dom";
import { UserForm } from "./UserForm";

export const UsersList = () => {
    const { users, handlerUserSelectedForm, handlerRemoveUser, visibleForm, userSelected, handlerCloseForm, getUsers } = useContext(UserContext);
    const { login } = useContext(AuthContext);

    return (
        <div>
            {visibleForm && (
                <UserForm userSelected={userSelected} handlerCloseForm={handlerCloseForm} getUsers={getUsers} />
            )}
            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        {login.isAdmin && (
                            <>
                                <th>Update</th>
                                <th>Update Route</th>
                                <th>Remove</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {users.map(({ id, username, email, admin }) => (
                        <UserRow
                            key={id}
                            id={id}
                            username={username}
                            email={email}
                            admin={admin}
                            handlerUserSelectedForm={handlerUserSelectedForm}
                            handlerRemoveUser={handlerRemoveUser}
                        />
                    ))}
                </tbody>
            </table>
            <Link to="/" className="btn btn-primary">
                Volver a Inicio
            </Link>
        </div>
    );
};