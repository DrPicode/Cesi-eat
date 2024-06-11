import React from 'react';
import { Link } from 'react-router-dom';

const HistoryCard = ({ data }) => {
    console.log(data);
    return (
        <div className="flex flex-col gap-6">
            {data?.map((item, i) => (
                <Link to="/restaurantPage" key={i}>
                    <div className="flex flex-row p-2 md:p-3 rounded-lg bg-lightGray hover:bg-gray-200 transition-all ease-in-out">
                        <div className="w-1/3">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-40 rounded-lg object-cover"
                            />
                        </div>
                        <div className="w-1/2 px-4 flex flex-col justify-center">
                            <h3 className="font-medium text-lg md:text-xl">{item.title}</h3>
                            <p className="font-medium">{item.place}</p>
                            <p className="text-gray-400 text-base">{item.category}</p>
                        </div>
                        <div className="w-1/4 flex items-center justify-end">
                            {item.delivered ? (
                                <div className="flex items-center gap-1">
                                    <p className="text-xs md:text-base font-medium">Livrée</p>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1">
                                    <p className="text-xs md:text-base font-medium">Non livrée</p>
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default HistoryCard;
