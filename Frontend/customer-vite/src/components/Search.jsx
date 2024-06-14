import React from 'react';
import { TbArrowsCross } from 'react-icons/tb';
import Button from './Button';

const Search = () => {
  return (
    <div className="w-full h-52 bg-secColor section__margin p-1">
      <div className="w-full py-20 flex items-center justify-center gap-1 md:gap-3 ">
        <p className="text-white md:font-semibold text-sm md:text-xl ">
          Search by Restaurant
        </p>
        <TbArrowsCross className="fill-white stroke-white text-white w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher un restaurant"
          className="lg:w-[774px] bg-transparent placeholder:text-white placeholder:opacity-50 px-4 py-2 border border-white rounded-lg placeholder:text-sm"
        />

        <Button
          class={
            'bg-mainColor text-white md:px-4 px-4 py-2 text-sm hover:bg-slate-500 transition-all ease-in-out'
          }
          text={'Rechercher'}
        />
      </div>
    </div>
  );
};

export default Search;
