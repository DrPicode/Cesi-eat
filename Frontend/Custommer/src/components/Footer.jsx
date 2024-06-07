import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className=" section__padding bg-secondaryColor h-64 flex flex-col items-center justify-center">
      <div className="flex flex-col md:flex-row w-full justify-between items-center">
        <div>
          <Link className="flex items-center md:gap-2" to="/">
            <p className="font-bold text-xl md:text-2xl text-white">CESI Eats</p>
          </Link>
        </div>
        <div className="flex gap-3 lg:gap-14  font-medium text-sm lg:text-base">
          <p className="text-white">A propos de nous</p>
          <p className="text-white">Aide et support</p>
          <p className="text-white">Mentions légales</p>
        </div>
        <div>
          <p className="font-medium text-base text-white">
            Contact: +33 123456789
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-5 mt-5">
        <Link to="" className="cursor-pointer">
          <FiFacebook className="  stroke-white w-6 h-6 " />
        </Link>
        <Link to="" className="cursor-pointer">
          <FiTwitter className="  stroke-white w-6 h-6 " />
        </Link>
        <Link to="" className="cursor-pointer">
          <FiInstagram className="  stroke-white w-6 h-6 " />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
