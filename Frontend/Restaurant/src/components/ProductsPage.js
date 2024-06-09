import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductsPage.css';

const ProductsPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        // Simulating fetching data from a database
        const fetchedProducts = [
            { id: 1, name: 'Mc First', type: 'menu', price: '5,60 €' },
            { id: 2, name: 'Mc First Poulet', type: 'sandwich', price: '3,90 €' },
            { id: 3, name: 'Coca Cola 33cl', type: 'boisson', price: '1,60 €' },
            { id: 4, name: 'Moyennes Frites', type: 'accompagnement', price: '2,00 €' },
            { id: 5, name: 'Moyennes Potatoes', type: 'accompagnement', price: '2,00 €' },
            { id: 6, name: 'Mc First Poisson', type: 'sandwich', price: '3,90 €' },
        ];
        setProducts(fetchedProducts);
    }, []);

    const handleUpdate = (productId) => {
        navigate(`/update-product/${productId}`);
    };

    const handleAddProduct = () => {
        navigate('/add-product');
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.type.toLowerCase() === selectedCategory);

    return (
        <div className="main-container">
            <header onClick={() => navigate('/home')}>
                <h1>CESI Eats</h1>
                <h3>Restaurateur</h3>
            </header>
            <div className="products-page">
                <h2>Mes Produits</h2>
                <select className="product-type-select" onChange={handleCategoryChange}>
                    <option value="all">Tous les produits</option>
                    <option value="menu">Menu</option>
                    <option value="sandwich">Sandwichs</option>
                    <option value="boisson">Boissons</option>
                    <option value="accompagnement">Accompagnements</option>
                </select>
                <div className="products-list">
                    {filteredProducts.map(product => (
                        <div className="product-item" key={product.id}>
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p>{product.type}</p>
                            </div>
                            <div className="product-actions">
                                <span>{product.price}</span>
                                <button className="secondary" onClick={() => handleUpdate(product.id)}>Modifier</button>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="primary" onClick={handleAddProduct}>Ajouter un produit</button>
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

export default ProductsPage;
