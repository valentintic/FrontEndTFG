import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [login, setLogin] = useState(() => {
        const savedLogin = sessionStorage.getItem('login');
        return savedLogin ? JSON.parse(savedLogin) : { isAuth: false, isAdmin: false, user: null };
    });

    const handlerLogout = () => {
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('token');
        setLogin({ isAuth: false, isAdmin: false, user: null });
    };

    return (
        <AuthContext.Provider value={{ login, setLogin, handlerLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
