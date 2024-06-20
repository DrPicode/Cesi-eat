import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeliveryPage.css';
import moment from 'moment';
import {authProxyDelivery} from "../proxy/auth.proxy.js";

const DeliveryPage = () => {
    const navigate = useNavigate();

    const [deliveries, setDeliveries] = useState([]);
    const [restaurant, setRestaurant] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getDeliveries = useCallback(() => {
        setIsLoading(true);
        fetch('/api/deliveries/deliveries')
            .then(response => response.json())
            .then(data => {
                setDeliveries(data.deliveries);
                setRestaurant(data.restaurant);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleDelivering = useCallback((delivery) => {
        setIsLoading(true);
        fetch('/api/deliveries/deliveries/' + delivery.id_order + '/delivering', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authProxyDelivery.token}`
            },
        })
            .then(response => response.json())
            .then(data => {
                getDeliveries();
            }).catch(() => {
                alert('Erreur lors du changement de statut')
                setIsLoading(false);
            });
    }, []);

    const handleDelivered = useCallback((delivery) => {
        setIsLoading(true);
        fetch('/api/deliveries/deliveries/' + delivery.id_order + '/delivered', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authProxyDelivery.token}`
            },
            body: JSON.stringify({
                code: delivery.code
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success == true) {
                    getDeliveries();
                } else if (data.message === 'Code is incorrect') {
                    alert('Code invalide');
                    setIsLoading(false);
                }
            }).catch((e) => {
                alert('Erreur lors du changement de statut');
                setIsLoading(false);
            });
    }, []);

    useEffect(() => getDeliveries(), []);

    useEffect(() => {
        let timer = setInterval(() => {
            getDeliveries()
        }, 15000);
        return () => {
            clearInterval(timer);
        }
    }, [getDeliveries]);

    return (
        <div className="main-container">
            <header onClick={() => navigate('/home')}>
                <h1>CESI Eats</h1>
                <h3>Livreur</h3>
            </header>
            <div className="home-page">
                <h2>Livrer une commande</h2>
                {isLoading ? (
                    <p>Chargement des données...</p>
                ) : (
                    deliveries.map((delivery) => (
                        <div key={delivery.id_order} className="delivery-container">
                            <div className="header-row">
                                <span className="restaurant-name">{restaurant.name}</span>
                                <span className="order-price">{delivery.price} €</span>
                            </div>
                            <div className="delivery-info">
                                <strong>Livrer à:</strong>
                                <div>{delivery.address.address}<br />{delivery.address.postalCode} {delivery.address.city}</div>
                                <div>Cette course vous rapporte: <strong className='earnings-amount'>{delivery.delivery_fees} €</strong></div>
                            </div>
                            <div className="bottom-row">
                                <div className="order-number">
                                    <span>Numéro </span><span><strong>{delivery.id_order}</strong></span>
                                </div>
                                <span className="order-time">{moment(delivery.delivery_hour).format('DD/MM/YYYY à HH:mm')}</span>
                            </div>
                            <div className="bottom-row">
                                {delivery.status === 'Done' && <button className="deliver-btn" onClick={() => handleDelivering(delivery)}>Prendre en livraison</button>}
                                {delivery.status === 'Delivering' && (<>
                                    <input placeholder="Code de livraison" value={delivery.code} onChange={(e => setDeliveries((prev) => {
                                        const newDeliveries = [...prev];
                                        const index = newDeliveries.findIndex((del) => del.id_order === delivery.id_order);
                                        newDeliveries[index].code = e.target.value;
                                        return newDeliveries;
                                    }))}
                                    />
                                    <button className="deliver-btn" onClick={() => handleDelivered(delivery)}>Confirmer</button>
                                </>)}
                                {delivery.status === 'Delivered' && <p>Commande livrée</p>}
                            </div>
                        </div>
                    ))
                )}
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
