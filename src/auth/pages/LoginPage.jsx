import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import './LoginPage.css';

const initialLoginForm = {
    username: '',
    password: '',
};

export const LoginPage = () => {
    const { handlerLogin } = useContext(AuthContext);
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const { username, password } = loginForm;
    const { handlerOAuthLogin } = useAuth();

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setLoginForm({
            ...loginForm,
            [name]: value,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (!username || !password) {
            Swal.fire('Error de validacion', 'Username y password requeridos', 'error');
            return;
        }

        handlerLogin({ username, password });
        setLoginForm(initialLoginForm);
    };

    const onOAuthLogin = () => {
        handlerOAuthLogin();
    }

    return (
        <div className="login-page">
            <div className="container my-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="card p-4 shadow-lg animate__animated animate__fadeIn">
                            <div className="card-header bg-primary text-white text-center">
                                <h3 className="card-title">AlmFit</h3>
                            </div>
                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <input
                                            className="form-control my-3"
                                            placeholder="Username"
                                            name="username"
                                            value={username}
                                            onChange={onInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control my-3"
                                            placeholder="Password"
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={onInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="card-footer text-center">
                                    <button className="btn btn-primary btn-lg w-100 mb-2" type="submit">
                                        Login
                                    </button>
                                    <button type="button" className="btn btn-light btn-lg w-100 mb-2" onClick={onOAuthLogin}>
                                        <FontAwesomeIcon icon={faGoogle} /> Login with Google
                                    </button>
                                    <div className="mt-3">
                                        <span>No tienes cuenta? </span>
                                        <Link to="/user-register" className="text-primary">Regístrate aquí</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
