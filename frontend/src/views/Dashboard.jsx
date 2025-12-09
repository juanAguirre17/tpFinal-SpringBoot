import React, { useState, useEffect } from 'react';
import { propertyService } from '../api/propertyService';
import { leadService } from '../api/leadService';
import ProfileView from './ProfileView';


import {
    Home, MessageSquare, User, Package,
    MapPin, Calendar, Mail, Phone, ExternalLink
} from 'lucide-react';
import '../styles/Dashboard.css';

const Dashboard = ({ onNavigateToProperty }) => {
    const [activeTab, setActiveTab] = useState('properties');
    const [properties, setProperties] = useState([]);
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);




    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [propsData, leadsData] = await Promise.all([
                    propertyService.getMyProperties(),
                    leadService.getMyLeads()
                ]);
                setProperties(propsData);
                setLeads(leadsData);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('No se pudo cargar la información del panel.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const fetchLeadsOnly = async () => {
        try {
            const leadsData = await leadService.getMyLeads();
            setLeads(leadsData);
        } catch (err) {
            console.error('Error updating leads:', err);
        }
    };



    if (loading) return <div className="container dashboard-loading">Abriendo tu panel de control...</div>;

    return (
        <div className="container dashboard-container">
            <div className="dashboard-header">
                <h1>Mi Panel de Control ✨</h1>
                <p>Gestioná tus publicaciones y perfil regional.</p>

            </div>

            <div className="dashboard-layout">
                <aside className="dashboard-nav">
                    <button
                        className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <User size={20} />
                        Mi Perfil
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'properties' ? 'active' : ''}`}
                        onClick={() => setActiveTab('properties')}
                    >
                        <Package size={20} />
                        Mis Publicaciones
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'leads' ? 'active' : ''}`}
                        onClick={() => setActiveTab('leads')}
                    >
                        <MessageSquare size={20} />
                        Consultas Recibidas
                        {leads.length > 0 && <span className="badge">{leads.length}</span>}
                    </button>
                </aside>


                <main className="dashboard-content">
                    {activeTab === 'properties' && (
                        <div className="tab-pane">
                            <div className="pane-header">
                                <h2>{properties.length} Propiedades publicadas</h2>
                                <button className="btn btn-primary" onClick={() => window.location.href = '/publish'}>
                                    Nueva Publicación
                                </button>
                            </div>

                            <div className="dashboard-list">
                                {properties.length === 0 ? (
                                    <div className="empty-state">
                                        <Home size={48} />
                                        <p>Aún no tenés propiedades publicadas.</p>
                                    </div>
                                ) : (
                                    properties.map(prop => (
                                        <div key={prop.id} className="dashboard-card property-row">
                                            <div className="row-main">
                                                <div className="row-info">
                                                    <h4>{prop.title}</h4>
                                                    <div className="row-meta">
                                                        <span><MapPin size={14} /> {prop.city}</span>
                                                        <span>USD {prop.price.toLocaleString()}</span>
                                                        <span className="state-badge">{prop.status}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row-actions">
                                                <button
                                                    className="btn-icon"
                                                    title="Ver anuncio"
                                                    onClick={() => onNavigateToProperty(prop.id)}
                                                >
                                                    <ExternalLink size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'leads' && (
                        <div className="tab-pane">
                            <div className="pane-header">
                                <h2>{leads.length} Consultas recibidas</h2>
                            </div>

                            <div className="dashboard-list">
                                {leads.length === 0 ? (
                                    <div className="empty-state">
                                        <MessageSquare size={48} />
                                        <p>Nadie ha consultado por tus propiedades aún.</p>
                                    </div>
                                ) : (
                                    leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(lead => (
                                        <div key={lead.id} className="dashboard-card lead-row">
                                            <div className="lead-header">
                                                <div className="lead-user">
                                                    <strong>{lead.name}</strong>
                                                    <span className="lead-date">
                                                        <Calendar size={14} />
                                                        {new Date(lead.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="property-ref">
                                                    Ref ID: #{lead.propertyId}
                                                </div>
                                            </div>
                                            <div className="lead-body">
                                                <p>"{lead.message}"</p>
                                            </div>
                                            <div className="lead-footer">
                                                <a href={`mailto:${lead.email}`} className="contact-link">
                                                    <Mail size={16} /> {lead.email}
                                                </a>
                                                {lead.phone && (
                                                    <a href={`tel:${lead.phone}`} className="contact-link">
                                                        <Phone size={16} /> {lead.phone}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className="tab-pane">
                            <div className="pane-header">
                                <h2>Configuración de Perfil</h2>
                            </div>
                            <ProfileView onUpdateLeads={fetchLeadsOnly} />
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
};

export default Dashboard;
