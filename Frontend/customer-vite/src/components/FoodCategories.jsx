import React from 'react';
import { menu } from '../data';
const FoodCategories = () => {
  return (
    <div className="section__padding section__margin flex flex-col gap-5 lg:gap-8" style={{ padding: "0 150px" }}>
      <p className='font-semibold'>Qu'avez-vous en tête ?</p>
      <div className='flex justify-between'>
        {menu.map((item) => (
          <div className="flex flex-col items-center ">
            <img
              src={item.img}
              alt={item.title}
              className="w-20 h-20 md:w-40 md:h-40  object-contain"
            />
            <p className="font-medium text-xs md:text-base mt-2 py-5">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodCategories;
