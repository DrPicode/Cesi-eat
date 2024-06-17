import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Delivery1.css';

const Delivery1 = () => {
    const delivery = {
        id: 123456789,
        destination: "CESI, 264 Boulevard Godard 33300, Bordeaux",
        earnings: "2,00 €",
        price: "8,90 €",
        location: "Av. Descartes Centre Leclerc, 33160 Saint-Médard-en-Jalles"
    };

    const navigate = useNavigate();

    const handleDeliver = async () => {
        try {
            const response = await axios.post(`/api/deliveries/${delivery.id}/deliver`);
            if (response.data.success) {
                alert('Livraison effectuée avec succès');
                navigate('/delivery1');
            } else {
                alert('Erreur lors de la livraison');
            }
        } catch (error) {
            console.error('Erreur lors de la livraison:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    };

    const handleConfirmOrder = () => {
        alert('Commande confirmée !');
        navigate('/delivery2');  // Redirection vers la page delivery2
    };

    return (
        <div className="main-container">
            <header onClick={() => navigate('/home')}>
                <h1>CESI Eats</h1>
                <h3>Livreur</h3>
            </header>
            <div className="home-page">
                <h2>Livrer une commande</h2>
                <div className="delivery-container">
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
                        <button className="deliver-btn" onClick={handleDeliver}>Livrer</button>
                    </div>
                </div>
                <div className="delivery-container status-container">
                    <div className="status-info">
                        <p>Vous venez de prendre en charge la commande numéro <strong>{delivery.id}</strong></p>
                    </div>
                    <div className="status-lines">
                        <div className="status-line preparation"></div>
                        <div className="status-line ready"></div>
                    </div>
                    <div className="pickup-info">
                        <strong>Commande à retirer à:</strong>
                        <div>{delivery.location}</div>
                        <button className="deliver-btn" onClick={handleConfirmOrder}>J'ai bien la commande !</button>
                    </div>
                </div>
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

export default Delivery1;
