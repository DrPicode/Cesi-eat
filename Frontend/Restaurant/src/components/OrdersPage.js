import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OrdersPage.css';

const OrdersPage = () => {
    const orders = [
        {
            id: 123456789,
            items: "1 Menu Mc Fist (Poulet, Frite, Coca)\n1 Menu Best Of (CBO, Fanta, Potatoes)",
            price: "6,90 €"
        },
        {
            id: 123456790,
            items: "1 Menu Mc Fist (Poulet, Frite, Coca)\n1 Menu Best Of (CBO, Fanta, Potatoes)",
            price: "6,90 €"
        },
        {
            id: 123456791,
            items: "1 Menu Mc Fist (Poulet, Frite, Coca)\n1 Menu Best Of (CBO, Fanta, Potatoes)",
            price: "6,90 €"
        }
    ];

    const navigate = useNavigate();

    const handleAccept = async (orderId) => {
        try {
            // Remplacer l'URL par celle de votre API backend
            const response = await axios.post(`/api/orders/${orderId}/accept`);
            if (response.data.success) {
                alert('Commande acceptée avec succès');
                // Actualiser les commandes ou mettre à jour l'état si nécessaire
            } else {
                alert('Erreur lors de l\'acceptation de la commande');
            }
        } catch (error) {
            console.error('Erreur lors de l\'acceptation de la commande:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    };

    const handleReject = async (orderId) => {
        try {
            // Remplacer l'URL par celle de votre API backend
            const response = await axios.post(`/api/orders/${orderId}/reject`);
            if (response.data.success) {
                alert('Commande refusée avec succès');
                // Actualiser les commandes ou mettre à jour l'état si nécessaire
            } else {
                alert('Erreur lors du refus de la commande');
            }
        } catch (error) {
            console.error('Erreur lors du refus de la commande:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    };

    return (
        <div className="wrapper">
            <header onClick={() => navigate('/home')}>
                <h1>CESI Eats</h1>
                <h3>Restaurateur</h3>
            </header>
            <div className="orders-page">
                <h2>Commandes</h2>
                <div className="orders-container">
                    {orders.map(order => (
                        <div key={order.id} className="order">
                            <p><strong>N° {order.id}</strong></p>
                            <p>{order.items}</p>
                            <p>{order.price}</p>
                            <div className="order-buttons">
                                <button className="secondary" onClick={() => handleReject(order.id)}>Refuser</button>
                                <button className="primary" onClick={() => handleAccept(order.id)}>Accepter</button>
                            </div>
                        </div>
                    ))}
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

export default OrdersPage;
