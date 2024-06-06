import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import shape1 from '../assets/Union.png';
import shape2 from '../assets/shape.png';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

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
            <div className="flex flex-col items-center w-full max-w-md p-10 bg-gray-100 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-black">Créer un compte</h2>
                <input
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                    type="text"
                    placeholder="Nom"
                />
                <input
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                    type="text"
                    placeholder="Prénom"
                />
                <input
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                    type="email"
                    placeholder="Adresse e-mail"
                />
                <input
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                    type="tel"
                    placeholder="Numéro de téléphone"
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
                <div className="relative w-full mb-4">
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        type={showRepeatPassword ? 'text' : 'password'}
                        placeholder="Répéter le mot de passe"
                    />
                    <div
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    >
                        {showRepeatPassword ? <BsEyeSlash /> : <BsEye />}
                    </div>
                </div>
                <div className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-gray-400 bg-white">
                    <select
                        className="w-full h-full bg-transparent"
                        defaultValue=""
                    >
                        <option value="" disabled className="text-gray-400">Je suis...</option>
                        <option value="consommateur">Consommateur</option>
                        <option value="livreur">Livreur</option>
                        <option value="restaurateur">Restaurateur</option>
                    </select>
                </div>
                <div className="flex items-start mb-4">
                    <input
                        type="checkbox"
                        className="mt-1 mr-2"
                    />
                    <p className="text-sm text-black">
                        En continuant, vous acceptez nos <Link to="/terms" className="text-orange-500 hover:underline">conditions générales</Link> et notre <Link to="/privacy" className="text-orange-500 hover:underline">politique de confidentialité</Link>.
                    </p>
                </div>
                <div className="w-full flex justify-between mb-4">
                    <Link to="/" className="w-1/2 mr-2">
                        <button className="w-full py-3 text-gray-800 bg-white rounded-lg hover:bg-gray-200 transition-all">
                            Retour
                        </button>
                    </Link>
                    <button className="w-1/2 ml-2 py-3 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all">
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