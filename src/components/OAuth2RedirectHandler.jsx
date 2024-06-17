import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleOAuthResponse = async () => {
            const urlParams = new URLSearchParams(location.search);
            const username = urlParams.get('username');
            const token = urlParams.get('token');

            console.log('Received token:', token);
            console.log('Received username:', username);

            if (username && token) {
                try {
                    const claims = JSON.parse(window.atob(token.split(".")[1]));
                    const user = { username: claims.sub };
                    const isAdmin = claims.isAdmin;

                    sessionStorage.setItem('login', JSON.stringify({
                        isAuth: true,
                        isAdmin,
                        user,
                    }));
                    sessionStorage.setItem('token', `Bearer ${token}`);
                    
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    console.log('Login exitoso con OAuth2:', user);

                    navigate('/'); // Redirigir a la página principal
                    window.location.reload(); // Recargar la página después de la redirección
                } catch (error) {
                    Swal.fire('Error', 'Error en la autenticación con OAuth2', 'error');
                    console.error('Error in handleOAuthResponse:', error);
                    navigate('/login');
                }
            } else {
                Swal.fire('Error', 'Error en la autenticación con OAuth2', 'error');
                navigate('/login');
            }
        };

        handleOAuthResponse();
    }, [location.search, navigate]);

    return <div>Loading...</div>;
};

export default OAuth2RedirectHandler;
