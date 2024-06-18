import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { authProxyDelivery } from "../proxy/auth.proxy.js";

const HomePage = () => {
    const navigate = useNavigate();

    const disconnect = () => {
        try {
            const headers = new Headers();
            headers.set("Authorization", `Bearer ${authProxyDelivery.token}`)
            fetch(`/api/auth/logout`, {
                method: "GET",
                headers
            }).then(async (response) => {
                if (response.ok){
                    authProxyDelivery.token = null;
                    navigate("/")
                } else {
                    alert("Not Authorized");
                    navigate("/login")
                }
            });
        } catch (e) {
            console.error(e)
        }
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
                    <button className="tertiary" onClick={disconnect}>Se déconnecter</button>
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
