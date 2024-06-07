// JSX
import React from 'react';
import { useNavigate } from 'react-router-dom';
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

    const handleLogin = () => {
        navigate('/home');
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
                                <button className="secondary">Refuser</button>
                                <button className="primary">Accepter</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <footer>
                <nav>
                    <a href="#">A propos de nous</a>
                    <a href="#">Aide et Support</a>
                    <a href="#">Mentions légales</a>
                </nav>
            </footer>
        </div>
    );
};

export default OrdersPage;
