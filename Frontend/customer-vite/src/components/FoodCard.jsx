import React from 'react';
import { Link } from 'react-router-dom';

const FoodCard = ({ data }) => {
  return (
    <div className="flex sm:flex-col lg:flex-row flex-wrap gap-12">
      {data?.map((item, i) => (
        <Link to={`/restaurant/${item.id_restaurant}`} key={i}>
          <div className="flex flex-col p-2 md:p-3 rounded-lg bg-lightGray hover:bg-gray-200 transition-all ease-in-out">
            <img
              src={item.thumbnail}
              alt={item.name}
              className=" w-full h-60 rounded-lg object-contain md:m-9 lg:m-0"
            />
            <h3 className="font-medium text-lg md:text-xl md:w-60 mt-5 ">
              {item.name}
            </h3>
            <div className="mt-2">
              <div className="flex justify-between items-center my-2 md:my-5">
                <p className="text-gray-400 text-base w-36 md:w-64 lg:w-full">
                  {item.type}
                </p>
                {/*  */}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FoodCard;