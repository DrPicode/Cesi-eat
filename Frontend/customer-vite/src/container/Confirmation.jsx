import React, { useEffect, useState } from 'react';
import { MdPlace } from 'react-icons/md';
import CartConfirmation from "../components/CartConfirmation.jsx";

const Confirmation = () => {

  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch('api/orders/latest')
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur de requête');
          }
          return response.json();
        })
        .then(data => setOrder(data))
        .catch(error => console.error('Erreur :', error));
  }, []);

  return (
      <div className="w-full h-full section__padding ">
        <h2 className="font-semibold text-2xl w-full border-b-2 pb-2 mb-10">
          Votre paiement a été confirmé
        </h2>
        {order && (
            <div className="w-full h-full flex flex-col lg:flex-row justify-between ">
              <div className="w-3/4 h-full mb-2">
                {/* adresse */}
                <div className="flex flex-col">
                  <div className=" font-semibold text-2xl flex items-center gap-2">
                    <MdPlace className="fill-secColor w-6 h-10" />
                    <h3>Adresse de livraison sélectionnée</h3>
                  </div>
                  <div className='mt-8'></div>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div
                        className={'flex flex-col bg-secColor py-2 px-4 lg:py-4 lg:px-8 rounded-lg'}
                    >
                      <MdPlace
                          className={'fill-white w-6 h-8'}
                      />
                      <p className={'text-white w-72'}>
                        {order.address.address}
                      </p>
                    </div>
                  </div>
                </div>
                {/* order */}

                <div className="mt-8 ">
                  <div className=" font-semibold text-2xl flex  items-center gap-2 mb-10">
                    <MdPlace className="fill-secColor w-6 h-8"/>
                    <h3>Statut de livraison</h3>
                  </div>
                  <div className="flex flex-col items-center w-full">
                    <div className="flex items-center gap-4 mb-2 w-full">
                      <div
                          className={`flex-1 h-1 rounded ${
                              order.status === 'Paid' || order.status === 'Preparing' || order.status === 'Delivering' || order.status === 'Delivered'
                                  ? 'bg-orange-500'
                                  : 'bg-secColor'
                          }`}
                      ></div>
                      <div
                          className={`flex-1 h-1 rounded ${
                              order.status === 'Preparing' || order.status === 'Delivering' || order.status === 'Delivered'
                                  ? 'bg-orange-500'
                                  : 'bg-gray-400'
                          }`}
                      ></div>
                      <div
                          className={`flex-1 h-1 rounded ${
                              order.status === 'Delivering' || order.status === 'Delivered' ? 'bg-orange-500' : 'bg-gray-400'
                          }`}
                      ></div>
                      <div
                          className={`flex-1 h-1 rounded ${order.status === 'Delivered' ? 'bg-orange-500' : 'bg-gray-400'}`}></div>
                    </div>
                    <div className="flex justify-between w-full text-sm">
                      <div className="flex-1 text-center">Payée</div>
                      <div className="flex-1 text-center">En préparation</div>
                      <div className="flex-1 text-center">En cours de livraison</div>
                      <div className="flex-1 text-center">Livrée</div>
                    </div>
                  </div>
                </div>
                <div className='mt-10'></div>
                <div className=" font-semibold text-2xl flex  items-center gap-2 mb-10">
                  <MdPlace className="fill-secColor w-6 h-8"/>
                  <h3>Code de livraison :</h3>
                </div>
                <div className="text-black text-2xl font-semibold px-8"> {order.delivery_code} </div>

              </div>
              {/* <Cart /> */}
              {order && (
                  <CartConfirmation
                      cart={order.cart}
                      deliveryFees={order.delivery_fees}
                      serviceFees={order.service_fees}
                  />
              )}
            </div>
        )}
      </div>
  );
};

export default Confirmation;