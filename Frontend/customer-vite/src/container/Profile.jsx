import React, {useEffect, useState} from 'react';
import { MdPlace } from 'react-icons/md';
import HistoryCard from '../components/HistoryCard';
import { authProxy } from "../proxy/auth.proxy.js";
import {useNavigate, useParams} from 'react-router-dom';

const Profile = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        console.log("Fetch user with id ")
        const fecthUserData = async () => {
            try {
                const headers = new Headers();
                headers.set("Authorization", `Bearer ${authProxy.token}`)
                const response = await fetch(`/api/users/${id}`, {
                    headers
                }).then(async (response) => {
                    if (response.ok){
                        const data = await response.json()
                        setUser(data)
                    } else {
                        alert("Not Authorized");
                        navigate("/login")
                    }
                });
            } catch (e) {
                console.error(e)
            }
        }
        fecthUserData();
    }, [id]);

    const disconnect = () => {
        try {
            const headers = new Headers();
            headers.set("Authorization", `Bearer ${authProxy.token}`)
            fetch(`/api/auth/logout`, {
                method: "GET",
                headers
            }).then(async (response) => {
                if (response.ok){
                    authProxy.token = null;
                    sessionStorage.removeItem("User");
                    navigate("/")
                } else {
                    alert("Not Authorized");
                    navigate("/login")
                }
            });
        } catch (e) {
            console.error(e)
        }
    };

    const deleteAccount = () => {
        try {
            const headers = new Headers();
            headers.set("Authorization", `Bearer ${authProxy.token}`)
            fetch(`/api/users/${id}`, {
                method: "DELETE",
                headers
            }).then(async (response) => {
                if (response.ok){
                    authProxy.token = null;
                    sessionStorage.removeItem("User");
                    navigate("/")
                } else {
                    alert("Not Authorized");
                    navigate("/login")
                }
            });
        } catch (e) {
            console.error(e)
        }
    };

    const handleUpdateUser = async () => {
        try {
            const updatedUserData = {
                firstName: updatedUser.firstName === '' ? user.firstName : updatedUser.firstName,
                lastName: updatedUser.lastName === '' ? user.lastName : updatedUser.lastName,
                email: updatedUser.email === '' ? user.email : updatedUser.email,
                phone: updatedUser.phone === '' ? user.phone : updatedUser.phone,
            };

            const response = await fetch(`/api/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authProxy.token}`,
                },
                body: JSON.stringify(updatedUserData),
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
                setShowModal(false);
                console.log("User updated", data);
            } else {
                alert("Erreur lors de la mise à jour des informations");
            }
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <div className="w-full h-full section__padding ">
            <h2 className="font-semibold text-2xl w-full border-b-2 pb-2 mb-10">
                Mon profil
            </h2>
            <div className="w-full h-full flex flex-col lg:flex-row justify-between ">
                <div className="w-3/4 h-full mb-2">
                    {/* adresse */}
                    <div className="flex flex-col">
                        <div className=" font-semibold text-2xl flex items-center gap-2">
                            <MdPlace className="fill-secColor w-6 h-10"/>
                            <h3>Informations Personelles</h3>
                        </div>
                        <div className='mt-8'></div>
                        <div className="flex flex-col md:flex-row gap-6">
                            {user ? (
                                <div className={'flex flex-col bg-lightGray py-2 px-5 lg:py-10 lg:px-20 rounded-lg'}>
                                    <p className={'text-primary w-72'}>
                                        Nom : {user.lastName}<br/>
                                        Prénom : {user.firstName}<br/>
                                        Email : {user.email}<br/>
                                        Numéro de téléphone : {user.phone}<br/>
                                        Mot de passe : ********
                                    </p>
                                    <div className="flex gap-4 mt-4">
                                        <button
                                            className="bg-secColor text-white py-2 px-4 rounded"
                                            onClick={() => setShowModal(true)}
                                        >
                                            Modifier
                                        </button>
                                        <button className="bg-red-500 text-white py-2 px-4 rounded"
                                                onClick={deleteAccount}>Supprimer le
                                            compte
                                        </button>
                                        <button className="bg-mainColor text-white py-2 px-4 rounded"
                                                onClick={disconnect}>Déconnexion
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-1/2">
                    <HistoryCard userId={id}/>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Modifier les informations</h3>
                        <input
                            type="text"
                            value={updatedUser.firstName}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, firstName: e.target.value })}
                            placeholder={user.firstName}
                            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                        />
                        <input
                            type="text"
                            value={updatedUser.lastName}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, lastName: e.target.value })}
                            placeholder={user.lastName}
                            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                        />
                        <input
                            type="email"
                            value={updatedUser.email}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                            placeholder={user.email}
                            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                        />
                        <input
                            type="tel"
                            value={updatedUser.phone}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })}
                            placeholder={user.phone}
                            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                        />
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-2"
                                onClick={() => setShowModal(false)}
                            >
                                Annuler
                            </button>
                            <button
                                className="bg-secColor text-white py-2 px-4 rounded-lg"
                                onClick={handleUpdateUser}
                            >
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;