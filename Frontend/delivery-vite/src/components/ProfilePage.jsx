import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { authProxyDelivery } from "../proxy/auth.proxy.js";
import './ProfilePage.css';

const ProfilePage = () => {

    const id = authProxyDelivery.userId;
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);


    useEffect(() => {
        if (!id) {
            console.error("User ID is undefined");
            return;
        }
        console.log("Fetch user with id ")
        const fetchUserData = async () => {
            try {
                const headers = new Headers();
                headers.set("Authorization", `Bearer ${authProxyDelivery.token}`)
                const response = await fetch(`/api/users/${id}`, {headers}).then(async (response) => {
                    if (response.ok){
                        const data = await response.json()
                        setUser(data.firstName + " " + data.lastName)
                        setEmail(data.email)
                        setPhone(data.phone)
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

    const disconnect = () => {
        try {
            const headers = new Headers();
            headers.set("Authorization", `Bearer ${authProxyDelivery.token}`)
            fetch(`/api/auth/logout`, {
                method: "GET",
                headers
            }).then(async (response) => {
                if (response.ok){
                    authProxyDelivery.token = null;
                    navigate("/")
                } else {
                    alert("Not Authorized");
                    navigate("/")
                }
            });
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <div className="main-container">
            <header>
                <h1>CESI Eats</h1>
                <h3>Livreur</h3>
            </header>
            <div className="info-page">
                <h2>Mon profil</h2>
                <div className="info-box">
                    <p><strong>Nom et prénom :</strong><br />{user}</p>
                    <p><strong>Adresse e-mail :</strong><br />{email}</p>
                    <p><strong>Numéro de téléphone :</strong><br />{phone}</p>
                    <p><strong>Mot de passe :</strong><br />*******</p>
                </div>
                <button className="primary" onClick={() => navigate('/modify')}>Modifier les informations</button>
                <button className="secondary" onClick={disconnect}>Déconnexion</button>
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

export default ProfilePage;