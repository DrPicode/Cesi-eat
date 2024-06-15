import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import {authProxy} from "../proxy/auth.proxy.js";
import {useSnapshot} from "valtio";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const authSnap = useSnapshot(authProxy);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const validateForm = () => {
        if (!email.trim()) {
            setError("Veuillez entrer une adresse e-mail.");
            return false;
        }
        if (!password.trim()) {
            setError("Veuillez entrer un mot de passe.");
            return false;
        }
        return true;
    }

    const submit = async () => {
        if (validateForm()) {
            try {
                const response = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                });

                if (response.ok) {
                    const body = await response.json();
                    console.log({body});
                    authProxy.token = body.accessToken;
                    authProxy.userId = body.userId;
                    navigate(`/`);
                } else {
                    // Afficher le message d'erreur sur la page
                    const errorMessage = await response.text();
                    setError(`Erreur lors de la connexion : ${errorMessage}`);
                }
            } catch (error) {
                console.error(error);
                setError('Une erreur est survenue lors de la connexion.');
            }
        }
    }

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
                        onChange={handleEmailChange}
                        required
                    />
                    <div>
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <div
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button className="primary" type="submit">Connexion</button>
                    </div>
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
