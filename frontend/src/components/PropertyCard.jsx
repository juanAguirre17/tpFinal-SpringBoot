import React from 'react';
import { Maximize, Bed, Bath, MapPin } from 'lucide-react';
import '../styles/PropertyCard.css';

const PropertyCard = ({ property, onViewDetail }) => {
    const { title, price, type, status, address, city, surface, rooms, bathrooms } = property;

    return (
        <div className="property-card" onClick={onViewDetail}>
            <div className="card-image">
                <img src={`https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60`} alt={title} />
                <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
            </div>

            <div className="card-content">
                <div className="card-price">
                    USD {price?.toLocaleString()}
                </div>
                <h3 className="card-title">{title}</h3>
                <p className="card-location">
                    <MapPin size={16} />
                    {address}, {city}
                </p>

                <div className="card-stats">
                    <div className="stat">
                        <Maximize size={18} />
                        <span>{surface} m²</span>
                    </div>
                    <div className="stat">
                        <Bed size={18} />
                        <span>{rooms} dorms</span>
                    </div>
                    <div className="stat">
                        <Bath size={18} />
                        <span>{bathrooms} baños</span>
                    </div>
                </div>

                <div className="card-footer">
                    <span className="property-type">{type}</span>
                    <button className="btn-details" onClick={(e) => {
                        e.stopPropagation();
                        onViewDetail();
                    }}>
                        Ver detalle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
