import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Unauthorized.css';
import {authProxyDelivery} from "../proxy/auth.proxy.js";

const Unauthorized = () => {
    const navigate = useNavigate();

    const disconnect = () => {
        try {
            const headers = new Headers();
            headers.set("Authorization", `Bearer ${authProxyDelivery.token}`)
            fetch(`/api/auth/logout`, {
                method: "GET",
                headers
            }).then(async (response) => {
                if (response.ok) {
                    authProxyDelivery.token = null;
                    sessionStorage.removeItem("User");
                    navigate("/")
                } else {
                    alert("Not Authorized");
                    navigate("/")
                }
            });
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <div className="unauthorized">
            <h1>Unauthorized</h1>
            <p>You are not authorized to view this page.</p>
            <button onClick={disconnect}>Go to login</button>
        </div>
    );

}

export default Unauthorized;