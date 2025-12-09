import React, { useState, useEffect } from 'react';
import { Home, PlusCircle, User, LogIn, LogOut } from 'lucide-react';
import { authService } from '../api/authService';
import '../styles/Navbar.css';

const Navbar = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const handleLogout = () => {
        authService.logout();
        window.location.href = '/';
    };

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <a href="/" className="logo">
                    <Home size={28} className="logo-icon" />
                    <span>RealState<span>SaaS</span></span>
                </a>

                <div className="nav-links">
                    <a href="/properties">Propiedades</a>
                    <a href="/publish" className="publish-link">
                        <PlusCircle size={20} />
                        Publicar
                    </a>
                </div>

                <div className="nav-auth">
                    {currentUser ? (
                        <>
                            <a href="/dashboard" className="user-info">
                                <User size={18} />
                                <span>{currentUser.email}</span>
                            </a>
                            <button className="btn-logout" onClick={handleLogout}>
                                <LogOut size={18} />
                                Salir
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/login" className="btn-login">
                                <LogIn size={20} />
                                Ingresar
                            </a>
                            <a href="/register" className="btn btn-primary">Registrarse</a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
