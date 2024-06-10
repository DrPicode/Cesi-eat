import React, { useState } from 'react';
import { MdPlace } from 'react-icons/md';
import { AiOutlineCalendar } from 'react-icons/ai';
import Cart from '../components/Cart';

const CheckOut = () => {
  const [active, setActive] = useState(true);
  const [activeNow, setActiveNow] = useState(true); // Changement ici
  const [currentDateTime, setCurrentDateTime] = useState('');

  const handelActiveToggle = () => {
    setActive(!active);
  };

  const handleActiveNowToggle = () => {
    setActiveNow(!activeNow);
    if (!activeNow) {
      const now = new Date();
      now.setHours(now.getHours() + 2); // Ajoute 2 heures
      const formattedDateTime = now.toISOString().slice(0, 16);
      setCurrentDateTime(formattedDateTime);
    }
  };

  console.log(active);

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
            <div className="flex flex-col md:flex-row gap-6">
              <div
                className={
                  active
                    ? 'flex flex-col bg-secColor py-2 px-4 lg:py-4 lg:px-8 rounded-lg'
                    : 'flex flex-col border-2 border-dashed border-secColor py-2 px-4 lg:py-4 lg:px-8 rounded-lg'
                }
                onClick={handelActiveToggle}
              >
                <MdPlace
                  className={
                    active ? 'fill-white w-6 h-8' : ' fill-black w-6 h-8'
                  }
                />
                <p className={active ? 'text-white w-72' : ' text-black w-72'}>
                  CESI, 264 Boulevard Godard
                  33300, Bordeaux, FRANCE
                </p>
              </div>
              <div
                className={
                  !active
                    ? 'flex flex-col bg-secColor py-2 px-4 lg:py-4 lg:px-8 rounded-lg'
                    : 'flex flex-col border-2 border-dashed border-secColor py-2 px-4 lg:py-4 lg:px-8 rounded-lg'
                }
                onClick={handelActiveToggle}
              >
                <MdPlace
                  className={
                    !active ? 'fill-white w-6 h-8' : ' fill-black w-6 h-8'
                  }
                />
                <p className={!active ? 'text-white w-72' : ' text-black w-72'}>
                  Hangar 14, 115 Quai des Chartrons
                  33000, Bordeaux, FRANCE
                </p>
              </div>
            </div>
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
                onChange={(e) => setCurrentDateTime(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* <Cart /> */}
        <Cart />
      </div>
    </div>
  );
};

export default CheckOut;