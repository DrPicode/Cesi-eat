import Express from "express";
import authentification from "./authentification";
import user from "./user";


const router = Express.Router();

export default (): Express.Router => {
    authentification(router);
    user(router);
    return router;
}