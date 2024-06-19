import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';

const RestaurantCard = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/restaurants');
        if (response.ok) {
          const data = await response.json();
          setRestaurants(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000); // Actualiser les données toutes les 15 secondes

    return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage du composant
  }, []);

  return (
    <div className="section__margin section__padding flex flex-col gap-10 w-full" style={{ padding: "0 150px" }}>
      <p className='font-semibold'>Restaurants disponibles</p>
      <FoodCard className="" data={restaurants} />
    </div>
  );
};

export default RestaurantCard;
