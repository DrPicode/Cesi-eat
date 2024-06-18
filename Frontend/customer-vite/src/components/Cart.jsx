import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from './Button';
import {round} from "lodash";
import {authProxy} from "../proxy/auth.proxy.js";

const Cart = ({ selectedSandwich, selectedSideFood, selectedDrink, articles, restaurant }) => {
    const navigate = useNavigate();
  const total = selectedSandwich && selectedSideFood && selectedDrink ? round(articles.find(item => item.id_article === selectedSandwich).price + articles.find(item => item.id_article === selectedSideFood).price + articles.find(item => item.id_article === selectedDrink).price,2) : 0;

  const deliveryFees = round(0.25 * total, 2);
  const serviceFees = 1.00;


  const submitCart = async () => {
      console.log("submit");
      console.log(authProxy);
      if (authProxy.token) {
          await fetch("/api/carts", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${authProxy.token}`,
              },
              body: JSON.stringify({
                  selectedSandwich: selectedSandwich,
                  selectedSideFood: selectedSideFood,
                  selectedDrink: selectedDrink,
              }),
          });
          navigate("/checkout");
      }
    }

  return (
    <div className=" border p-2 rounded-lg md:border-none w-full font-medium" style={{ maxWidth: "550px" }}>
      <div className="flex justify-between px-10 items-center mb-5">
        <h5 className=" text-2xl">
            Panier
        </h5>
      </div>
      <div className="flex flex-col px-10 gap-5 mb-5">
        <p>
          De <span className=" text-secColor">{`${restaurant.name} ${restaurant?.address?.city || ""}`}</span>
        </p>
        <div className="flex justify-between items-center">
          <div>
            <h5>Menu McFirst</h5>
            <p className=" text-lightGray">
              {selectedSandwich ? articles.filter(x => x.id_article === selectedSandwich)[0].name : ''}<br />
              {selectedSideFood ? articles.filter(x => x.id_article === selectedSideFood)[0].name : ''}<br />
              {selectedDrink ? articles.filter(x => x.id_article === selectedDrink)[0].name : ''}
            </p> <p className="">{total} €</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between font-normal items-center text-lightGray px-10">
        <p>Sous total</p>
        <p>{total} €</p>
      </div>
      <div className="flex justify-between font-normal items-center text-lightGray px-10">
        <p>Frais de livraison</p>
        <p>{deliveryFees} €</p>
      </div>
      <div className="flex justify-between font-normal items-center text-lightGray px-10">
        <p>Frais de service</p>
        <p>{serviceFees} €</p>
      </div>
      <div className="flex justify-between items-center text-2xl px-10 mt-7">
        <p>Total</p>
        <p>{total + deliveryFees + serviceFees} €</p>
      </div>
      <div className="h-5"></div>
        <Button
            class={'bg-secColor w-full py-3 mt-2 text-white text-xl transition-all ease-in-out hover:bg-mainColor'}
            text={'Valider le panier'}
            onClick={() => submitCart()}
        />
    </div>
  );
};

export default Cart;