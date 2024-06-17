import React from 'react';
import { RegisterForm } from './RegisterForm';
import './UserRegisterPage.css';

export const UserRegisterPage = () => {
    return (
        <div className="container my-5 register-page">
            <h2 className="text-center mb-4">Registrar Usuario</h2>
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
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    );
};
