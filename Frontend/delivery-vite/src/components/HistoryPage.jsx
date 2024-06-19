import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { authProxy } from "../proxy/auth.proxy.js";
import './HistoryPage.css';

function HistoryPage() {

    const id = authProxy.userId;
    const navigate = useNavigate();
    const [DeliveryTime, setDeliveryTime] = useState(null);
    const [DeliveryFees, setDeliveryFees] = useState(null);
    const [DeliveryCode, setDeliveryCode] = useState(null);


    useEffect(() => {
        if (!id) {
            console.error("User ID is undefined");
            return;
        }
        console.log("Fetch user with id ")
        const fetchUserData = async () => {
            try {
                const headers = new Headers();
                headers.set("Authorization", `Bearer ${authProxy.token}`)
                const response = await fetch(`/api/orders/user/${id}`, {headers}).then(async (response) => {
                    if (response.ok){
                        const data = await response.json()
                        setDeliveryTime(data.delivery_hour)
                        setDeliveryFees(data.delivery_fees)
                        setDeliveryCode(data.delivery_code)
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
    }, [id]);

    return (
        <div className="main-container">
            <header onClick={() => navigate('/home')}>
                <h1>CESI Eats</h1>
                <h3>Livreur</h3>
            </header>
            <div className="home-page">
                <h2>Historique</h2>
                <div className="delivery-container">
                    <div className="header-row">
                        <span className="restaurant-name">McDonald’s Saint Médard</span>
                        <span className="order-price"><strong className='earnings-amount'>+ 2,00 €</strong></span>
                    </div>
                    <div className="delivery-info">
                        <strong>Livrer à:</strong>
                        <div>CESI, 264 Boulevard Godard 33300, Bordeaux</div>
                    </div>
                    <div className="bottom-row">
                        <div className="order-number">
                            <span>Numéro </span><span><strong>123456789</strong></span>
                        </div>
                        <span className="order-time">19h00</span>
                    </div>
                </div>
                {/* Duplicate the delivery container below */}
                <div className="delivery-container">
                    <div className="header-row">
                        <span className="restaurant-name">McDonald’s Saint Médard</span>
                        <span className="order-price"><strong className='earnings-amount'>+ 2,00 €</strong></span>
                    </div>
                    <div className="delivery-info">
                        <strong>Livrer à:</strong>
                        <div>CESI, 264 Boulevard Godard 33300, Bordeaux</div>
                    </div>
                    <div className="bottom-row">
                        <div className="order-number">
                            <span>Numéro </span><span><strong>123456789</strong></span>
                        </div>
                        <span className="order-time">19h00</span>
                    </div>
                </div>
                {/* Third delivery container added below */}
                <div className="delivery-container">
                    <div className="header-row">
                        <span className="restaurant-name">McDonald’s Saint Médard</span>
                        <span className="order-price"><strong className='earnings-amount'>+ 2,00 €</strong></span>
                    </div>
                    <div className="delivery-info">
                        <strong>Livrer à:</strong>
                        <div>CESI, 264 Boulevard Godard 33300, Bordeaux</div>
                    </div>
                    <div className="bottom-row">
                        <div className="order-number">
                            <span>Numéro </span><span><strong>123456789</strong></span>
                        </div>
                        <span className="order-time">19h00</span>
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
}

export default HistoryPage;
