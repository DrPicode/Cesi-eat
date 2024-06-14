import React, {useEffect, useState} from 'react';
import { MdPlace } from 'react-icons/md';
import HistoryCard from '../components/HistoryCard';
import { authProxy } from "../proxy/auth.proxy.js";
import {useNavigate, useParams} from 'react-router-dom';

const Profile = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null)

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
    }, [id])

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
                    navigate("/")
                } else {
                    alert("Not Authorized");
                    navigate("/login")
                }
            });
        } catch (e) {
            console.error(e)
        }
    }

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
                    navigate("/")
                } else {
                    alert("Not Authorized");
                    navigate("/login")
                }
            });
        } catch (e) {
            console.error(e)
        }
    }

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
                                        <button className="bg-secColor text-white py-2 px-4 rounded">Modifier</button>
                                        <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={deleteAccount}>Supprimer le
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
                {/* <Cart /> */}
                <HistoryCard/>
            </div>
        </div>
    );
};

export default Profile;