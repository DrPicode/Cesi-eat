import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import shape1 from '../assets/Union.png';
import shape2 from '../assets/shape.png';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="flex flex-col items-center justify-center bg-white w-full h-full">
            <div className="relative section__padding w-full h-full">
                <div className="hidden lg:block absolute top-40 -left-64">
                    <img src={shape1} alt="" />
                </div>
                <div className="hidden lg:block absolute top-40 -right-44">
                    <img src={shape2} alt="" />
                </div>
            </div>
            <div className="h-10"></div>
            <div className="flex flex-col items-center w-full max-w-md p-10 bg-gray-100 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-black">Se connecter</h2>
                <input
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                    type="text"
                    placeholder="Adresse e-mail ou téléphone"
                />
                <div className="relative w-full mb-4">
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Mot de passe"
                    />
                    <div
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                    </div>
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
                    <button className="w-1/2 ml-2 py-3 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all">
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
