import React, { useState } from 'react';
import { authService } from '../api/authService';
import { LogIn, AlertCircle } from 'lucide-react';
import '../styles/Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await authService.login(formData.email, formData.password);

            // Redirect based on role
            const isAdmin = data.roles && data.roles.some(role => role === 'ROLE_ADMIN');


            if (isAdmin) {
                window.location.href = '/admin/dashboard';
            } else {
                window.location.href = '/dashboard';
            }
        } catch (err) {

            console.error('Login error:', err);
            setError('Credenciales inválidas. Por favor intente de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <LogIn size={40} className="auth-icon" />
                    <h1>Bienvenido de nuevo</h1>
                    <p>Ingresá tus datos para acceder a tu cuenta.</p>
                </div>

                {error && (
                    <div className="auth-error">
                        <AlertCircle size={20} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email" name="email" value={formData.email}
                            onChange={handleChange} placeholder="correo@ejemplo.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password" name="password" value={formData.password}
                            onChange={handleChange} placeholder="********"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
                        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <p className="auth-footer">
                    ¿No tenés una cuenta? <a href="/register">Registrate acá</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
