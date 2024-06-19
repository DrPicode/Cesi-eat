import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductsPage.css';
import { authProxyRestaurant } from "../proxy/auth.proxy.js";

const ProductsPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
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

                        // Fonction pour récupérer les produits
                        const getProducts = async () => {
                            try {
                                const headers = new Headers();
                                headers.set("Authorization", `Bearer ${authProxyRestaurant.token}`)
                                const restaurantResponse = await fetch(`/api/restaurants/name/${data.name}`, {
                                    method: "GET",
                                    headers
                                });

                                if (restaurantResponse.ok) {
                                    const restaurantData = await restaurantResponse.json();
                                    const productsResponse = await fetch(`/api/articles/restaurant/${restaurantData.id_restaurant}`, {
                                        method: "GET",
                                        headers
                                    });

                                    if (productsResponse.ok) {
                                        const productsData = await productsResponse.json();
                                        setProducts(productsData);
                                        console.log(productsData);
                                    }
                                } else {
                                    alert("Not Authorized");
                                    navigate("/");
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        };

                        // Appel de la fonction pour récupérer les produits
                        await getProducts();
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

    const handleAddProduct = () => {
        navigate('/add-product');
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const headers = new Headers();
            headers.set("Authorization", `Bearer ${authProxyRestaurant.token}`);
            const response = await fetch(`/api/articles/delete/${productId}`, {
                method: "POST",
                headers,
            });

            if (response.ok) {
                const updatedProducts = products.filter(
                    (product) => product.id_article !== productId
                );
                setProducts(updatedProducts);
            } else {
                console.error("Erreur lors de la suppression du produit");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du produit:", error);
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
            <div className="products-page">
                <h2>Mes Produits</h2>
                <button className="primary" onClick={handleAddProduct}>Ajouter un produit</button>
                <div className="products-list">
                    {products.map(product => (
                        <div className="product-item" key={product.id_article}>
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p>{product.type}</p>
                                <img src={product.thumbnail} alt={product.name}/>
                            </div>
                            <div className="product-actions">
                                <span>{product.price}€</span>
                                <button className="secondary" onClick={() => handleDeleteProduct(product.id_article)}>Delete</button>
                            </div>
                        </div>
                    ))}
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

export default ProductsPage;
