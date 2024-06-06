import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';  // Assume you have a CSS file for styling

const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    }

    return (
        <div className="home-page">
            <h1>McDonald's Saint Médard en Jalles</h1>
            <button>Ouvert</button>
            <button>Fermé</button>
            <button onClick={() => navigate('/orders')}>Commandes</button>
            <button onClick={() => navigate('/products')}>Mes produits</button>
            <button onClick={() => navigate('/restaurant-info')}>Informations restaurant</button>
            <button onClick={handleLogout}>Se déconnecter</button>
        </div>
    );
}

export default HomePage;
