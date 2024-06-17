import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Veuillez entrer une adresse e-mail valide.');
            return;
        }

        if (password.length < 6) {
            setError('Le mot de passe doit comporter au moins 6 caractères.');
            return;
        }

        // Simuler une vérification d'authentification
        if (email === 'test@cesi.fr' && password === 'password') {
            navigate('/home');
        } else {
            setError('Adresse e-mail ou mot de passe incorrect.');
        }

        // Préparer l'intégration avec le backend
        // try {
        //     const response = await axios.post('/api/login', { email, password });
        //     if (response.data.success) {
        //         navigate('/home');
        //     } else {
        //         setError('Adresse e-mail ou mot de passe incorrect.');
        //     }
        // } catch (error) {
        //     console.error('Erreur lors de la tentative de connexion:', error);
        //     setError('Une erreur est survenue. Veuillez réessayer.');
        // }
    };

    return (
        <div className="main-container">
            <header>
                <h1>CESI Eats</h1>
                <h3>Restaurateur</h3>
            </header>
            <div className="login-page">
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Adresse e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button className="primary" type="submit">Connexion</button>
                </form>
                <br />
                <div className='register'>
                    <button className="secondary" type="button" onClick={() => navigate('/register')}>Créer un compte</button>
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

export default LoginPage;
