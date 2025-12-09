import React from 'react';
import {
    LayoutDashboard, Building2, Users, MessageSquare,
    Settings, LogOut, ChevronRight, Home, User
} from 'lucide-react';

import { authService } from '../api/authService';
import '../styles/Sidebar.css';

const Sidebar = ({ activeTab, onTabChange }) => {
    const user = authService.getCurrentUser();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'properties', label: 'Propiedades', icon: Building2 },
        { id: 'users', label: 'Usuarios', icon: Users },
        { id: 'leads', label: 'Consultas Globales', icon: MessageSquare },
        { id: 'profile', label: 'Mi Perfil', icon: User },
        { id: 'settings', label: 'Configuración', icon: Settings },
    ];


    const handleLogout = () => {
        authService.logout();
        window.location.href = '/';
    };

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <ShieldCheck size={24} />
                    <span>RealState<span>Admin</span></span>
                </div>

            </div>

            <nav className="sidebar-nav">
                <div className="nav-section">
                    <label>Principal</label>
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            className={`sidebar-link ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => onTabChange(item.id)}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                            {activeTab === item.id && <ChevronRight size={16} className="active-arrow" />}
                        </button>
                    ))}
                </div>

                <div className="nav-section secondary">
                    <label>Accesos Directos</label>
                    <a href="/" className="sidebar-link">
                        <Home size={20} />
                        <span>Ver Sitio Público</span>
                    </a>
                </div>
            </nav>

            <div className="sidebar-footer">
                <div className="admin-profile">
                    <div className="profile-avatar">
                        {user?.email?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div className="profile-info">
                        <strong>{user?.firstName || 'Administrador'}</strong>
                        <span>{user?.email}</span>
                    </div>
                </div>
                <button className="btn-logout-sidebar" onClick={handleLogout}>
                    <LogOut size={20} />
                </button>
            </div>
        </aside>
    );
};

// Simple icon replacement since I missed importing it
const ShieldCheck = ({ size }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size} height={size}
        viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

export default Sidebar;
