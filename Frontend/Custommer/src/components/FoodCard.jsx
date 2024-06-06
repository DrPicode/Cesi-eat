import React from 'react';
import { Link } from 'react-router-dom';

const FoodCard = ({ data }) => {
  console.log(data);
  return (
    <div className="flex sm:flex-col lg:flex-row flex-wrap gap-12 justify-between ">
      {data?.map((item, i) => (
        <Link to="/restaurantPage" key={i}>
          <div className="flex flex-col p-2 md:p-3 rounded-lg bg-lightGray hover:bg-gray-200 transition-all ease-in-out">
            <img
              src={item.img}
              alt={item.title}
              className=" w-full h-60 rounded-lg object-contain md:m-9 lg:m-0"
            />
            <h3 className="font-medium text-lg md:text-xl md:w-60 mt-5 ">
              {item.title}
            </h3>
            <p className="font-medium">{item.place}</p>
            <div className="mt-2">
              <div className="flex justify-between items-center my-2 md:my-5">
                <p className="text-gray-400 text-base w-36 md:w-64 lg:w-full">
                  {item.category}
                </p>
                {/*  */}
              </div>
              <div className="flex justify-between items-center ">
                <div className="flex items-center gap-1">
                  {/*  */}
                  {item.distance.map((x) => (
                    <>
                      <x.icon className="w-5 h-5 opacity-75 fill-secColor" />
                      <p className="text-xs md:text-base font-medium">
                        {x.time}
                      </p>
                    </>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {/*  */}
                  {item?.amount ? (
                    item?.amount?.map((x) => (
                      <>
                        <x.icon className="w-5 h-5 opacity-75 fill-secColor" />
                        <p className="text-xs md:text-base font-medium">
                          {x.people}
                        </p>
                      </>
                    ))
                  ) : (
                    <>
                      {/*  */}
                      {item?.price?.map((x) => (
                        <>
                          <x.icon className="w-5 h-5 opacity-75 fill-secColor stroke-secColor" />
                          <p className=" text-xs md:text-base font-medium">
                            {x.cash}
                          </p>
                        </>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FoodCard;