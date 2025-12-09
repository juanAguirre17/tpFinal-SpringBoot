import React, { useState } from 'react';
import { authService } from '../api/authService';
import { UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import '../styles/Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'ROLE_PARTICULAR'
    });
    const [status, setStatus] = useState({ type: null, message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: null, message: '' });
        setLoading(true);

        try {
            await authService.register(formData);
            setStatus({ type: 'success', message: '¡Registro exitoso! Redirigiendo...' });
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } catch (err) {
            console.error('Registration error:', err);
            setStatus({ type: 'error', message: 'Error en el registro. Es posible que el email ya esté en uso.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <UserPlus size={40} className="auth-icon" />
                    <h1>Creá tu cuenta</h1>
                    <p>Unite a la red inmobiliaria más grande.</p>
                </div>

                {status.type && (
                    <div className={`auth-status ${status.type}`}>
                        {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input
                                type="text" name="firstName" value={formData.firstName}
                                onChange={handleChange} placeholder="Juan"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Apellido</label>
                            <input
                                type="text" name="lastName" value={formData.lastName}
                                onChange={handleChange} placeholder="Pérez"
                                required
                            />
                        </div>
                    </div>

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
                        {loading ? 'Registrando...' : 'Crear Cuenta'}
                    </button>
                </form>

                <p className="auth-footer">
                    ¿Ya tenés una cuenta? <a href="/login">Iniciá sesión acá</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
