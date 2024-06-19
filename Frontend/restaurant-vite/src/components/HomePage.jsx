import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { authProxyRestaurant } from "../proxy/auth.proxy.js";

const HomePage = () => {
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authProxyRestaurant.userId) {
            try {
                const headers = new Headers();
                fetch(`/api/restaurants/user/${authProxyRestaurant.userId}`, {
                    method: "GET",
                    headers
                }).then(async (response) => {
                    if (response.ok) {
                        const data = await response.json();
                        setRestaurant(data);
                    } else {
                        alert("Not Authorized");
                        navigate("/")
                    }
                }).finally(() => {
                    setLoading(false);
                });
            } catch (e) {
                console.error(e)
            }
        }
    }, [authProxyRestaurant.userId]);

    const disconnect = () => {
        try {
            const headers = new Headers();
            headers.set("Authorization", `Bearer ${authProxyRestaurant.token}`)
            fetch(`/api/auth/logout`, {
                method: "GET",
                headers
            }).then(async (response) => {
                if (response.ok) {
                    authProxyRestaurant.token = null;
                    sessionStorage.removeItem("User");
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

    const openRestaurant = () => {
        try {
            const headers = new Headers();
            headers.set("Authorization", `Bearer ${authProxyRestaurant.token}`)
            fetch(`/api/restaurants/name/${restaurant.name}`, {
                method: "GET",
                headers
            }).then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    try {
                        const headers = new Headers();
                        headers.set("Authorization", `Bearer ${authProxyRestaurant.token}`)
                        fetch(`/api/restaurants/${data.id_restaurant}/open`, {
                            method: "POST",
                            headers
                        }).then(async (response) => {
                            if (response.ok) {
                                setRestaurant({ ...restaurant, isOpen: true });
                            } else {
                                alert("Not Authorized");
                                navigate("/")
                            }
                        });
                    } catch (e) {
                        console.error(e)
                    }
                } else {
                    alert("Not Authorized");
                    navigate("/")
                }
            });
        } catch (e) {
            console.error(e)
        }
    };

    const closeRestaurant = () => {
        try {
            const headers = new Headers();
            headers.set("Authorization", `Bearer ${authProxyRestaurant.token}`)
            fetch(`/api/restaurants/name/${restaurant.name}`, {
                method: "GET",
                headers
            }).then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    try {
                        const headers = new Headers();
                        headers.set("Authorization", `Bearer ${authProxyRestaurant.token}`)
                        fetch(`/api/restaurants/${data.id_restaurant}/close`, {
                            method: "POST",
                            headers
                        }).then(async (response) => {
                            if (response.ok) {
                                setRestaurant({ ...restaurant, isOpen: false });
                            } else {
                                alert("Not Authorized");
                                navigate("/")
                            }
                        });
                    } catch (e) {
                        console.error(e)
                    }
                } else {
                    alert("Not Authorized");
                    navigate("/")
                }
            });
        } catch (e) {
            console.error(e)
        }
    }

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
            <div className="home-page">
                {loading ? <p>Loading...</p> : <>
                    <h2>{restaurant.name}</h2>
                    <div className="status-buttons">
                        <button
                            className={restaurant.isOpen ? "primary" : "secondary"}
                            onClick={openRestaurant}
                        >
                            Ouvert
                        </button>
                        <button
                            className={!restaurant.isOpen ? "primary" : "secondary"}
                            onClick={closeRestaurant}
                        >
                            Fermé
                        </button>
                    </div>
                    <div className="menu-buttons">
                        <button className="secondary" onClick={() => navigate('/orders')}>Commandes</button>
                        <button className="secondary" onClick={() => navigate('/products')}>Mes produits</button>
                        <button className="secondary" onClick={() => navigate('/restaurant-info')}>Informations
                            restaurant
                        </button>
                        <button className="tertiary" onClick={disconnect}>Se déconnecter</button>
                    </div>
                </>
                }
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
}

export default HomePage;