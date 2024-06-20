import React, { useEffect, useState } from 'react';
import Cart from '../components/Cart';
import restaurantpage from '../assets/mcfirst.jpg';
import { Link, useParams } from 'react-router-dom';

const RestaurantPage = () => {
  const [selectedSandwich, setSelectedSandwich] = useState(null);
  const [selectedSideFood, setSelectedSideFood] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [restaurant, setRestaurant] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/restaurants/${id}`);
        if (response.ok) {
          const data = await response.json();
          setRestaurant(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000);

    return () => clearInterval(interval);
  }, [id]);

  const handleCardClick = (type, value) => {
    switch (type) {
      case 'sandwich':
        setSelectedSandwich(value);
        break;
      case 'SideFood':
        setSelectedSideFood(value);
        break;
      case 'Drink':
        setSelectedDrink(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {restaurant && restaurant.articles ? (
        <div className=" w-full h-full flex flex-col mt-10 ">
          <div className="bg-mainColor h-72  flex  justify-center items-center gap-10 p-10">
            <div>
              <img
                src={restaurant.thumbnail}
                alt="Restaurant"
                className=" object-cover w-full hidden md:block"
              />
            </div>
            <div className="flex flex-col justify-between item-center gap-10">
              <h4 className="text-white font-semibold text-3xl">
                {`${restaurant.name} ${restaurant?.address?.city || ""}`}
              </h4>
              <p className="text-white font-normal text-base -my-5 opacity-80">
                {restaurant.type}
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
              <div className="border rounded-lg md:border-none mb-2 hidden lg:flex relative"
                style={{ padding: "0 30px 0 0" }}>
                <div className="flex flex-col justify-start ">
                  <Link to={''} className="active:text-secColor text-secColor text-base font-medium mb-2 ">
                    Menu Mc First
                  </Link>
                  <Link
                    to={''}
                    className=" text-white font-medium mb-2"
                  >
                    Recommendations
                  </Link>
                </div>
                <div className='hidden md:block absolute bg-gray-400 h-[400px] '
                  style={{ right: "0px", width: "1px" }}></div>
              </div>
              <div className="  border rounded-lg md:border-none mb-2 flex ">
                <div
                  className="flex flex-col md:flex-row md:items-start justify-center md:justify-between gap-5 mx-10">
                  <div className="flex-1">
                    <h4 className=" font-medium text-xl">
                      Menu Mc First
                    </h4>
                    <div className="flex flex-col md:flex-row items-center md:items-start">
                      <div className="flex-1">
                        <p className="font-medium text-base py-1">5,90 €</p>
                        <p className="text-base font-normal text-lightGray py-1">
                          Délicieux, intemporel, le Menu Mc First™ jouit d'une popularité grandissante depuis sa
                          création.
                          Son secret ? Une alliance parfaite entre ingrédients sélectionnés avec soin et recette à
                          la saveur incomparable.
                          Le goûter, c'est l'adopter !
                        </p>
                      </div>
                      <div className="flex justify-center items-center ml-4 mt-4 md:mt-0">
                        <img src={restaurantpage} alt="Restaurant Page" className="w-full h-auto" />
                      </div>
                    </div>

                    {/* Cartes pour les choix */}
                    <div className="mt-5">
                      <h3 className="font-medium text-lg py-2">Choisissez votre sandwich</h3>
                      <div className="flex flex-wrap justify-between">

                        {restaurant?.articles && restaurant.articles.filter(x => x.type === 'MainCourse' && !x.is_deleted).map((item, i) => (
                          <div
                            key={i}
                            className={`w-full md:w-1/3 p-2 rounded-lg shadow-md cursor-pointer ${selectedSandwich === item.id_article ? 'border-4 border-orange-400' : ''
                              }`}
                            onClick={() => handleCardClick('sandwich', item.id_article)}
                          >
                            <div className="bg-white p-4">
                              <img src={item.thumbnail} alt={item.name}
                                className="w-full h-40 object-cover rounded-t-lg" />
                              <h4 className="font-medium text-base mt-2 text-center">{item.name}</h4>
                              <h4 className="font-medium text-base mt-2 text-center">{item.price} €</h4>

                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5">
                      <h3 className="font-medium text-lg py-2">Choisissez votre accompagnement</h3>
                      <div className="flex flex-wrap justify-between">
                        {restaurant?.articles && restaurant.articles.filter(x => x.type === 'SideDish' && !x.is_deleted).map((item, i) => (
                          <div
                            key={i}
                            className={`w-full md:w-1/3 p-2 rounded-lg shadow-md cursor-pointer ${selectedSideFood === item.id_article ? 'border-4 border-orange-400' : ''
                              }`}
                            onClick={() => handleCardClick('SideFood', item.id_article)}
                          >
                            <div className="bg-white p-4">
                              <img src={item.thumbnail} alt={item.name}
                                className="w-full h-40 object-cover rounded-t-lg" />
                              <h4 className="font-medium text-base mt-2 text-center">{item.name}</h4>
                              <h4 className="font-medium text-base mt-2 text-center">{item.price} €</h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5">
                      <h3 className="font-medium text-lg py-2">Choisissez votre boisson</h3>
                      <div className="flex flex-wrap justify-between">
                        {restaurant?.articles && restaurant.articles.filter(x => x.type === 'Drink' && !x.is_deleted).map((item, i) => (
                          <div
                            key={i}
                            className={`w-full md:w-1/3 p-2 rounded-lg shadow-md cursor-pointer ${selectedDrink === item.id_article ? 'border-4 border-orange-400' : ''
                              }`}
                            onClick={() => handleCardClick('Drink', item.id_article)}
                          >
                            <div className="bg-white p-4">
                              <img src={item.thumbnail} alt={item.name}
                                className="w-full h-40 object-cover rounded-t-lg" />
                              <h4 className="font-medium text-base mt-2 text-center">{item.name}</h4>
                              <h4 className="font-medium text-base mt-2 text-center">{item.price} €</h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Cart
                selectedSandwich={selectedSandwich}
                selectedSideFood={selectedSideFood}
                selectedDrink={selectedDrink}
                articles={restaurant.articles}
                restaurant={restaurant}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>Chargement...</p>
        </div>
      )
      }
    </>
  );
};

export default RestaurantPage;