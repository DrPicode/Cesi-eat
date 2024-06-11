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

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone) => {
        const re = /^\+?[0-9]{10,14}$/;
        return re.test(String(phone));
    };

    const validate = () => {
        let errors = {};

        if (!formData.restaurantName) errors.restaurantName = "Le nom du restaurant est requis.";
        if (!formData.address) errors.address = "L'adresse est requise.";
        if (!formData.category) errors.category = "La catégorie est requise.";
        if (!formData.email) {
            errors.email = "L'adresse e-mail est requise.";
        } else if (!validateEmail(formData.email)) {
            errors.email = "Veuillez entrer une adresse e-mail valide.";
        }
        if (!formData.phone) {
            errors.phone = "Le numéro de téléphone est requis.";
        } else if (!validatePhone(formData.phone)) {
            errors.phone = "Veuillez entrer un numéro de téléphone valide.";
        }
        if (!formData.password) {
            errors.password = "Le mot de passe est requis.";
        } else if (formData.password.length < 6) {
            errors.password = "Le mot de passe doit comporter au moins 6 caractères.";
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Les mots de passe ne correspondent pas.";
        }

        return errors;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            // Logique pour créer le compte (peut inclure l'appel à une API)
            console.log(formData);

            // Préparer l'intégration avec le backend
            // try {
            //     const response = await axios.post('/api/register', formData);
            //     if (response.data.success) {
            //         navigate('/home');
            //     } else {
            //         setErrors({ general: 'Erreur lors de la création du compte. Veuillez réessayer.' });
            //     }
            // } catch (error) {
            //     console.error('Erreur lors de la tentative de création du compte:', error);
            //     setErrors({ general: 'Une erreur est survenue. Veuillez réessayer.' });
            // }

            // Temporairement, redirige vers la page d'accueil
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
                <form onSubmit={handleSignUp}>
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

                    <button className="primary" type="submit">Inscription</button>
                    {errors.general && <p className="error">{errors.general}</p>}
                </form><br></br>
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

export default SignUpPage;
