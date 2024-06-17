import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import {round} from "lodash";
import {authProxy} from "../proxy/auth.proxy.js";

const CartConfirmation = ({cart, deliveryFees, serviceFees}) => {
    const articles = cart.articles;
    const total = articles.reduce((acc, article) => acc + article.article.price * article.quantity, 0);

  return (
      <div className=" border p-2 rounded-lg md:border-none w-full font-medium" style={{maxWidth: "550px"}}>
          <div className="flex justify-between px-10 items-center mb-5">
              <h5 className=" text-2xl">
                  Votre commande N°{cart.id_order}
              </h5>
          </div>
          <div className="flex flex-col px-10 gap-5 mb-5">
              <p>
                  De <span className=" text-secColor">Mc Donald's Saint Médard en Jalles</span>
              </p>
              <div className="flex flex-col gap-2">
                  {cart.articles.map((article) => (
                      <div key={article.articleId} className="flex justify-between items-center">
                          <div>
                              <h5>{article.article.name}</h5>
                          </div>
                          <p className="">{article.article.price} €</p>
                      </div>
                  ))}
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
              <p>Total payé : </p>
              <p>{total + deliveryFees + serviceFees} €</p>
          </div>
          <div className="h-5"></div>
          <Button
              class={'bg-secColor w-full py-3 mt-2 text-white text-xl transition-all ease-in-out hover:bg-mainColor'}
              text={'Retour Accueil'}
          />
      </div>
  );
};

export default CartConfirmation;