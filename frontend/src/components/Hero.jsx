import React from 'react';
import { Search, MapPin } from 'lucide-react';
import '../styles/Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-overlay"></div>
            <div className="container hero-content">
                <h1>Encontrá tu próximo hogar</h1>
                <p>Miles de propiedades en venta y alquiler en un solo lugar.</p>

                <div className="search-box">
                    <div className="search-input">
                        <Search className="search-icon" size={20} />
                        <input type="text" placeholder="Buscar por ciudad, barrio o zona..." />
                    </div>
                    <div className="search-select">
                        <select>
                            <option value="buy">Venta</option>
                            <option value="rent">Alquiler</option>
                        </select>
                    </div>
                    <button className="btn btn-primary search-btn">Buscar</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
