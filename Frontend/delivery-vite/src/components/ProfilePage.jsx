import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
    const navigate = useNavigate();

    const restaurant = {
        name: "John Doe",
        email: "john.doe@e-mail.com",
        phone: "+33 123 45 67 89",
        password: "********"
    };

    return (
        <div className="main-container">
            <header>
                <h1>CESI Eats</h1>
                <h3>Livreur</h3>
            </header>
            <div className="info-page">
                <h2>Mon profil</h2>
                <div className="info-box">
                    <p><strong>Nom et prénom :</strong><br />{restaurant.name}</p>
                    <p><strong>Adresse e-mail :</strong><br />{restaurant.email}</p>
                    <p><strong>Numéro de téléphone :</strong><br />{restaurant.phone}</p>
                    <p><strong>Mot de passe :</strong><br />{restaurant.password}</p>
                </div>
                <button className="primary" onClick={() => navigate('/modify')}>Modifier les informations</button>
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

export default ProfilePage;
