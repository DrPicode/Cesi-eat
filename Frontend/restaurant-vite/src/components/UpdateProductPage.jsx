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
                { id: 1, name: 'Mc First', type: 'Menu', price: '5,60' },
                { id: 2, name: 'Mc First Poulet', type: 'Sandwich', price: '3,90' },
                { id: 3, name: 'Coca Cola 33cl', type: 'Boisson', price: '1,60' },
                { id: 4, name: 'Moyennes Frites', type: 'Accompagnement', price: '2,00' },
                { id: 5, name: 'Moyennes Potatoes', type: 'Accompagnement', price: '2,00' },
                { id: 6, name: 'Mc First Poisson', type: 'Sandwich', price: '3,90' },
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
        } else if (!/^\d+(\,\d{1,2})?$/.test(productPrice)) {
            errors.productPrice = "Le prix est incorrect. Utilisez le format 0,00.";
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
            //     const response = await axios.put(`/api/products/${productId}`, {
            //         name: productName,
            //         price: productPrice,
            //         type: productType
            //     });
            //     if (response.data.success) {
            //         navigate('/products');
            //     } else {
            //         setErrors({ general: 'Erreur lors de la mise à jour du produit. Veuillez réessayer.' });
            //     }
            // } catch (error) {
            //     console.error('Erreur lors de la tentative de mise à jour du produit:', error);
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
        <div className="update-product-container">
            <header>
                <h1>CESI Eats</h1>
                <h3>Restaurateur</h3>
            </header>
            <div className="update-product-form">
                <h2>Modifier un produit</h2>
                <h4>{productName}</h4>
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
                            <option value="">Type de produits</option>
                            <option value="menu">Menu</option>
                            <option value="sandwich">Sandwichs</option>
                            <option value="boisson">Boissons</option>
                            <option value="accompagnement">Accompagnements</option>
                            <option value="dessert">Desserts</option>
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

export default UpdateProductPage;
