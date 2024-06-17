import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Delivery2.css';

const Delivery1 = () => {
    const delivery = {
        id: 123456789,
        destination: "CESI, 264 Boulevard Godard 33300, Bordeaux",
        earnings: "2,00 €",
        price: "8,90 €",
        location: "Av. Descartes Centre Leclerc, 33160 Saint-Médard-en-Jalles"
    };

    const [code, setCode] = useState(['', '', '', '']);

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

    const handleCodeChange = (index, value) => {
        if (/^[0-9]$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            if (index < 3) {
                document.getElementById(`code-input-${index + 1}`).focus();
            }
        }
    };

    const handleConfirmCode = () => {
        if (code.join('').length === 4) {
            alert('Code confirmé!');
            // Handle code confirmation logic here
        } else {
            alert('Veuillez entrer un code valide');
        }
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
                {/* Empty container kept for future use */}
                
                {/* New container for code input */}
                <div className="delivery-container code-container">
                    <div className="pickup-info">
                        <strong>Commande à retirer à:</strong>
                        <div>{delivery.location}</div>
                    </div>
                    <div className="code-input-section">
                        <p>Veuillez entrer le code fourni par le client à la livraison</p>
                        <div className="code-inputs">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`code-input-${index}`}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleCodeChange(index, e.target.value)}
                                />
                            ))}
                        </div>
                        <button className="deliver-btn" onClick={handleConfirmCode}>Confirmer la livraison</button>
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
