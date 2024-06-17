import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { round } from "lodash";
import { authProxy } from "../proxy/auth.proxy.js";


const CartCheckOut = (selectedAddress, currentDateTime) => {
    const [cart, setCart] = useState(null);
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`/api/carts/latest`, {
                    headers: {
                        'Authorization': `Bearer ${authProxy.token}`
                    }
                });
                const data = await response.json();
                setCart(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    if (!cart) {
        return <div>Loading...</div>;
    }

    const total = cart.articles.reduce((acc, article) => acc + article.article.price * article.quantity, 0);
    const deliveryFees = round(0.25 * total, 2);
    const serviceFees = 1.00;


    const getAddressId = async (selectedAddress) => {

        const response = await fetch(`/api/addresses/${selectedAddress.selectedAddress}`, {
            headers: {
                'Authorization': `Bearer ${authProxy.token}`
            }
        });
        console.log(selectedAddress.selectedAddress);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.id_address;
    };

    const createOrderHandler = async (selectedAddress) => {
        try {
            const isoDate = new Date(selectedAddress.currentDateTime).toISOString();
            const random4Digits = Math.floor(1000 + Math.random() * 9000);
            const response = await fetch(`/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authProxy.token}`
                },
                body: JSON.stringify({
                    cartId: cart.id_cart,
                    addressId: await getAddressId(selectedAddress),
                    deliveryDate: isoDate,
                    deliveryFees: deliveryFees,
                    serviceFees: serviceFees,
                    deliveryCode: random4Digits,
                    price: total

                })
            });

            if (response.status === 201) {
                console.log('Order created successfully');
            } else {
                console.error('Error creating order:', response);
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div className=" border p-2 rounded-lg md:border-none w-full font-medium" style={{maxWidth: "550px"}}>
            <div className="flex justify-between px-10 items-center mb-5">
                <h5 className=" text-2xl">
                    Panier
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
                <p>Total</p>
                <p>{total + deliveryFees + serviceFees} €</p>
            </div>
            <div className="h-5"></div>
            <div className="flex flex-col px-10 gap-5 mb-5">
                {selectedAddress && (
                    <p>
                        Adresse de livraison : <span className="text-secColor">{selectedAddress.selectedAddress}</span>
                    </p>
                )}
                {currentDateTime && (
                    <p>
                        Date de livraison : <span className="text-secColor">{selectedAddress.currentDateTime}</span>
                    </p>
                )}
            </div>
            <>
                <Link to="/confirmation">
                    <Button
                        class={'bg-secColor w-full py-3 mt-2 text-white text-xl transition-all ease-in-out hover:bg-mainColor'}
                        text={'Procéder au paiement'}
                        onClick={() => createOrderHandler(selectedAddress)}
                    />
                </Link>
            </>
        </div>
    );
};

export default CartCheckOut;