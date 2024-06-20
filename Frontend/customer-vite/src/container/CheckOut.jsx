import React, { useState, useEffect } from 'react';
import { MdPlace } from 'react-icons/md';
import { AiOutlineCalendar } from 'react-icons/ai';
import CartCheckOut from "../components/CartCheckOut.jsx";

const CheckOut = () => {
  const [activeNow, setActiveNow] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newZipCode, setNewZipCode] = useState('');

  const fetchAddresses = async () => {
    try {
      const response = await fetch('/api/addresses');
      return await response.json();
    } catch (error) {
      console.error('Error fetching addresses:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const addressesData = await fetchAddresses();
        setAddresses(addressesData);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    fetchData();
  }, []);

  const handleActiveNowToggle = () => {
    setActiveNow(!activeNow);
    if (!activeNow) {
      const now = new Date();
      now.setHours(now.getHours() + 2);
      const formattedDateTime = now.toISOString().slice(0, 16);
      setCurrentDateTime(formattedDateTime);
    }
  };

  const handleDateTimeChange = (event) => {
    setCurrentDateTime(event.target.value);
  }

  const now = new Date();
  const minDateTime = now.toISOString().slice(0, 16);

  // Fonction pour gérer le changement de l'adresse sélectionnée dans la liste déroulante
  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  // Fonction pour ouvrir la popup
  const handleOpenAddressInput = () => {
    setShowAddressInput(true);
  };

  // Fonction pour fermer la popup
  const handleCloseAddressInput = () => {
    setShowAddressInput(false);
    setNewAddress('');
  };

  // Fonction pour ajouter la nouvelle adresse
  const handleAddNewAddress = () => {
    fetch('/api/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address: newAddress }),
    })
      .then(() => {
        const newAddressObj = { address: newAddress };
        setAddresses([...addresses, newAddressObj]);
        setSelectedAddress(newAddress);

        handleCloseAddressInput();
      })
      .catch((error) => {
        console.error('Error adding new address:', error);
      });
  };

  return (
    <div className="w-full h-full section__padding ">
      <h2 className="font-semibold text-2xl w-full border-b-2 pb-2 mb-10">
        Informations de livraison
      </h2>
      <div className="w-full h-full flex flex-col lg:flex-row justify-between ">
        <div className="w-3/4 h-full mb-2">
          {/* adress */}
          <div className="flex flex-col">
            <div className=" font-semibold text-2xl flex items-center gap-2">
              <MdPlace className="fill-secColor w-6 h-10" />
              <h3>Adresse de livraison</h3>
            </div>
            <select value={selectedAddress} onChange={handleAddressChange}
              className={'mt-5 w-full h-10 border border-gray-300 rounded-lg p-2 mb-4'}>
              <option value="">Sélectionnez une adresse</option>
              {addresses.map((address, index) => (
                <option key={index} value={address.address}>
                  {address.address}, {address.postalCode}, {address.city}
                </option>
              ))}
            </select>

            <button onClick={handleOpenAddressInput} className={'bg-secColor text-white py-2 px-4 rounded-lg'}>
              Ajouter une adresse
            </button>
          </div>
          {/* order */}

          <div className="mt-10 ">
            <div className=" font-semibold text-2xl flex  items-center gap-2 mb-10">
              <MdPlace className="fill-secColor w-6 h-8" />
              <h3>Date de livraison</h3>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div
                className={
                  activeNow
                    ? 'flex items-center border-2 border-dashed border-secColor py-3 px-6 rounded-lg gap-2'
                    : 'flex items-center bg-secColor py-3 px-6 rounded-lg gap-2'
                }
                onClick={handleActiveNowToggle}
              >
                <AiOutlineCalendar
                  className={activeNow ? 'fill-black w-6 h-6' : 'fill-white w-6 h-6'}
                />
                <p className={activeNow ? 'text-black font-medium' : 'text-white font-medium'}>
                  Programmer la livraison
                </p>
              </div>
              <div
                className={
                  activeNow
                    ? 'flex items-center bg-secColor py-3 px-6 rounded-lg gap-2'
                    : 'flex items-center border-2 border-dashed border-secColor py-3 px-6 rounded-lg gap-2'
                }
                onClick={handleActiveNowToggle}
              >
                <AiOutlineCalendar
                  className={activeNow ? 'fill-white w-6 h-6' : 'fill-black w-6 h-6'}
                />
                <p className={activeNow ? 'text-white font-medium' : 'text-black font-medium'}>
                  Livrer maintenant
                </p>
              </div>
            </div>
          </div>
          {/* subscription */}
          <div className="mt-10 flex flex-col md:flex-row justify-between mr-8">
            <div className="mr-3">
              {' '}
              <div className=" font-semibold text-base mb-10">
                <h3>Horaire de livraison</h3>
              </div>
              <input
                type="datetime-local"
                className="w-full h-10 border border-gray-300 rounded-lg p-2"
                value={currentDateTime}
                onChange={handleDateTimeChange}
                min={minDateTime}
              />
            </div>
          </div>
        </div>
        {/* <Cart /> */}
        <CartCheckOut
          selectedAddress={selectedAddress}
          currentDateTime={currentDateTime}
        />
      </div>

      {/* Popup pour ajouter une nouvelle adresse */}
      {showAddressInput && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Ajouter une nouvelle adresse</h3>
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Entrez votre nouvelle adresse"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <input
              type="text"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              placeholder="Entrez votre ville"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <input
              type="text"
              value={newZipCode}
              onChange={(e) => setNewZipCode(e.target.value)}
              placeholder="Entrez votre code postal"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-2"
                onClick={handleCloseAddressInput}
              >
                Annuler
              </button>
              <button
                className="bg-secColor text-white py-2 px-4 rounded-lg"
                onClick={handleAddNewAddress}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOut;