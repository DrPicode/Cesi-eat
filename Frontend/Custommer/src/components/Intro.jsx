import React from 'react';
import shape1 from '../assets/Union.png';
import shape2 from '../assets/shape.png';
import img1 from '../assets/rectangle1.png';

const Intro = () => {

  return (
    <div className="relative section__padding w-full h-full">
      <div className="hidden lg:block absolute top-40 -left-64">
        <img src={shape1} alt="" />
      </div>
      <div className="hidden lg:block absolute top-40 -right-40">
        <img src={shape2} alt="" />
      </div>
      <div className="flex flex-col lg:flex-row" style={{ marginLeft: "150px" }}>
        <div className="flex-1 mr-10">
          <div className="flex flex-col justify-center lg:leading-snug	 font-medium text-3xl lg:text-6xl">
            <h5 className="">
              Le restaurant <span className="text-secColor">chez vous. </span> Service de
            </h5>
            <h5 className="text-secColor"> livraison a domicile. </h5>
          </div>
          <div className="h-10"></div>
          <div className="flex flex-col justify-center">
            <p className="text-base font-normal text-lightGray lg:w-[700px] ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="flex-1">
          <img src={img1} alt="" width={300} />
        </div>
      </div>
    </div>
  );
};

export default Intro;
