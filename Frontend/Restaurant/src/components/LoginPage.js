import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/home');
    };

    return (
        <div className="main-container">
            <header>
                <h1>CESI Eats</h1>
                <h3>Restaurateur</h3>
            </header>
            <div className="login-page">
                <form>
                    <input type="email" placeholder="Adresse e-mail" required />
                    <input type="password" placeholder="Mot de passe" required />
                    <button className="primary" type="button" onClick={handleLogin}>Connexion</button>
                </form><br></br>
                <div className='register'><button className="secondary" type="button" onClick={() => navigate('/register')}>Créer un compte</button></div>
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

export default LoginPage;
