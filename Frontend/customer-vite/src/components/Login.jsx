import React, { useState, createContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import shape1 from '../assets/Union.png';
import shape2 from '../assets/shape.png';
import { authProxy } from "../proxy/auth.proxy.js";
import { useSnapshot } from "valtio";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const authSnap = useSnapshot(authProxy);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const validateForm = () => {
        if (!email.trim()) {
            setError("Veuillez entrer une adresse e-mail.");
            return false;
        }
        if (!password.trim()) {
            setError("Veuillez entrer un mot de passe.");
            return false;
        }
        return true;
    }

    const submit = async () => {
        if (validateForm()) {
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
                    console.log({ body });
                    authProxy.token = body.accessToken;
                    authProxy.userId = body.userId;
                    sessionStorage.setItem("User", JSON.stringify(body));
                    navigate("/");
                } else {
                    // Afficher le message d'erreur sur la page
                    const errorMessage = await response.text();
                    setError(`Erreur lors de la connexion : ${errorMessage}`);
                }
            } catch (error) {
                console.error(error);
                setError(`Une erreur est survenue lors de la connexion: ${error.message}`);
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
            <div className="h-10"></div>
            <div className="flex flex-col items-center w-full max-w-md p-10 bg-gray-100 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-black">Se connecter</h2>
                <input
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                    type="text"
                    placeholder="Adresse e-mail"
                />
                <div className="relative w-full mb-4">
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Mot de passe"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <div
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                </div>
                <div className="w-full flex justify-end mb-4">
                    <Link to="/forgot-password" className="text-sm text-black hover:underline">
                        Mot de passe oublié ?
                    </Link>
                </div>
                <div className="w-full flex justify-between mb-4">
                    <Link to="/" className="w-1/2 mr-2">
                        <button className="w-full py-3 text-gray-800 bg-white rounded-lg hover:bg-gray-200 transition-all">
                            Retour
                        </button>
                    </Link>
                    <button className="w-1/2 ml-2 py-3 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all" onClick={submit}>
                        Connexion
                    </button>
                </div>
                <p className="text-sm text-black">
                    Vous n'avez pas de compte ?{' '}
                    <Link to="/register" className="text-orange-500 hover:underline">
                        Créer un compte
                    </Link>
                </p>
            </div>
            <div className="h-20"></div>
        </div>
    );
};

export default Login;
