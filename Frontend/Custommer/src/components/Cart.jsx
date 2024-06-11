import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';

const Cart = ({ selectedSandwich, selectedAccompagnement, selectedBoisson }) => {
  const location = useLocation(); // Obtain actual location

  const isCheckoutRoute = location.pathname.includes('checkout');
  const isConfirmationRoute = location.pathname.includes('confirmation');
  const isRestaurantRoute = location.pathname.includes('restaurantPage');

  const submit = async () => {
    //TODO: Check values with regex
    await fetch("http://localhost:8080/order/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          selectedSandwich,
          selectedAccompagnement,
          selectedBoisson
        })
    }).then(r =>r.text()).then(r => console.log(r)).catch(e => console.error(e));
}

  return (
    <div className=" border p-2 rounded-lg md:border-none w-full font-medium" style={{ maxWidth: "550px" }}>
      <div className="flex justify-between px-10 items-center mb-5">
        <h5 className=" text-2xl">
          {isConfirmationRoute ? 'Votre commande N°123456789 ' : 'Panier'}
        </h5>
      </div>
      <div className="flex flex-col px-10 gap-5 mb-5">
        <p>
          De <span className=" text-secColor">Mc Donald's Saint Médard en Jalles</span>
        </p>
        <div className="flex justify-between items-center">
          <div>
            <h5>Menu McFirst</h5>
            <p className=" text-lightGray">
              {selectedSandwich ? selectedSandwich.charAt(0).toUpperCase() + selectedSandwich.slice(1) : ''}<br />
              {selectedAccompagnement ? selectedAccompagnement.charAt(0).toUpperCase() + selectedAccompagnement.slice(1) : ''}<br />
              {selectedBoisson ? selectedBoisson.charAt(0).toUpperCase() + selectedBoisson.slice(1) : ''}
            </p> <p className="">5,90 €</p>
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
      <div className="h-5"></div>

      {isRestaurantRoute && !isConfirmationRoute && (
        <Link to="/checkout">
          <Button
            class={'bg-secColor w-full py-3 mt-2 text-white text-xl transition-all ease-in-out hover:bg-mainColor'}
            text={'Valider le panier'}
          />
        </Link>
      )}

      {isCheckoutRoute && !isConfirmationRoute && (
        <>
          <Link to="/confirmation">
            <Button
              onClick={() => submit()}
              class={'bg-secColor w-full py-3 mt-2 text-white text-xl transition-all ease-in-out hover:bg-mainColor'}
              text={'Procéder au paiement'}
            />
          </Link>
          <Link to="/restaurantPage">
            <Button
              class="bg-gray-300 w-full py-3 mt-2 text-black text-xl transition-all ease-in-out hover:bg-gray-400"
              text={'Retour'}
            />
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;