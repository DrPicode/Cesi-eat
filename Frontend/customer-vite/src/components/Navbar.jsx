import React from 'react';
import logo from '../assets/logo.png';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { useSnapshot } from "valtio";
import { authProxy } from "../proxy/auth.proxy.js";

const Navbar = () => {
  const navigate = useNavigate();
  const disconnect = () => {

    try {
      const headers = new Headers();
      headers.set("Authorization", `Bearer ${authProxy.token}`)
      fetch(`/api/auth/logout`, {
        method: "GET",
        headers
      }).then(async (response) => {
        if (response.ok) {
          authProxy.token = null;
          localStorage.removeItem("User");
          navigate("/")
        } else {
          alert("Not Authorized");
          navigate("/login")
        }
      });
    } catch (e) {
      console.error(e)
    }
  };

  const authSnap = useSnapshot(authProxy);
  return (
    <div className="section__padding flex gap-1 justify-between items-center w-full h-16 ">
      <div>
        <Link className="flex items-center md:gap-2" to="/">
          <img src={logo} alt="logo" className="w-10 h-10 object-contain " />
          <p className="font-bold text-xl md:text-2xl">CESI Eats</p>
        </Link>
      </div>
      <div className=" flex justify-between gap-2 items-center">
        <div className="flex justify-between gap-3 items-center border border-gray-300 rounded-lg px-4 py-1">
          <input
            className="lg:w-[450px] font-medium text-xs md:text-base hidden md:block"
            type="text"
            placeholder="Rechercher un restaurant (Dev in progress)"
          />
          <CiSearch className="font-bold text-3xl text-gray-400 rotate-90 opacity-50" />
        </div>
        {authSnap.token && (
          <>
            <Link to={`/profile/${authSnap.userId}`}>
              <button
                className="bg-mainColor  text-white md:px-4 px-2 py-2 capitalize  hover:bg-secColor transition-all ease-in-out rounded-lg"
              >
                Profil
              </button>
            </Link>
            <button
              className="bg-mainColor  text-white md:px-4 px-2 py-2 capitalize  hover:bg-secColor transition-all ease-in-out rounded-lg"
              onClick={disconnect}
            >
              Déconnexion
            </button>
          </>
        )}
        {!authSnap.token && (
          <>
            <Link to="/login">
              <Button
                class={
                  ' bg-mainColor  text-white md:px-4 px-2 py-2 capitalize  hover:bg-secColor transition-all ease-in-out'
                }
                text={'Se connecter'}
              />
            </Link>
            <Link to="/register">
              <Button
                class={
                  ' bg-mainColor  text-white md:px-4 px-2 py-2 capitalize  hover:bg-secColor transition-all ease-in-out'
                }
                text={'Créer un compte'}
              />
            </Link>
          </>
        )}
      </div>
    </div >
  );
};

export default Navbar;
