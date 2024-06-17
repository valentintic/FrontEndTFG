import { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginReducer } from "../reducers/loginReducer";
import { loginUser } from "../services/authService";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    isAdmin: false,
    user: undefined,
};

export const useAuth = () => {
    const [login, dispatch] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();

    const handlerOAuthLogin = async () => {
        try {
            window.location.href = 'http://localhost:8080/oauth2/authorization/google';
        } catch (error) {
            Swal.fire('Error', 'No se pudo iniciar sesión con OAuth2', 'error');
            navigate('/home');
        }
    };

    const handlerLogin = async ({ username, password }) => {
        try {
            const response = await loginUser({ username, password });
            const token = response.data.token;
            const claims = JSON.parse(window.atob(token.split(".")[1]));
            const user = { username: claims.sub };
            console.log(token, user);
            dispatch({
                type: 'login',
                payload: { user, isAdmin: claims.isAdmin },
            });
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                isAdmin: claims.isAdmin,
                user,
            }));
            sessionStorage.setItem('token', `Bearer ${token}`);
            navigate('/');
        } catch (error) {
            if (error.response?.status === 401) {
                Swal.fire('Error Login', 'Username o password invalidos', 'error');
            } else if (error.response?.status === 403) {
                Swal.fire('Error Login', 'No tiene acceso al recurso o permisos!', 'error');
            } else {
                throw error;
            }
        }
    };

    const handlerLogout = () => {
        dispatch({
            type: 'logout',
        });
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.clear();
        navigate('/login');
    };

    return {
        login,
        handlerLogin,
        handlerOAuthLogin,
        handlerLogout,
    };
};
