import React, { useState } from 'react';
import { propertyService } from '../api/propertyService';
import { CheckCircle, AlertCircle } from 'lucide-react';
import '../styles/Publish.css';

const Publish = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        type: 'CASA',
        address: '',
        city: '',
        surface: '',
        rooms: '',
        bathrooms: ''
    });

    const [status, setStatus] = useState({ type: null, message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: '' });

        try {
            await propertyService.create({
                ...formData,
                price: parseFloat(formData.price),
                surface: parseFloat(formData.surface),
                rooms: parseInt(formData.rooms),
                bathrooms: parseInt(formData.bathrooms),
                status: 'PENDIENTE_APROBACION'
            });
            setStatus({ type: 'success', message: '¡Propiedad enviada con éxito! Un administrador revisará el aviso.' });
            setTimeout(() => {
                window.location.href = '/';
            }, 2500);
            setFormData({
                title: '',
                description: '',
                price: '',
                type: 'CASA',
                address: '',
                city: '',
                surface: '',
                rooms: '',
                bathrooms: ''
            });
        } catch (err) {
            console.error('Error publishing property:', err);
            setStatus({ type: 'error', message: 'Error al publicar. Verifique que el servidor esté activo y los datos sean correctos.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container publish-container">
            <div className="publish-card">
                <h1>Publicar mi propiedad</h1>
                <p>Completá los datos para que miles de personas vean tu aviso.</p>

                {status.type && (
                    <div className={`status-box ${status.type}`}>
                        {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="publish-form">
                    <div className="form-group">
                        <label>Título del aviso</label>
                        <input
                            type="text" name="title" value={formData.title}
                            onChange={handleChange} placeholder="Ej: Departamento 2 ambientes en Belgrano"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Tipo de propiedad</label>
                            <select name="type" value={formData.type} onChange={handleChange}>
                                <option value="CASA">Casa</option>
                                <option value="DEPARTAMENTO">Departamento</option>
                                <option value="TERRENO">Terreno</option>
                                <option value="LOCAL">Local</option>
                                <option value="OFICINA">Oficina</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Precio (USD)</label>
                            <input
                                type="number" name="price" value={formData.price}
                                onChange={handleChange} placeholder="0.00"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Dirección</label>
                            <input
                                type="text" name="address" value={formData.address}
                                onChange={handleChange} placeholder="Calle y altura"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Ciudad</label>
                            <input
                                type="text" name="city" value={formData.city}
                                onChange={handleChange} placeholder="Ej: Buenos Aires"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row ternary">
                        <div className="form-group">
                            <label>Superficie (m²)</label>
                            <input type="number" name="surface" value={formData.surface} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Ambientes</label>
                            <input type="number" name="rooms" value={formData.rooms} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Baños</label>
                            <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea
                            name="description" value={formData.description}
                            onChange={handleChange} placeholder="Contanos más sobre la propiedad..."
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="admin-conditions-notice">
                        <h3>📋 Condiciones de Publicación</h3>
                        <ul>
                            <li>Su propiedad será revisada por un administrador antes de ser pública.</li>
                            <li>Asegúrese de que las fotos y descripción sean veraces.</li>
                            <li>Al publicar, acepta los términos y condiciones del portal.</li>
                        </ul>
                    </div>

                    <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                        {loading ? 'Enviando Revisión...' : 'Enviar para Aprobación'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Publish;
