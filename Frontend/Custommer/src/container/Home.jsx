import React from 'react';
import Intro from '../components/Intro';
import Personalized from '../components/Personalized';
import Recommend from '../components/Recommend';

const Home = () => {
  return (
    <div>
      <Intro />
      <Recommend />
      <Personalized />
    </div>
  );
};

export default Home;
