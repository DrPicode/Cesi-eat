import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';  // Assume you have a CSS file for styling

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/home');
    }

    return (
        <div className="login-page">
            <h1>CESI Eats</h1>
            <form>
                <input type="email" placeholder="Adresse e-mail" required />
                <input type="password" placeholder="Mot de passe" required />
                <button type="button" onClick={handleLogin}>Connexion</button>
            </form>
            <button type="button" onClick={() => navigate('/register')}>Créer un compte</button>
        </div>
    );
}

export default LoginPage;
