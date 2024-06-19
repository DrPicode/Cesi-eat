import React from 'react';
import { useNavigate } from "react-router-dom";

const CartConfirmation = ({ cart, id_order, deliveryFees, serviceFees }) => {
    const articles = cart.articles;
    const total = articles.reduce((acc, article) => acc + article.article.price * article.quantity, 0);
    const navigate = useNavigate();

    return (
        <div className=" border p-2 rounded-lg md:border-none w-full font-medium" style={{ maxWidth: "550px" }}>
            <div className="flex justify-between px-10 items-center mb-5">
                <h5 className=" text-2xl">
                    Votre commande N°{id_order}
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
        </div>
    );
};

export default CartConfirmation;