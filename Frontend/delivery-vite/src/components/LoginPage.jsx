import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { authProxyDelivery } from "../proxy/auth.proxy.js";
import { useSnapshot } from "valtio";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const authSnap = useSnapshot(authProxyDelivery);

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

    const submit = async (e) => {
        e.preventDefault();
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
                    console.log({ body });
                    authProxyDelivery.token = body.accessToken;
                    authProxyDelivery.userId = body.userId;
                    sessionStorage.setItem("User", JSON.stringify(body));
                    if (body.userRole !== "DeliveryMan") {
                        navigate("/unauthorized");
                    }
                    else {
                        console.log("Navigate to /home")
                        navigate("/home");
                    }
                } else {
                    // Afficher le message d'erreur sur la page
                    const errorMessage = await response.text();
                    setError(`Erreur lors de la connexion : ${errorMessage}`);
                }
            } catch (error) {
                console.error(error);
                setError(`Une erreur est survenue lors de la connexion. ${error}`);
            }
        }
    }

    return (
        <div className="main-container">
            <header>
                <h1>CESI Eats</h1>
                <h3>Livreur</h3>
            </header>
            <div className="login-page">
                <form onSubmit={submit}>
                    <input
                        type="email"
                        placeholder="Adresse e-mail"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button className="primary" type="submit">Connexion</button>
                    <button className="secondary" type="button" onClick={() => navigate('/register')}>Créer un compte</button>
                </form>
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
