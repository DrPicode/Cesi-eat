import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProductPage.css';
import { authProxyRestaurant } from "../proxy/auth.proxy.js";

const AddProductPage = () => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productType, setProductType] = useState('');
    const [errors, setErrors] = useState({});
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
                        const getRestaurantInfo = async () => {
                            try {
                                const headers = new Headers();
                                headers.set("Authorization", `Bearer ${authProxyRestaurant.token}`)
                                const restaurantResponse = await fetch(`/api/restaurants/name/${data.name}`, {
                                    method: "GET",
                                    headers
                                });

                                if (restaurantResponse.ok) {
                                    const restaurantData = await restaurantResponse.json();
                                } else {
                                    alert("Not Authorized");
                                    navigate("/");
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        };
                        await getRestaurantInfo();
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

    const Submit = async (e) => {
        e.preventDefault();

        // Validation des champs
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            const response = await fetch('/api/articles/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authProxyRestaurant.token}` // Ajoutez le token d'authentification si nécessaire
                },
                body: JSON.stringify({
                    name: productName,
                    price: parseFloat(productPrice),
                    thumbnail: null,
                    type: productType,
                    restaurant_id_restaurant: restaurant.id_restaurant
                })
            });

            if (response.ok) {
                const newProduct = await response.json();
                console.log('Nouveau produit créé :', newProduct);
                // Réinitialisez les champs du formulaire si nécessaire
                setProductName('');
                setProductPrice('');
                setProductType('');
            } else {
                console.error('Erreur lors de la création du produit');
            }
        } catch (error) {
            console.error('Erreur lors de la requête :', error);
        }
    };

    const validate = () => {
        let errors = {};

        if (!productName) {
            errors.productName = "Le nom du produit est requis.";
        }

        if (!productPrice) {
            errors.productPrice = "Le prix du produit est requis.";
        } else if (!/^\d+(\.\d{1,2})?$/.test(productPrice)) {
            errors.productPrice = "Le prix doit être un nombre décimal au format 0,00.";
        }

        if (!productType) {
            errors.productType = "Le type de produit est requis.";
        }

        return errors;
    };

    const handleBack = () => {
        navigate('/products');
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
            <div className="add-product-form">
                <h2>Ajouter un produit</h2>
                <form onSubmit={Submit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Nom du produit"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                        {errors.productName && <p className="error">{errors.productName}</p>}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Prix du produit (en €)"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            required
                        />
                        {errors.productPrice && <p className="error">{errors.productPrice}</p>}
                    </div>

                    <div className="form-group">
                        <select
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                            required
                        >
                            <option value="">Type de produit</option>
                            <option value="MainCourse">Sandwich</option>
                            <option value="Drink">Boisson</option>
                            <option value="SideDish">Accompagnement</option>
                        </select>
                        {errors.productType && <p className="error">{errors.productType}</p>}
                    </div>

                    <button className="primary" type="submit">Enregistrer</button>
                </form>
                <button className="secondary" type="button" onClick={handleBack}>Retour</button>
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

export default AddProductPage;
