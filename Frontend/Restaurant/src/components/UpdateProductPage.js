import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateProductPage.css';

const UpdateProductPage = () => {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productType, setProductType] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Simulating fetching product data from a database
        const fetchProduct = (id) => {
            // Replace this with your actual data fetching logic
            const productData = [
                { id: 1, name: 'Mc First', type: 'Menu', price: '5,60 €' },
                { id: 2, name: 'Mc First Poulet', type: 'Sandwich', price: '3,90 €' },
                { id: 3, name: 'Coca Cola 33cl', type: 'Boisson', price: '1,60 €' },
                { id: 4, name: 'Moyennes Frites', type: 'Accompagnement', price: '2,00 €' },
                { id: 5, name: 'Moyennes Potatoes', type: 'Accompagnement', price: '2,00 €' },
                { id: 6, name: 'Mc First Poisson', type: 'Sandwich', price: '3,90 €' },
            ];
            return productData.find(product => product.id === parseInt(id));
        };

        const product = fetchProduct(productId);

        if (product) {
            setProductName(product.name);
            setProductPrice(product.price);
            setProductType(product.type);
        }
    }, [productId]);

    const validate = () => {
        let errors = {};

        if (!productName) {
            errors.productName = "Le nom du produit est requis.";
        }

        if (!productPrice) {
            errors.productPrice = "Le prix du produit est requis.";
        } else if (!/^\d+(\.\d{1,2})?$/.test(productPrice)) {
            errors.productPrice = "Le prix doit être un nombre décimal.";
        }

        if (!productType) {
            errors.productType = "Le type de produit est requis.";
        }

        return errors;
    };

    const handleSave = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            // Logique pour enregistrer le produit (peut inclure l'appel à une API)
            console.log({ productName, productPrice, productType });
            navigate('/products');
        } else {
            setErrors(validationErrors);
        }
    };

    const handleBack = () => {
        navigate('/products');
    };

    return (
        <div className="update-product-container">
            <header>
                <h1>CESI Eats</h1>
                <h3>Restaurateur</h3>
            </header>
            <div className="update-product-form">
                <h2>Modifier un produit</h2>
                <h4>{productName}</h4>
                <input
                    type="text"
                    placeholder="Nom du produit"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                {errors.productName && <p className="error">{errors.productName}</p>}

                <input
                    type="text"
                    placeholder="Prix du produit (en €)"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                />
                {errors.productPrice && <p className="error">{errors.productPrice}</p>}

                <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                >
                    <option value="">Type de produit</option>
                    <option value="Menu">Menu</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Boisson">Boisson</option>
                    <option value="Accompagnement">Accompagnement</option>
                    <option value="Dessert">Dessert</option>
                </select>
                {errors.productType && <p className="error">{errors.productType}</p>}

                <button className="primary" onClick={handleSave}>Enregistrer</button>
                <button className="secondary" onClick={handleBack}>Retour</button>
            </div>
            <footer>
                <nav>
                    <a href="#">A propos de nous</a>
                    <a href="#">Aide et Support</a>
                    <a href="#">Mentions légales</a>
                </nav>
            </footer>
        </div>
    );
};

export default UpdateProductPage;
