import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OrdersPage.css';
import { authProxyRestaurant } from "../proxy/auth.proxy.js";

const OrdersPage = () => {

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrders = useCallback(async () => {
        try {
            setIsLoading(true);
            if (authProxyRestaurant.userId) {
                const headers = new Headers();
                const response = await fetch(`/api/restaurants/user/${authProxyRestaurant.userId}`, {
                    method: 'GET',
                    headers,
                });

                if (response.ok) {
                    const restaurant = await response.json();
                    const restaurantId = restaurant.id_restaurant;

                    const ordersResponse = await fetch(`/api/restaurants/orders/${restaurantId}`, {
                        method: 'GET',
                        headers,
                    });

                    if (ordersResponse.ok) {
                        const data = await ordersResponse.json();
                        setOrders(data);
                    } else {
                        setError('Erreur lors de la récupération des commandes');
                    }
                } else {
                    setError('Non autorisé');
                    navigate('/');
                }
            }
        } catch (e) {
            console.error(e);
            setError('Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    }, [authProxyRestaurant.userId, navigate]);

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(() => {
            fetchOrders();
        }, 15000);

        return () => clearInterval(interval);
    }, [fetchOrders]);

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleAccept = async (orderId) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`/api/restaurants/orders/${orderId}/accept`, null, {
                headers: {
                    'Authorization': `Bearer ${authProxyRestaurant.token}`
                }
            });
            if (response.data.success) {
                fetchOrders();
            } else {
                alert('Erreur lors de l\'acceptation de la commande');
            }
        } catch (error) {
            console.error('Erreur lors de l\'acceptation de la commande:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
            setIsLoading(false);
        }
    };

    const handleReject = async (orderId) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`/api/restaurants/orders/${orderId}/reject`, null, {
                headers: {
                    'Authorization': `Bearer ${authProxyRestaurant.token}`
                }
            });
            if (response.data.success) {
                fetchOrders();
            } else {
                alert('Erreur lors du refus de la commande');
            }
        } catch (error) {
            console.error('Erreur lors du refus de la commande:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
            setIsLoading(false);
        }
    };

    const handleReady = async (orderId) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`/api/restaurants/orders/${orderId}/ready`, null, {
                headers: {
                    'Authorization': `Bearer ${authProxyRestaurant.token}`
                }
            });
            if (response.data.success) {
                fetchOrders();
            } else {
                alert('Erreur lors du refus de la commande');
            }
        } catch (error) {
            console.error('Erreur lors du refus de la commande:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
            setIsLoading(false);
        }
    };

    const handleHomeClick = () => {
        navigate('/home');
    }

    return (
        <div className="main-container">
            <header className="header">
                <div className="header-left" onClick={handleHomeClick}>
                    <h1>CESI Eats</h1>
                    <h3>Restaurateur</h3>
                </div>
            </header>
            <div className="orders-page">
                <h2>Commandes</h2>
                <div className="orders-container">
                    {orders.map(order => (
                        <div key={order.id_order} className="order">
                            <p><strong>N° {order.id_order}</strong></p>
                            <p>{order.cart?.articles.map(a => a.article.name).join(', ')}</p>
                            <p>{order.price}</p>
                            <p>{order.delivery_hour}</p>
                            <div className="order-buttons">
                                {order.status === "Paid" && (<>
                                    <button className="secondary" onClick={() => handleReject(order.id_order)}>Refuser</button>
                                    <button className="primary" onClick={() => handleAccept(order.id_order)}>Accepter</button>
                                </>)}
                                {order.status === "Cancelled" && <p>Commande annulée</p>}
                                {order.status === "Preparing" && <button className="primary" onClick={() => handleReady(order.id_order)}>Commande prête</button>}
                                {order.status === "Done" && <p>Commande en attente d'un livreur</p>}
                                {order.status === "Delivering" && <p>Commande en cours de livraison</p>}
                                {order.status === "Delivered" && <p>Commande livrée</p>}
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

export default OrdersPage
