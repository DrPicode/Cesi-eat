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
                <h3>Livreur</h3>
            </header>
            <div className="home-page">
                <h2>Bienvenue John Doe !</h2>
                <div className="menu-buttons">
                    <button className="secondary" onClick={() => navigate('/delivery')}>Livrer une commande</button>
                    <button className="secondary" onClick={() => navigate('/history')}>Mes livraisons</button>
                    <button className="secondary" onClick={() => navigate('/profile')}>Mon profil</button>
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
