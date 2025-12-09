import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ProfileView from './ProfileView';

import {
    Users, Building2, MessageSquare, TrendingUp,
    Search, Filter, MoreVertical, Edit, Trash2, Eye,
    ShieldCheck, Save, X, CheckCircle, AlertCircle
} from 'lucide-react';



import { propertyService } from '../api/propertyService';
import { leadService } from '../api/leadService';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({
        totalProperties: 0,
        totalUsers: 0, // Placeholder
        totalLeads: 0,
        activeSaaS: 0
    });
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});


    useEffect(() => {
        const fetchGlobalData = async () => {
            try {
                setLoading(true);
                const [props, leads] = await Promise.all([
                    propertyService.getAll(),
                    leadService.listAll()
                ]);


                setProperties(props);
                setStats({
                    totalProperties: props.length,
                    totalUsers: 14, // Mock
                    totalLeads: leads.length,
                    activeSaaS: 3
                });
            } catch (err) {
                console.error('Error fetching admin data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchGlobalData();
    }, []);

    const handleStatusChange = async (id, currentProperty, newStatus) => {
        try {
            await propertyService.update(id, {
                ...currentProperty,
                status: newStatus
            });
            setProperties(properties.map(p => p.id === id ? { ...p, status: newStatus } : p));
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Error al actualizar el estado.');
        }
    };

    const startEditing = (prop) => {
        setEditingId(prop.id);
        setEditFormData({ title: prop.title, price: prop.price });
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditFormData({});
    };

    const handleSaveEdit = async (id, currentProperty) => {
        try {
            const updated = await propertyService.update(id, {
                ...currentProperty,
                ...editFormData
            });
            setProperties(properties.map(p => p.id === id ? { ...p, ...editFormData } : p));
            setEditingId(null);
        } catch (err) {
            console.error('Error saving property:', err);
            alert('Error al guardar los cambios.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Eliminar esta propiedad permanentemente?')) return;
        try {
            await propertyService.delete(id);
            setProperties(properties.filter(p => p.id !== id));
        } catch (err) {
            console.error('Error deleting:', err);
        }
    };


    const renderDashboardOverview = () => (
        <div className="admin-overview">
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon properties"><Building2 size={24} /></div>
                    <div className="stat-content">
                        <h3>{stats.totalProperties}</h3>
                        <p>Propiedades Totales</p>
                    </div>
                    <div className="stat-trend positive">
                        <TrendingUp size={14} /> +12%
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon users"><Users size={24} /></div>
                    <div className="stat-content">
                        <h3>{stats.totalUsers}</h3>
                        <p>Usuarios Registrados</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon leads"><MessageSquare size={24} /></div>
                    <div className="stat-content">
                        <h3>{stats.totalLeads}</h3>
                        <p>Consultas Generadas</p>
                    </div>
                </div>
            </div>

            <div className="recent-activity">
                <div className="table-header">
                    <h2>Propiedades Recientes</h2>
                    <div className="table-actions">
                        <div className="search-bar">
                            <Search size={18} />
                            <input type="text" placeholder="Filtrar por título..." />
                        </div>
                        <button className="btn-filter"><Filter size={18} /></button>
                    </div>
                </div>

                <div className="admin-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Anuncio</th>
                                <th>Dueño</th>
                                <th>Estado</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.slice(0, 10).map(prop => (
                                <tr key={prop.id} className={`${editingId === prop.id ? 'editing-row' : ''} status-${prop.status.toLowerCase()}`}>
                                    <td>
                                        {editingId === prop.id ? (
                                            <input
                                                type="text"
                                                className="edit-input"
                                                value={editFormData.title}
                                                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                                            />
                                        ) : (
                                            <div className="prop-cell">
                                                <strong>{prop.title}</strong>
                                                <span>{prop.city}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td>{prop.ownerEmail || 'Desconocido'}</td>
                                    <td>
                                        <div className="status-controls">
                                            <button
                                                className={`status-btn pending ${prop.status === 'PENDIENTE_APROBACION' ? 'active' : ''}`}
                                                onClick={() => handleStatusChange(prop.id, prop, 'PENDIENTE_APROBACION')}
                                                title="Marcar como Pendiente"
                                            >
                                                <X size={14} />
                                            </button>
                                            <button
                                                className={`status-btn published ${prop.status === 'PUBLICADA' ? 'active' : ''}`}
                                                onClick={() => handleStatusChange(prop.id, prop, 'PUBLICADA')}
                                                title="Aprobar y Publicar"
                                            >
                                                <CheckCircle size={14} />
                                            </button>
                                            <button
                                                className={`status-btn sold ${prop.status === 'VENDIDA' ? 'active' : ''}`}
                                                onClick={() => handleStatusChange(prop.id, prop, 'VENDIDA')}
                                                title="Marcar como Vendida"
                                            >
                                                <ShieldCheck size={14} />
                                            </button>
                                            <button
                                                className={`status-btn suspended ${prop.status === 'SUSPENDIDA' ? 'active' : ''}`}
                                                onClick={() => handleStatusChange(prop.id, prop, 'SUSPENDIDA')}
                                                title="Suspender publicación"
                                            >
                                                <AlertCircle size={14} />
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        {editingId === prop.id ? (
                                            <div className="edit-price">
                                                <span>USD</span>
                                                <input
                                                    type="number"
                                                    className="edit-input small"
                                                    value={editFormData.price}
                                                    onChange={(e) => setEditFormData({ ...editFormData, price: parseFloat(e.target.value) })}
                                                />
                                            </div>
                                        ) : (
                                            `USD ${prop.price.toLocaleString()}`
                                        )}
                                    </td>
                                    <td>
                                        <div className="action-btns">
                                            {editingId === prop.id ? (
                                                <>
                                                    <button className="btn-action save" onClick={() => handleSaveEdit(prop.id, prop)} title="Guardar">
                                                        <Save size={16} />
                                                    </button>
                                                    <button className="btn-action cancel" onClick={cancelEditing} title="Cancelar">
                                                        <X size={16} />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className="btn-action" onClick={() => startEditing(prop)} title="Edición rápida">
                                                        <Edit size={16} />
                                                    </button>
                                                    <button className="btn-action delete" onClick={() => handleDelete(prop.id)} title="Eliminar">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );


    return (
        <div className="admin-layout">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <main className="admin-main">
                <header className="admin-topbar">
                    <div className="topbar-left">
                        <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                    </div>
                    <div className="topbar-right">
                        <div className="system-health">
                            <div className="health-dot online"></div>
                            Sistema Operativo
                        </div>
                    </div>
                </header>

                <div className="admin-page-content">
                    {loading ? (
                        <div className="admin-loading">Cargando datos del sistema...</div>
                    ) : (
                        <>
                            {activeTab === 'dashboard' && renderDashboardOverview()}
                            {activeTab === 'profile' && <ProfileView />}
                            {/* Other tabs can be added here */}
                        </>
                    )}
                </div>

            </main>
        </div>
    );
};

export default AdminDashboard;
