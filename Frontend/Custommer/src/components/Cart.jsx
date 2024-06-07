import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const Cart = () => {
  const location = useLocation(); // Obtenir l'emplacement actuel

  // counter
  const [counter, setCounter] = useState(1);

  //increase counter
  const increase = () => {
    setCounter((count) => count + 1);
  };

  //decrease counter
  const decrease = () => {
    if (counter >= 1) setCounter((count) => count - 1);
  };

  // counter

  const isCheckoutRoute = location.pathname.includes('checkout');
  const isConfirmationRoute = location.pathname.includes('confirmation');
  const isRestaurantRoute = location.pathname.includes('restaurantPage');

  return (
    <div className=" border p-2 rounded-lg md:border-none w-full font-medium" style={{ maxWidth: "550px" }}>
      <div className="flex justify-between px-10 items-center mb-5">
        <h5 className=" text-2xl">
          {isConfirmationRoute ? 'Votre commande N°123456789 ' : 'Panier'}
        </h5>
        <p className="text-base">1 article</p>
      </div>
      <div className="flex flex-col px-10 gap-5 mb-5">
        <p>
          De <span className=" text-secColor">Mc Donald's Saint Médard en Jalles</span>
        </p>
        <div className="flex justify-between items-center">
          <div>
            <h5>Menu McFirst</h5>
            <p className=" text-lightGray">
              Poulet
              Frite
              Coca
            </p> <p className="">5,90 €</p>
          </div>
          <div className="flex justify-between items-center">
            <button onClick={decrease}>
              <AiOutlineMinus />
            </button>
            <p className="m-1">{counter}</p>
            <button onClick={increase}>
              <AiOutlinePlus />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between font-normal items-center text-lightGray px-10">
        <p>Sous total</p>
        <p>5,90 €</p>
      </div>
      <div className="flex justify-between font-normal items-center text-lightGray px-10">
        <p>Frais de livraison</p>
        <p>2,00 €</p>
      </div>
      <div className="flex justify-between font-normal items-center text-lightGray px-10">
        <p>Frais de service</p>
        <p>1,00 €</p>
      </div>
      <div className="flex justify-between items-center text-2xl px-10 mt-7">
        <p>{isConfirmationRoute ? 'Total payé' : 'Total'}</p>
        <p>8,90 €</p>
      </div>

      {isRestaurantRoute && !isConfirmationRoute && (
        <Link to="/checkout">
          <Button
            class={
              counter === 0
                ? 'bg-secColor w-full py-3 mt-5 text-white text-2xl transition-all ease-in-out cursor-not-allowed'
                : 'bg-secColor w-full py-3 mt-5 text-white text-2xl transition-all ease-in-out hover:bg-mainColor'
            }
            text={'Valider le panier'}
          />
        </Link>
      )}

      {isCheckoutRoute && !isConfirmationRoute && (
        <>
          <Link to="/confirmation">
            <Button
              class={
                counter === 0
                  ? 'bg-secColor w-full py-3 mt-5 text-white text-2xl transition-all ease-in-out cursor-not-allowed'
                  : 'bg-secColor w-full py-3 mt-5 text-white text-2xl transition-all ease-in-out hover:bg-mainColor'
              }
              text={'Procéder au paiement'}
            />
          </Link>
          <Link to="/restaurantPage">
            <Button
              class="bg-gray-300 w-full py-3 mt-5 text-black text-2xl transition-all ease-in-out hover:bg-gray-400"
              text={'Retour'}
            />
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;