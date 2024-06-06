import express  from "express";

import { deleteUser, getAllUsers, updateUser } from "../controllers/user";
import { isAuthentificated, isOwner } from '../middlewares/index';

export default (router : express.Router) => {
    router.get('/user', isAuthentificated, getAllUsers);
    router.delete('/user/:id', isAuthentificated, isOwner, deleteUser);
    router.patch('/user/:id', isAuthentificated, isOwner, updateUser);
};