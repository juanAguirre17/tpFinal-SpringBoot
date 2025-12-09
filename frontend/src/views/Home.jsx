import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import { propertyService } from '../api/propertyService';
import '../styles/Home.css';

const Home = ({ onViewDetail }) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const data = await propertyService.getAll();
            setProperties(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching properties:', err);
            setError('No se pudieron cargar las propiedades. Asegúrese de que el backend esté corriendo.');
            // Mock data for demo if API fails
            setProperties([
                {
                    id: 1,
                    title: 'Casa Moderna con Piscina',
                    price: 250000,
                    type: 'CASA',
                    status: 'PUBLICADA',
                    address: 'Av. Libertador 1200',
                    city: 'Buenos Aires',
                    surface: 150,
                    rooms: 4,
                    bathrooms: 2
                },
                {
                    id: 2,
                    title: 'Departamento Vista al Mar',
                    price: 180000,
                    type: 'DEPARTAMENTO',
                    status: 'PUBLICADA',
                    address: 'Bv. Marítimo 2500',
                    city: 'Mar del Plata',
                    surface: 70,
                    rooms: 2,
                    bathrooms: 1
                },
                {
                    id: 3,
                    title: 'Lote en Barrio Cerrado',
                    price: 45000,
                    type: 'TERRENO',
                    status: 'RESERVADA',
                    address: 'Ruta 27 Km 5',
                    city: 'Tigre',
                    surface: 600,
                    rooms: 0,
                    bathrooms: 0
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="home-view">
            <Hero />

            <div className="container main-content">
                <div className="section-header">
                    <h2>Propiedades Destacadas</h2>
                    <div className="filter-summary">
                        Mostrando {properties.length} propiedades
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div className="loading-grid">
                        {[1, 2, 3].map(i => <div key={i} className="skeleton-card"></div>)}
                    </div>
                ) : properties.length > 0 ? (
                    <div className="property-grid">
                        {properties.map(property => (
                            <PropertyCard key={property.id} property={property} onViewDetail={() => onViewDetail(property.id)} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">🏠</div>
                        <h3>No hay propiedades publicadas aún</h3>
                        <p>Sé el primero en publicar una propiedad en la plataforma.</p>
                        <a href="/publish" className="btn btn-primary">Publicar Propiedad</a>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Home;
