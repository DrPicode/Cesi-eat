import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { authProxyRestaurant } from "../proxy/auth.proxy.js";
import './RestaurantInfoPage.css';

const ProfilePage = () => {

    const id = authProxyRestaurant.userId;
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
                headers.set("Authorization", `Bearer ${authProxyRestaurant.token}`)
                const response = await fetch(`/api/users/${id}`, {headers}).then(async (response) => {
                    if (response.ok){
                        const data = await response.json()
                        setUser(data.firstName + " " + data.lastName)
                        setEmail(data.email)
                        setPhone(data.phone)
                    } else {
                        console.log(response)
                        alert("Not Authorized");
                        navigate("/")
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
            headers.set("Authorization", `Bearer ${authProxyRestaurant.token}`)
            fetch(`/api/auth/logout`, {
                method: "GET",
                headers
            }).then(async (response) => {
                if (response.ok){
                    authProxyRestaurant.token = null;
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

    const handleHomeClick = () => {
        navigate('/home');
    }

    return (
        <div className="main-container">
            <header className="header">
                <div className="header-left" onClick={handleHomeClick}>
                    <h1>CESI Eats</h1>
                    <h3>Restaurateur</h3>
                </div>
            </header>
            <div className="info-page">
                <h2>Mon profil</h2>
                <div className="info-box">
                    <p><strong>Nom et prénom :</strong><br />{user}</p>
                    <p><strong>Adresse e-mail :</strong><br />{email}</p>
                    <p><strong>Numéro de téléphone :</strong><br />{phone}</p>
                    <p><strong>Mot de passe :</strong><br />*******</p>
                </div>
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