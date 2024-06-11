import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RestaurantInfoPage.css';

const RestaurantInfoPage = () => {
    const navigate = useNavigate();

    const restaurant = {
        name: "McDonald's Saint Médard en Jalles",
        category: "Fast food",
        address: "Av. Descartes Centre Leclerc, 33160 Saint-Médard-en-Jalles",
        email: "john.doe@e-mail.com",
        phone: "+33 123 45 67 89",
        password: "********"
    };

    return (
        <div className="main-container">
            <header>
                <h1>CESI Eats</h1>
                <h3>Restaurateur</h3>
            </header>
            <div className="info-page">
                <h2>Informations Restaurant</h2>
                <div className="info-box">
                    <p><strong>Nom du restaurant :</strong><br />{restaurant.name}</p>
                    <p><strong>Catégorie :</strong><br />{restaurant.category}</p>
                    <p><strong>Adresse :</strong><br />{restaurant.address}</p>
                    <p><strong>Adresse e-mail :</strong><br />{restaurant.email}</p>
                    <p><strong>Numéro de téléphone :</strong><br />{restaurant.phone}</p>
                    <p><strong>Mot de passe :</strong><br />{restaurant.password}</p>
                </div>
                <button className="primary" onClick={() => navigate('/home')}>Retour</button>
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

export default RestaurantInfoPage;
