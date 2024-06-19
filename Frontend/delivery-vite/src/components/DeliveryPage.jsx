import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { authProxy } from "../proxy/auth.proxy.js";
import './DeliveryPage.css';

const DeliveryPage = () => {
    const navigate = useNavigate();
    const [restaurantNames, setRestaurantNames] = useState({});
    const [deliveries, setDeliveries] = useState([]);

    const goToDeliveryPage = () => {
        navigate('/delivery1');
    };

    function formatTime(isoDate) {
        const date = new Date(isoDate);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      }

      const fetchRestaurantName = async (restaurantId) => {
        try {
            const headers = new Headers();
            headers.set("Authorization", `Bearer ${authProxy.token}`);
            const response = await fetch(`/api/restaurants/${restaurantId}`, { headers });
            if (response.ok) {
                const data = await response.json();
                return data.name;
            } else {
                console.error('Failed to fetch restaurant name:', response);
                return 'Unknown Restaurant';
            }
        } catch (e) {
            console.error(e);
            return 'Unknown Restaurant';
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const headers = new Headers();
                headers.set("Authorization", `Bearer ${authProxy.token}`)
                const response = await fetch(`/api/orders/done`, {headers}).then(async (response) => {
                    if (response.ok){
                        const data = await response.json()
                        setDeliveries(data)
                        console.log(data)

                        const restaurantNamesMap = {};
                        for (const delivery of data) {
                            if (!restaurantNamesMap[delivery.address.restaurant_id_restaurant]) {
                                const restaurantName = await fetchRestaurantName(delivery.address.restaurant_id_restaurant);
                                restaurantNamesMap[delivery.address.restaurant_id_restaurant] = restaurantName;
                            }
                        }
                        setRestaurantNames(restaurantNamesMap);
                    } else {
                        console.log(response)
                        alert("Not Authorized");
                        navigate("/login")
                    }
                });
            } catch (e) {
                console.error(e)
            }
        }
        fetchUserData();
    },[]);

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
                            <span className="restaurant-name">{restaurantNames[delivery.address.restaurant_id_restaurant] || 'Loading...'}</span>
                            <span className="order-price">{delivery.price} €</span>
                        </div>
                        <div className="delivery-info">
                            <strong>Livrer à:</strong>
                            <div>{delivery.address.address}</div>
                            <div>Cette course vous rapporte: <strong className='earnings-amount'>{delivery.service_fees} €</strong></div>
                        </div>
                        <div className="bottom-row">
                            <div className="order-number">
                                <span>Numéro </span><span><strong>{delivery.id_order}</strong></span>
                            </div>
                             <span key={index} className="order-time">{formatTime(delivery.delivery_hour)}</span>
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
