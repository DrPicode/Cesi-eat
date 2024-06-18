import React, {useEffect, useState} from 'react'
import FoodCard from './FoodCard';

const RestaurantCard = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        fetch('/api/restaurants').then(async (response) => {
            if (response.ok) {
                console.log("Response", response)
                return await response.json();
            }
        }).then((data) => {
            setRestaurants(data);
        });
    }, []);

  return (
    <div className="section__margin section__padding flex flex-col gap-10 w-full" style={{ padding: "0 150px" }} >
      <p className='font-semibold'>Restaurants disponibles</p>
      <FoodCard className="" data={restaurants} />
    </div>
  );
}

export default RestaurantCard;