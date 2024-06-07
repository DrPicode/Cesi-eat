import React from 'react'
import FoodCard from './FoodCard';
import { personalized } from '../data'

const RestaurantCard = () => {
  return (
    <div className="section__margin section__padding flex flex-col gap-10 w-full" style={{ padding: "0 150px" }} >
      <p className='font-semibold'>Restaurants disponibles</p>
      <FoodCard className="" data={personalized} />
    </div>
  );
}

export default RestaurantCard;