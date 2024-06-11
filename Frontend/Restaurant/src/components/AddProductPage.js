import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProductPage.css';

const AddProductPage = () => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productType, setProductType] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        let errors = {};

        if (!productName) {
            errors.productName = "Le nom du produit est requis.";
        }

        if (!productPrice) {
            errors.productPrice = "Le prix du produit est requis.";
        } else if (!/^\d+(\,\d{1,2})?$/.test(productPrice)) {
            errors.productPrice = "Le prix doit être un nombre décimal au format 0,00.";
        }

        if (!productType) {
            errors.productType = "Le type de produit est requis.";
        }

        return errors;
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            // Logique pour enregistrer le produit (peut inclure l'appel à une API)
            console.log({ productName, productPrice, productType });

            // Préparer l'intégration avec le backend
            // try {
            //     const response = await axios.post('/api/products', {
            //         name: productName,
            //         price: productPrice,
            //         type: productType
            //     });
            //     if (response.data.success) {
            //         navigate('/products');
            //     } else {
            //         setErrors({ general: 'Erreur lors de l\'ajout du produit. Veuillez réessayer.' });
            //     }
            // } catch (error) {
            //     console.error('Erreur lors de la tentative d\'ajout du produit:', error);
            //     setErrors({ general: 'Une erreur est survenue. Veuillez réessayer.' });
            // }

            // Temporairement, redirige vers la page des produits
            navigate('/products');
        } else {
            setErrors(validationErrors);
        }
    };

    const handleBack = () => {
        navigate('/products');
    };

    return (
        <div className="add-product-container">
            <header>
                <h1>CESI Eats</h1>
                <h3>Restaurateur</h3>
            </header>
            <div className="add-product-form">
                <h2>Ajouter un produit</h2>
                <form onSubmit={handleSave}>
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
                            <option value="menu">Menu</option>
                            <option value="sandwich">Sandwich</option>
                            <option value="boisson">Boisson</option>
                            <option value="accompagnement">Accompagnement</option>
                            <option value="dessert">Dessert</option>
                        </select>
                        {errors.productType && <p className="error">{errors.productType}</p>}
                    </div>

                    <button className="primary" type="submit">Enregistrer</button>
                    {errors.general && <p className="error">{errors.general}</p>}
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
