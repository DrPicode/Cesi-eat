import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DeliveryPage.css';

const DeliveryPage = () => {
    const navigate = useNavigate();

    // Liste des livraisons disponibles
    const deliveries = [
        {
            id: 123456789,
            destination: "CESI, 264 Boulevard Godard 33300, Bordeaux",
            earnings: "2,00 €",
            price: "8,90 €"
        },
        {
            id: 123456790,
            destination: "CESI, 264 Boulevard Godard 33300, Bordeaux",
            earnings: "2,00 €",
            price: "8,90 €"
        },
        {
            id: 123456791,
            destination: "CESI, 264 Boulevard Godard 33300, Bordeaux",
            earnings: "2,00 €",
            price: "8,90 €"
        }
    ];

    // Simplification de la fonction pour naviguer directement
    const goToDeliveryPage = () => {
        navigate('/delivery1');
    };

    return (
        <div className="main-container">
            <header onClick={() => navigate('/home')}>
                <h1>CESI Eats</h1>
                <h3>Livreur</h3>
            </header>
            <div className="home-page">
                <h2>Livrer une commande</h2>
                {deliveries.map((delivery, index) => (
                    <div key={index} className="delivery-container">
                        <div className="header-row">
                            <span className="restaurant-name">McDonald’s Saint Médard</span>
                            <span className="order-price">{delivery.price}</span>
                        </div>
                        <div className="delivery-info">
                            <strong>Livrer à:</strong>
                            <div>{delivery.destination}</div>
                            <div>Cette course vous rapporte: <strong className='earnings-amount'>{delivery.earnings}</strong></div>
                        </div>
                        <div className="bottom-row">
                            <div className="order-number">
                                <span>Numéro </span><span><strong>{delivery.id}</strong></span>
                            </div>
                            <span className="order-time">19h00</span>
                            <button className="deliver-btn" onClick={goToDeliveryPage}>Livrer</button>
                        </div>
                    </div>
                ))}
            </div>
            <footer>
                <nav>
                    <a href="https://www.cesi.fr">À propos de nous</a>
                    <a href="#">Aide et Support</a>
                    <a href="#">Mentions légales</a>
                </nav>
            </footer>
        </div>
    );
};

export default DeliveryPage;
