import { proxy } from "valtio";

export const authProxyRestaurant = proxy({
    token: "",
    userId: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
});
