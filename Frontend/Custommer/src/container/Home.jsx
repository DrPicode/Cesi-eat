import React from 'react';
import Intro from '../components/Intro';
import FoodCategories from '../components/FoodCategories';
import RestaurantCard from '../components/RestaurantCard';

const Home = () => {
  return (
    <div>
      <Intro />
      <FoodCategories />
      <RestaurantCard />
    </div>
  );
};

export default Home;
