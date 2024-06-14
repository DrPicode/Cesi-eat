import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importer useNavigate
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import shape1 from '../assets/Union.png';
import shape2 from '../assets/shape.png';
import {authProxy} from "../proxy/auth.proxy.js";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [status, setStatus] = useState("");
    const [address, setAddress] = useState(""); // Nouveau champ adresse
    const [city, setCity] = useState(""); // Nouveau champ ville
    const [postalCode, setPostalCode] = useState(""); // Nouveau champ code postal
    const [errors, setErrors] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate(); // Utiliser useNavigate pour rediriger l'utilisateur

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value);
    }

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    }

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleAddressChange = (e) => { setAddress(e.target.value); }
    const handleCityChange = (e) => { setCity(e.target.value); }
    const handlePostalCodeChange = (e) => { setPostalCode(e.target.value); }

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!lastName.trim()) {
            errors.lastName = "Le nom est obligatoire";
            isValid = false;
        }

        if (!firstName.trim()) {
            errors.firstName = "Le prénom est obligatoire";
            isValid = false;
        }

        if (!email.trim()) {
            errors.email = "L'adresse e-mail est obligatoire";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "L'adresse e-mail est invalide";
            isValid = false;
        }

        if (!phone.trim()) {
            errors.phone = "Le numéro de téléphone est obligatoire";
            isValid = false;
        }

        if (!password.trim()) {
            errors.password = "Le mot de passe est obligatoire";
            isValid = false;
        }

        if (password !== repeatPassword) {
            errors.repeatPassword = "Les mots de passe ne correspondent pas";
            isValid = false;
        }

        if (!status.trim()) {
            errors.status = "Le statut est obligatoire";
            isValid = false;
        }

        if (!isChecked) {
            errors.checkbox = "Vous devez accepter les conditions générales et la politique de confidentialité";
            isValid = false;
        }

        if (!address.trim()) { // Validation du champ adresse
            errors.address = "L'adresse est obligatoire";
            isValid = false;
        }

        if (!city.trim()) { // Validation du champ ville
            errors.city = "La ville est obligatoire";
            isValid = false;
        }

        if (!postalCode.trim()) { // Validation du champ code postal
            errors.postalCode = "Le code postal est obligatoire";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const submit = async () => {
        if (validateForm()) {
            try {
                const response = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        lastName,
                        firstName,
                        email,
                        phone,
                        password,
                        status,
                        address, // Ajouter le champ adresse
                        city, // Ajouter le champ ville
                        postalCode // Ajouter le champ code postal
                    })
                });

                if (response.ok) {
                    try {
                        const response = await fetch("/api/auth/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                email,
                                password
                            })
                        });

                        if (response.ok) {
                            const body = await response.json();
                            console.log({body});
                            authProxy.token = body.accessToken;
                            navigate('/');
                        } else {
                            const errorMessage = await response.text();
                            setError(`Erreur lors de la connexion : ${errorMessage}`);
                        }
                    } catch (error) {
                        console.error(error);
                        setError('Une erreur est survenue lors de la connexion.');
                    }
                } else {
                    const errorMessage = await response.text();
                    alert(`Erreur lors de la création du compte : ${errorMessage}`);
                }
            } catch (error) {
                console.error(error);
                alert('Une erreur est survenue lors de la création du compte.');
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center bg-white w-full h-full">
            <div className="relative section__padding w-full h-full">
                <div className="hidden lg:block absolute top-40 -left-64">
                    <img src={shape1} alt="" />
                </div>
                <div className="hidden lg:block absolute top-40 right-0">
                    <img src={shape2} alt="" />
                </div>
            </div>
            <div className="flex flex-col items-center w-full max-w-md p-10 bg-gray-100 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-black">Créer un compte</h2>
                <input
                    value={lastName}
                    onChange={handleLastNameChange}
                    className={`w-full p-3 mb-4 border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-lg`}
                    type="text"
                    placeholder="Nom"
                    required
                />
                {errors.lastName && <p className="text-red-500 mb-4">{errors.lastName}</p>}
                <input
                    value={firstName}
                    onChange={handleFirstNameChange}
                    className={`w-full p-3 mb-4 border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-lg`}
                    type="text"
                    placeholder="Prénom"
                    required={true}
                />
                {errors.firstName && <p className="text-red-500 mb-4">{errors.firstName}</p>}
                <input
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full p-3 mb-4 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg`}
                    type="email"
                    placeholder="Adresse e-mail"
                    required={true}
                />
                {errors.email && <p className="text-red-500 mb-4">{errors.email}</p>}
                <input
                    value={phone}
                    onChange={handlePhoneChange}
                    className={`w-full p-3 mb-4 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-lg`}
                    type="tel"
                    placeholder="Numéro de téléphone"
                    required={true}
                />
                {errors.phone && <p className="text-red-500 mb-4">{errors.phone}</p>}
                <input
                    value={address}
                    onChange={handleAddressChange}
                    className={`w-full p-3 mb-4 border ${errors.address ? "border-red-500" : "border-gray-300"} rounded-lg`}
                    type="text"
                    placeholder="Adresse"
                    required={true}
                />
                {errors.address && <p className="text-red-500 mb-4">{errors.address}</p>}
                <input
                    value={city}
                    onChange={handleCityChange}
                    className={`w-full p-3 mb-4 border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-lg`}
                    type="text"
                    placeholder="Ville"
                    required={true}
                />
                {errors.city && <p className="text-red-500 mb-4">{errors.city}</p>}
                <input
                    value={postalCode}
                    onChange={handlePostalCodeChange}
                    className={`w-full p-3 mb-4 border ${errors.postalCode ? "border-red-500" : "border-gray-300"} rounded-lg`}
                    type="text"
                    placeholder="Code postal"
                    required={true}
                />
                {errors.postalCode && <p className="text-red-500 mb-4">{errors.postalCode}</p>}
                <div className="relative w-full mb-4">
                    <input
                        value={password}
                        onChange={handlePasswordChange}
                        className={`w-full p-3 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg`}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Mot de passe"
                        required={true}
                    />
                    {errors.password && <p className="text-red-500 mb-4">{errors.password}</p>}
                    <div
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                    </div>
                </div>
                <div className="relative w-full mb-4">
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        type={showRepeatPassword ? 'text' : 'password'}
                        placeholder="Répéter le mot de passe"
                        value={repeatPassword}
                        onChange={handleRepeatPasswordChange}
                    />
                    {errors.repeatPassword && <p>{errors.repeatPassword}</p>}
                    <div
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    >
                        {showRepeatPassword ? <BsEyeSlash /> : <BsEye />}
                    </div>
                </div>
                <div className={`w-full p-3 mb-4 border ${errors.status ? "border-red-500" : "border-gray-300"} rounded-lg text-gray-400 bg-white`}>
                    <select
                        className="w-full h-full bg-transparent"
                        defaultValue=""
                        value={status}
                        onChange={handleStatusChange}
                    >
                        <option value="" disabled className="text-gray-400">Je suis...</option>
                        <option value="consommateur">Consommateur</option>
                        <option value="livreur">Livreur</option>
                        <option value="restaurateur">Restaurateur</option>
                    </select>
                </div>
                {errors.status && <p className="text-red-500 mb-4">{errors.status}</p>}
                <div className="flex items-start mb-4">
                    <input
                        type="checkbox"
                        className="mt-1 mr-2"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <p className="text-sm text-black">
                        En continuant, vous acceptez nos <Link to="/terms" className="text-orange-500 hover:underline">conditions générales</Link> et notre <Link to="/privacy" className="text-orange-500 hover:underline">politique de confidentialité</Link>.
                    </p>
                </div>
                {errors.checkbox && <p className="text-red-500 mb-4">{errors.checkbox}</p>}
                <div className="w-full flex justify-between mb-4">
                    <Link to="/" className="w-1/2 mr-2">
                        <button className="w-full py-3 text-gray-800 bg-white rounded-lg hover:bg-gray-200 transition-all">
                            Retour
                        </button>
                    </Link>
                    <button className="w-1/2 ml-2 py-3 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all" onClick={submit}>
                        Créer un compte
                    </button>
                </div>
                <p className="text-sm text-black">
                    Vous avez déjà un compte ?{' '}
                    <Link to="/login" className="text-orange-500 hover:underline">
                        Connectez-vous
                    </Link>
                </p>
            </div>
            <div className="h-20"></div>
        </div>
    );
};

export default Register;