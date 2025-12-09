import React, { useState, useEffect } from 'react';
import { propertyService } from '../api/propertyService';
import { leadService } from '../api/leadService';
import {
    MapPin, Maximize, BedDouble, Bath, Home as HomeIcon,
    Send, Phone, Mail, CheckCircle, AlertCircle, ChevronLeft
} from 'lucide-react';
import '../styles/PropertyDetail.css';

const PropertyDetail = ({ id, onBack }) => {
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [leadData, setLeadData] = useState({
        name: '',
        email: '',
        phone: '',
        message: 'Hola, me interesa esta propiedad y me gustaría recibir más información. Gracias!'
    });
    const [leadStatus, setLeadStatus] = useState({ type: null, message: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setLoading(true);
                const data = await propertyService.getById(id);
                setProperty(data);
            } catch (err) {
                console.error('Error fetching property detail:', err);
                setError('No se pudo cargar la información de la propiedad.');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProperty();
    }, [id]);

    const handleLeadChange = (e) => {
        setLeadData({ ...leadData, [e.target.name]: e.target.value });
    };

    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setLeadStatus({ type: null, message: '' });

        try {
            await leadService.create({
                ...leadData,
                propertyId: id
            });
            setLeadStatus({
                type: 'success',
                message: '¡Consulta enviada! El anunciante te contactará pronto.'
            });
            setLeadData({
                name: '',
                email: '',
                phone: '',
                message: 'Hola, me interesa esta propiedad y me gustaría recibir más información. Gracias!'
            });
        } catch (err) {
            console.error('Error sending lead:', err);
            setLeadStatus({
                type: 'error',
                message: 'No pudimos enviar tu consulta. Por favor, intenta más tarde.'
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="container detail-loading">Cargando detalles de la propiedad...</div>;
    if (error) return <div className="container detail-error">{error}</div>;
    if (!property) return null;

    return (
        <div className="container property-detail">
            <button className="back-btn" onClick={onBack}>
                <ChevronLeft size={20} />
                Volver al listado
            </button>

            <div className="detail-layout">
                <div className="detail-main">
                    <div className="property-gallery">
                        <img src={`https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=1200`} alt={property.title} className="main-image" />
                        <div className="status-badge">{property.status}</div>
                    </div>

                    <div className="property-info-header">
                        <div className="info-main">
                            <h1>{property.title}</h1>
                            <div className="location">
                                <MapPin size={18} />
                                <span>{property.address}, {property.city}</span>
                            </div>
                        </div>
                        <div className="price-tag">
                            USD {property.price.toLocaleString()}
                        </div>
                    </div>

                    <div className="features-strip">
                        <div className="feature">
                            <Maximize size={20} />
                            <span>{property.surface} m²</span>
                        </div>
                        <div className="feature">
                            <BedDouble size={20} />
                            <span>{property.rooms} Amb.</span>
                        </div>
                        <div className="feature">
                            <Bath size={20} />
                            <span>{property.bathrooms} Baños</span>
                        </div>
                        <div className="feature">
                            <HomeIcon size={20} />
                            <span>{property.type}</span>
                        </div>
                    </div>

                    <div className="description-section">
                        <h2>Descripción</h2>
                        <p>{property.description}</p>
                    </div>
                </div>

                <aside className="detail-sidebar">
                    <div className="contact-card">
                        <h3>Contactar al anunciante</h3>

                        {leadStatus.type && (
                            <div className={`lead-status ${leadStatus.type}`}>
                                {leadStatus.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                                {leadStatus.message}
                            </div>
                        )}

                        <form onSubmit={handleLeadSubmit} className="lead-form">
                            <div className="form-group">
                                <label>Nombre completo</label>
                                <input
                                    type="text" name="name" value={leadData.name}
                                    onChange={handleLeadChange} placeholder="Ej: Juan Pérez" required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email" name="email" value={leadData.email}
                                    onChange={handleLeadChange} placeholder="juan@ejemplo.com" required
                                />
                            </div>
                            <div className="form-group">
                                <label>Teléfono (opcional)</label>
                                <input
                                    type="tel" name="phone" value={leadData.phone}
                                    onChange={handleLeadChange} placeholder="+54..."
                                />
                            </div>
                            <div className="form-group">
                                <label>Mensaje</label>
                                <textarea
                                    name="message" value={leadData.message}
                                    onChange={handleLeadChange} rows="4" required
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary submit-lead" disabled={submitting}>
                                {submitting ? 'Enviando...' : (
                                    <>
                                        <Send size={18} />
                                        Enviar consulta
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="contact-direct">
                            <p>O contactate vía:</p>
                            <div className="direct-buttons">
                                <button className="btn-direct"><Phone size={18} /> Llamar</button>
                                <button className="btn-direct"><Mail size={18} /> Email</button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default PropertyDetail;
