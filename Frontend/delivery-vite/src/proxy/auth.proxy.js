import {proxy} from "valtio";

export const authProxyDelivery = proxy({
    token: "",
    userId: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",

});

