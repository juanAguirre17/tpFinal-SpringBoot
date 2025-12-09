import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { authService } from '../api/authService';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await authService.login(credentials.email, credentials.password);
            console.log("DEBUG: Admin Login Response:", data);

            // Check if user is actually an admin
            const isAdmin = data.roles && data.roles.some(role => role === 'ROLE_ADMIN');

            if (isAdmin) {
                window.location.href = '/admin/dashboard';
            } else {
                authService.logout();
                setError(`Acceso denegado. Tu cuenta (${credentials.email}) no tiene el rol ROLE_ADMIN. Roles encontrados: ${data.roles?.join(', ') || 'ninguno'}`);
            }
        } catch (err) {
            console.error('Admin login error:', err);
            const status = err.response?.status;
            if (status === 401 || status === 403) {
                setError('Credenciales inválidas. Verifique su email y contraseña.');
            } else {
                setError('Error de conexión con el servidor. Verifique que el Backend esté corriendo.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <div className="admin-login-header">
                    <div className="admin-badge">
                        <ShieldCheck size={32} />
                    </div>
                    <h1>Admin Central</h1>
                    <p>Panel de Control del Sistema</p>
                </div>

                {error && (
                    <div className="admin-login-error">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="admin-login-form">
                    <div className="admin-form-group">
                        <label>Email Corporativo</label>
                        <div className="admin-input-wrapper">
                            <Mail size={18} />
                            <input
                                type="email" name="email" value={credentials.email}
                                onChange={handleChange} placeholder="admin@sistema.com" required
                            />
                        </div>
                    </div>

                    <div className="admin-form-group">
                        <label>Contraseña</label>
                        <div className="admin-input-wrapper">
                            <Lock size={18} />
                            <input
                                type="password" name="password" value={credentials.password}
                                onChange={handleChange} placeholder="••••••••" required
                            />
                        </div>
                    </div>

                    <button type="submit" className="admin-btn-login" disabled={loading}>
                        {loading ? 'Verificando...' : (
                            <>
                                Acceder al Panel
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="admin-login-footer">
                    <a href="/">Volver a la plataforma pública</a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
