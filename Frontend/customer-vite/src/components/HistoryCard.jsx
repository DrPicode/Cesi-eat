import React, { useEffect, useState } from 'react';
import { authProxy } from '../proxy/auth.proxy.js';

const OrderHistory = ({ userId }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const headers = new Headers();
                headers.set('Authorization', `Bearer ${authProxy.token}`);
                const response = await fetch(`/api/orders/user/${userId}`, {
                    headers,
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrders(data.sort((a, b) => b.id_order - a.id_order));
                } else {
                    alert('Erreur lors de la récupération des commandes');
                }
            } catch (error) {
                console.error('Erreur :', error);
            }
        };

        fetchOrders(); // Appeler fetchOrders au montage initial

        const interval = setInterval(fetchOrders, 15000);

        return () => clearInterval(interval);
    }, []);

    const statusFrench = {
        'Paid': 'Payé',
        'Preparing': 'En préparation',
        'Done': 'En attente du livreur',
        'Delivering': 'En cours de livraison',
        'Delivered': 'Livré',
        'Cancelled': 'Annulé'
    }

    return (
        <div>
            <h3 className="font-semibold text-2xl flex items-center gap-2">Historique des commandes</h3>
            {orders.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
                            <h4 className="text-lg font-bold">Commande #{order.id_order}</h4>
                            <p className="text-gray-600">Coût total: {order.price} €</p>
                            <p className="text-gray-600">Date: {new Date(order.delivery_hour).toLocaleDateString()}</p>
                            <p className={`text-${order.status === 'Paid' ? 'green' : order.status === 'Preparing' || order.status === 'Done' || order.status === 'Delivering' ? 'yellow' : 'red'}-600`}>
                                Statut: {statusFrench[order.status]}
                            </p>
                            <h5 className="text-md font-semibold mt-2">Articles achetés:</h5>
                            <ul className="list-disc list-inside">
                                {order.cart.articles.map((item) => (
                                    <li key={item.id}>
                                        {item.article.name} x {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Aucune commande trouvée.</p>
            )}
        </div>
    );
};

export default OrderHistory;