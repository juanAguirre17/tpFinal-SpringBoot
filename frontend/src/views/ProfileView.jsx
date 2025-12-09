import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { userService } from '../api/userService';

const ProfileView = ({ onUpdateLeads }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await userService.getMe();
                setProfile(data);
            } catch (err) {
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleUpdateCity = async () => {
        try {
            setSaving(true);
            await userService.updateProfile({ assignedCity: profile.assignedCity });
            alert('¡Zona asignada exitosamente!');
            if (onUpdateLeads) onUpdateLeads();
        } catch (err) {
            console.error('Error updating city:', err);
            alert('Error al actualizar la zona.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Cargando perfil...</div>;
    if (!profile) return <div>Error al cargar el perfil.</div>;

    return (
        <div className="profile-section">
            <div className="profile-card">
                <h3>Información de Cuenta</h3>
                <div className="profile-info">
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Nombre:</strong> {profile.firstName} {profile.lastName}</p>
                </div>

                <div className="saas-config-card">
                    <h4>Configuración SaaS (Regional)</h4>
                    <p className="description">
                        Como Profesional, podés asignar tu zona de cobertura para recibir consultas regionales automáticamente.
                    </p>
                    <div className="city-input-group">
                        <div className="input-with-icon">
                            <MapPin size={18} />
                            <input
                                type="text"
                                placeholder="Ciudad de cobertura (ej: Mar del Plata)"
                                value={profile.assignedCity || ''}
                                onChange={(e) => setProfile({ ...profile, assignedCity: e.target.value })}
                            />
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={handleUpdateCity}
                            disabled={saving}
                        >
                            {saving ? 'Guardando...' : 'Asignar Mi Zona'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
