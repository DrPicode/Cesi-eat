import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        restaurantName: '',
        address: '',
        category: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let errors = {};

        if (!formData.restaurantName) errors.restaurantName = "Le nom du restaurant est requis.";
        if (!formData.address) errors.address = "L'adresse est requise.";
        if (!formData.category) errors.category = "La catégorie est requise.";
        if (!formData.email) errors.email = "L'adresse e-mail est requise.";
        if (!formData.phone) errors.phone = "Le numéro de téléphone est requis.";
        if (!formData.password) errors.password = "Le mot de passe est requis.";
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Les mots de passe ne correspondent pas.";

        return errors;
    };

    const handleSignUp = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            // Logique pour créer le compte (peut inclure l'appel à une API)
            console.log(formData);
            navigate('/home');
        } else {
            setErrors(validationErrors);
        }
    };

    const handleBack = () => {
        navigate('/login');
    };

    return (
        <div className="main-container">
            <header>
                <h1>CESI Eats</h1>
                <h3>Restaurateur</h3>
            </header>
            <div className="signup-page">
                <form>
                    <input
                        type="text"
                        name="restaurantName"
                        placeholder="Nom du restaurant"
                        value={formData.restaurantName}
                        onChange={handleChange}
                        required
                    />
                    {errors.restaurantName && <p className="error">{errors.restaurantName}</p>}

                    <input
                        type="text"
                        name="address"
                        placeholder="Adresse"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                    {errors.address && <p className="error">{errors.address}</p>}

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Catégorie</option>
                        <option value="fast-food">Fast Food</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="cafe">Café</option>
                        <option value="bar">Bar</option>
                    </select>
                    {errors.category && <p className="error">{errors.category}</p>}

                    <input
                        type="email"
                        name="email"
                        placeholder="Adresse e-mail"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Numéro de téléphone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    {errors.phone && <p className="error">{errors.phone}</p>}

                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmez le mot de passe"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                    <button className="primary" type="button" onClick={handleSignUp}>Inscription</button>
                </form><br></br>
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

export default SignUpPage;
