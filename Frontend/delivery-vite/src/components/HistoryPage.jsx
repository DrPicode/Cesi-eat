import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryPage.css';

function HistoryPage() {
    const navigate = useNavigate();

    return (
        <div className="main-container">
            {/* Corrected header structure */}
            <header onClick={() => navigate('/home')}>
                <h1>CESI Eats</h1>
                <h3>Livreur</h3>
            </header>
            <div className="home-page">
                <h2>Liver une commande</h2>
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
