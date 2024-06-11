import React from 'react';
import { MdPlace } from 'react-icons/md';
import HistoryCard from '../components/HistoryCard';

const Profile = () => {

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
                            <div className={'flex flex-col bg-lightGray py-2 px-5 lg:py-10 lg:px-20 rounded-lg'}>
                                <p className={'text-primary w-72'}>
                                    Nom : Doe<br/>
                                    Prénom : John<br/>
                                    Email : john.doe@e-mail.com<br/>
                                    Numéro de téléphone : 06 12 34 56 78<br/>
                                    Mot de passe : ********
                                </p>
                                <div className="flex gap-4 mt-4">
                                    <button className="bg-secColor text-white py-2 px-4 rounded">Modifier</button>
                                    <button className="bg-red-500 text-white py-2 px-4 rounded">Supprimer le compte
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Cart /> */}
                <HistoryCard />
            </div>
        </div>
    );
};

export default Profile;