import {proxy} from "valtio";

export const authProxy = proxy({
    token: "",
    userId: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",

});

