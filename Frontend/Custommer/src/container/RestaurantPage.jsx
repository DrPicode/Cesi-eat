import React, { useState } from 'react';
import Cart from '../components/Cart';
import Restaurant from '../assets/Restaurant.png';
import restaurantpage from '../assets/restaurantpage..png';
import { Link } from 'react-router-dom';
import beefSandwichImage from '../assets/personalized1.png';
import chickenSandwichImage from '../assets/personalized1.png';
import fishSandwichImage from '../assets/personalized1.png';
import friesImage from '../assets/personalized1.png';
import potatoesImage from '../assets/personalized1.png';
import saladImage from '../assets/personalized1.png';
import cocaImage from '../assets/personalized1.png';
import fantaImage from '../assets/personalized1.png';
import iceTeaImage from '../assets/personalized1.png';

const RestaurantPage = () => {
  const [selectedSandwich, setSelectedSandwich] = useState(null);
  const [selectedAccompagnement, setSelectedAccompagnement] = useState(null);
  const [selectedBoisson, setSelectedBoisson] = useState(null);

  const handleAddToCart = () => {
    if (selectedSandwich && selectedAccompagnement && selectedBoisson) {
      // Logique pour ajouter les choix sélectionnés au panier
      console.log('Sandwich :', selectedSandwich);
      console.log('Accompagnement :', selectedAccompagnement);
      console.log('Boisson :', selectedBoisson);
    } else {
      alert('Veuillez sélectionner un sandwich, un accompagnement et une boisson.');
    }
  };

  const handleCardClick = (type, value) => {
    switch (type) {
      case 'sandwich':
        setSelectedSandwich(value);
        break;
      case 'accompagnement':
        setSelectedAccompagnement(value);
        break;
      case 'boisson':
        setSelectedBoisson(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className=" w-full h-full flex flex-col mt-10 ">
      <div className="bg-mainColor h-72  flex  justify-center items-center gap-10 p-10">
        <div>
          <img
            src={Restaurant}
            alt="Restaurant"
            className=" object-cover w-full hidden md:block"
          />
        </div>
        <div className="flex flex-col justify-between item-center gap-10">
          <h4 className="text-white font-semibold text-3xl">
            Mc Donald's Saint Médard en Jalles
          </h4>
          <p className="text-white font-normal text-base -my-5 opacity-80">
            Fast food
          </p>
          <div className="flex items-center gap-7">
            <div className="flex-col md:border-r-2 pr-8">
              <p className="text-white">30 mins</p>
              <p className="text-white">Temps de livraison</p>
            </div>
            <div className="flex-col">
              <p className="text-white">€€</p>
              <p className="text-white">Tendance de prix</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-black relative h-full border-2">
        <div className=" section__padding section__margin flex flex-col md:flex-row justify-between w-full">
          <div className="border rounded-lg md:border-none mb-2 hidden lg:flex relative" style={{ padding: "0 30px 0 0" }}>
            <div className="flex flex-col justify-start ">
              <Link
                to={''}
                className=" text-base font-medium mb-2"
              >
                Recommendations
              </Link>
              <Link to={''} className=" text-base font-medium mb-2 ">
                Menu Best Of
              </Link>
              <Link to={''} className="active:text-secColor text-secColor text-base font-medium mb-2 ">
                Menu Mc First
              </Link>
              <Link to={''} className=" text-base font-medium mb-2 ">
                Happy Meal
              </Link>
              <Link to={''} className=" text-base font-medium mb-2 ">
                Desserts
              </Link>
            </div>
            <div className='hidden md:block absolute bg-gray-400 h-[400px] ' style={{ right: "0px", width: "1px" }}></div>
          </div>
          <div className="  border rounded-lg md:border-none mb-2 flex ">
            <div className="flex flex-col md:flex-row md:items-start justify-center md:justify-between gap-5 mx-10">
              <div className="flex-1">
                <h4 className=" font-medium text-xl">
                  Menu Mc First
                </h4>
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="flex-1">
                    <p className="font-medium text-base">5,90 €</p>
                    <p className="text-base font-normal text-lightGray md:w-3/4">
                      Délicieux, intemporel, le Menu Mc First™ jouit d'une popularité grandissante depuis sa création.
                      Son secret ? Une alliance parfaite entre ingrédients sélectionnés avec soin et recette à la saveur incomparable.
                      Le goûter, c'est l'adopter !
                    </p>
                  </div>
                  <div className="flex justify-center items-center ml-4 mt-4 md:mt-0">
                    <img src={restaurantpage} alt="Restaurant Page" className="w-full h-auto" />
                  </div>
                </div>

                {/* Cartes pour les choix */}
                <div className="mt-10">
                  <h3 className="font-medium text-lg">Choisissez votre sandwich</h3>
                  <div className="flex flex-wrap justify-between">
                    <div
                      className={`w-full md:w-1/3 p-2 rounded-lg shadow-md cursor-pointer ${selectedSandwich === 'boeuf' ? 'border-4 border-orange-400' : ''
                        }`}
                      onClick={() => handleCardClick('sandwich', 'boeuf')}
                    >
                      <div className="bg-white p-4">
                        <img src={beefSandwichImage} alt="Sandwich Bœuf" className="w-full h-40 object-cover rounded-t-lg" />
                        <h4 className="font-medium text-base mt-2 text-center">Sandwich Bœuf</h4>
                      </div>
                    </div>
                    <div
                      className={`w-full md:w-1/3 p-2 rounded-lg shadow-md cursor-pointer ${selectedSandwich === 'poulet' ? 'border-4 border-orange-400' : ''
                        }`}
                      onClick={() => handleCardClick('sandwich', 'poulet')}
                    >
                      <div className="bg-white p-4">
                        <img src={chickenSandwichImage} alt="Sandwich Poulet" className="w-full h-40 object-cover rounded-t-lg" />
                        <h4 className="font-medium text-base mt-2 text-center">Sandwich Poulet</h4>
                      </div>
                    </div>
                    <div
                      className={`w-full md:w-1/3 p-2 rounded-lg shadow-md cursor-pointer ${selectedSandwich === 'poisson' ? 'border-4 border-orange-400' : ''
                        }`}
                      onClick={() => handleCardClick('sandwich', 'poisson')}
                    >
                      <div className="bg-white p-4">
                        <img src={fishSandwichImage} alt="Sandwich Poisson" className="w-full h-40 object-cover rounded-t-lg" />
                        <h4 className="font-medium text-base mt-2 text-center">Sandwich Poisson</h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="font-medium text-lg">Choisissez votre accompagnement</h3>
                  <div className="flex flex-wrap justify-between">
                    <div
                      className={`w-full md:w-1/3 p-2 rounded-lg shadow-md cursor-pointer ${selectedAccompagnement === 'frites' ? 'border-4 border-orange-400' : ''
                        }`}
                      onClick={() => handleCardClick('accompagnement', 'frites')}
                    >
                      <div className="bg-white p-4">
                        <img src={friesImage} alt="Moyenne Frites" className="w-full h-40 object-cover rounded-t-lg" />
                        <h4 className="font-medium text-base mt-2 text-center">Moyenne Frites</h4>
                      </div>
                    </div>
                    <div
                      className={`w-full md:w-1/3 p-2 rounded-lg shadow-md cursor-pointer ${selectedAccompagnement === 'potatoes' ? 'border-4 border-orange-400' : ''
                        }`}
                      onClick={() => handleCardClick('accompagnement', 'potatoes')}
                    >
                      <div className="bg-white p-4">
                        <img src={potatoesImage} alt="Moyenne Potatoes" className="w-full h-40 object-cover rounded-t-lg" />
                        <h4 className="font-medium text-base mt-2 text-center">Moyenne Potatoes</h4>
                      </div>
                    </div>
                    <div
                      className={`w-full md:w-1/3 p-2 rounded-lg shadow-md cursor-pointer ${selectedAccompagnement === 'salade' ? 'border-4 border-orange-400' : ''
                        }`}
                      onClick={() => handleCardClick('accompagnement', 'salade')}
                    >
                      <div className="bg-white p-4">
                        <img src={saladImage} alt="Petite Salade" className="w-full h-40 object-cover rounded-t-lg" />
                        <h4 className="font-medium text-base mt-2 text-center">Petite Salade</h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="font-medium text-lg">Choisissez votre boisson</h3>
                  <div className="flex flex-wrap justify-between">
                    <div
                      className={`w-full md:w-1/3 p-2 rounded-lg shadow-md cursor-pointer ${selectedBoisson === 'coca' ? 'border-4 border-orange-400' : ''
                        }`}
                      onClick={() => handleCardClick('boisson', 'coca')}
                    >
                      <div className="bg-white p-4">
                        <img src={cocaImage} alt="Coca" className="w-full h-40 object-cover rounded-t-lg" />
                        <h4 className="font-medium text-base mt-2 text-center">Coca</h4>
                      </div>
                    </div>
                    <div
                      className={`w-full md:w-1/3 p-2 rounded-lg shadow-md cursor-pointer ${selectedBoisson === 'fanta' ? 'border-4 border-orange-400' : ''
                        }`}
                      onClick={() => handleCardClick('boisson', 'fanta')}
                    >
                      <div className="bg-white p-4">
                        <img src={fantaImage} alt="Fanta" className="w-full h-40 object-cover rounded-t-lg" />
                        <h4 className="font-medium text-base mt-2 text-center">Fanta</h4>
                      </div>
                    </div>
                    <div
                      className={`w-full md:w-1/3 p-2 rounded-lg shadow-md cursor-pointer ${selectedBoisson === 'icetea' ? 'border-4 border-orange-400' : ''
                        }`}
                      onClick={() => handleCardClick('boisson', 'icetea')}
                    >
                      <div className="bg-white p-4">
                        <img src={iceTeaImage} alt="Ice Tea" className="w-full h-40 object-cover rounded-t-lg" />
                        <h4 className="font-medium text-base mt-2 text-center">Ice Tea</h4>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`bg-secColor text-white py-2 mt-10 rounded-md w-full transition-all ease-in-out hover:bg-mainColor ${!(selectedSandwich && selectedAccompagnement && selectedBoisson) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  disabled={!(selectedSandwich && selectedAccompagnement && selectedBoisson)}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;