import { useEffect, useState } from "react";
import { getAllRoles, save, update } from "../services/userService";

export const UserForm = ({ userSelected, handlerCloseForm, getUsers }) => {
    const initialUserForm = {
        id: 0,
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        password: '',
        roles: []
    };

    const [userForm, setUserForm] = useState(initialUserForm);
    const [roles, setRoles] = useState([]);
    const { id, username, email, firstName, lastName, birthDate, password, roles: userRoles } = userForm;

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const rolesData = await getAllRoles();
                console.log("Fetched roles:", rolesData);
                setRoles(rolesData);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();

        if (userSelected) {
            setUserForm({
                ...userSelected,
                password: '', // Clear password field for update
                roles: userSelected.roles || [],
                birthDate: userSelected.birthDate ? userSelected.birthDate.split('/').reverse().join('-') : '' // Formatea la fecha para el input
            });
        } else {
            setUserForm(initialUserForm);
        }
    }, [userSelected]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value,
        });
    };

    const onRoleChange = (e) => {
        const { options } = e.target;
        const selectedRoles = [];
        for (const option of options) {
            if (option.selected) {
                const role = roles.find(role => role.name === option.value);
                if (role) {
                    selectedRoles.push(role);
                }
            }
        }
        setUserForm({
            ...userForm,
            roles: selectedRoles,
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const formattedUserForm = {
            ...userForm,
            birthDate: userForm.birthDate ? userForm.birthDate.split('-').reverse().join('/') : '',
            roles: userForm.roles.map(role => role.name) // Formatear roles para el backend
        };
        try {
            if (formattedUserForm.id > 0) {
                // Do not send the password if it's empty
                if (formattedUserForm.password === '') {
                    delete formattedUserForm.password;
                }
                await update(formattedUserForm);
            } else {
                await save(formattedUserForm);
            }
            getUsers(); // Recargar los usuarios después de una operación exitosa
            handlerCloseForm();
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    };

    return (
        <form onSubmit={onSubmit} className="text-center">
            <div className="form-group justify-content-center">
                <input
                    className="form-control my-3 w-75"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={onInputChange}
                    style={{ borderRadius: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                />
                <input
                    className="form-control my-3 w-75"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onInputChange}
                    style={{ borderRadius: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                />
                <input
                    className="form-control my-3 w-75"
                    placeholder="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={onInputChange}
                    style={{ borderRadius: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                />
                <input
                    className="form-control my-3 w-75"
                    placeholder="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={onInputChange}
                    style={{ borderRadius: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                />
                <input
                    className="form-control my-3 w-75"
                    placeholder="Birth Date"
                    type="date"
                    name="birthDate"
                    value={birthDate}
                    onChange={onInputChange}
                    style={{ borderRadius: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                />
                {id === 0 && (
                    <input
                        className="form-control my-3 w-75"
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={onInputChange}
                        style={{ borderRadius: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                    />
                )}
                <div className="form-group my-3">
                    <label htmlFor="roles" className="form-label">Roles</label>
                    <select
                        multiple
                        className="form-control my-3 w-75"
                        name="roles"
                        value={userRoles.map(role => role.name)}
                        onChange={onRoleChange}
                        style={{ borderRadius: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                    >
                        {roles.map(role => (
                            <option key={role.name} value={role.name}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="btn btn-primary btn-lg" type="submit" style={{ borderRadius: '20px' }}>
                    {id > 0 ? 'Editar' : 'Crear'}
                </button>
                {handlerCloseForm && (
                    <button
                        className="btn btn-secondary btn-lg mx-2"
                        type="button"
                        onClick={onCloseForm}
                        style={{ borderRadius: '20px' }}
                    >
                        Cerrar
                    </button>
                )}
            </div>
        </form>
    );
};
