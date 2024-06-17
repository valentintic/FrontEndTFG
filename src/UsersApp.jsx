import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './auth/context/AuthContext';
import { LoginPage } from './auth/pages/LoginPage';
import Home from './components/Home'; 
import { UserRoutes } from './routes/UserRoutes';
import { RegisterPage } from './pages/RegisterPage';
import AlimentosPage from './alimentos/pages/ViewAlimento';
import { Navbar } from './components/layout/Navbar';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';
import ConsumoDiarioPage from './consumos/components/ConsumoDiarioPage';
import { UserRegisterPage } from './auth/pages/UserRegisterPage';
import { UserProvider } from './context/UserProvider';
import "./styles.css";

export const UsersApp = () => {
    const { login } = useContext(AuthContext);

    return (
        <UserProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
                <Route path="/user-register" element={<UserRegisterPage />} />
                {login.isAuth ? (
                    <>
                        <Route path="/*" element={<UserRoutes />} />
                        <Route path='/consumos' element={<ConsumoDiarioPage />} />
                        <Route path="/alimentos" element={<AlimentosPage />} />
                    </>
                ) : (
                    <Route path="/*" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </UserProvider>
    );
};
