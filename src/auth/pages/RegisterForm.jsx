import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/userService';

const initialUserForm = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    birthDate: '',
};

export const RegisterForm = () => {
    const [userForm, setUserForm] = useState(initialUserForm);
    const navigate = useNavigate();

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value,
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(userForm)
        try {
            await registerUser(userForm);
            Swal.fire('Usuario Registrado', 'Usuario registrado con éxito', 'success');
            navigate('/login');
        } catch (error) {
            Swal.fire('Error', 'No se pudo registrar el usuario', 'error');
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={userForm.username}
                    onChange={onInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={userForm.password}
                    onChange={onInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={userForm.email}
                    onChange={onInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={userForm.firstName}
                    onChange={onInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={userForm.lastName}
                    onChange={onInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Birth Date</label>
                <input
                    type="date"
                    name="birthDate"
                    className="form-control"
                    value={userForm.birthDate}
                    onChange={onInputChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-4">
                Registrar
            </button>
        </form>
    );
};
