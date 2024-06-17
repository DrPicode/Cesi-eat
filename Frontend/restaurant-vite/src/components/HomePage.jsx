import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="main-container">
            <header>
                <h1>CESI Eats</h1>
                <h3>Restaurateur</h3>
            </header>
            <div className="home-page">
                <h2>McDonald's Saint Médard en Jalles</h2>
                <div className="status-buttons">
                    <button className="primary">Ouvert</button>
                    <button className="secondary">Fermé</button>
                </div>
                <div className="menu-buttons">
                    <button className="secondary" onClick={() => navigate('/orders')}>Commandes</button>
                    <button className="secondary" onClick={() => navigate('/products')}>Mes produits</button>
                    <button className="secondary" onClick={() => navigate('/restaurant-info')}>Informations restaurant</button>
                    <button className="tertiary" onClick={handleLogout}>Se déconnecter</button>
                </div>
            </div>
            <footer>
                <nav>
                    <a href="https://www.cesi.fr">A propos de nous</a>
                    <a href="#">Aide et Support</a>
                    <a href="#">Mentions légales</a>
                </nav>
            </footer>
        </div>
    );
};

export default HomePage;
