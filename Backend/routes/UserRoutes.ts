// routes/userRoutes.ts
import express, { Request, Response } from 'express';
import {prisma} from "../database/client";
import {validateToken} from "../utils/jwt";
import bcrypt from "bcrypt";

const router = express.Router();

// Get User by ID
router.get('/:id', async (req: Request, res: Response) => {
    // Check if token is valid
    if(!validateToken(req)) return res.status(401).send("Unauthorized");

    // Extract id
    const id = parseInt(req.params.id);
    if(!id) return res.status(400).send("No user id provided");

    // Ask DB for user info
    const user = await prisma.user.findUnique({
        where: {
            id_user: id
        }
    })

    // If user exist, delete password
    if (user){
        delete user.password;
        return res.status(200).json(user);
    } else{
        return res.status(404).json({
            error: "User not found"
        })
    }
})


// delete user by ID
router.delete('/:id', async (req: express.Request, res: express.Response) => {
    // Check if token is valid
    if(!validateToken(req)) return res.status(401).send("Unauthorized");

    // Extract id
    const id = parseInt(req.params.id);
    if(!id) return res.status(400).send("No user id provided");

    // Ask DB to delete user
    const user = await prisma.user.delete({
        where: {
            id_user: id
        }
    })

    // Return if user exist
    if (user){
        return res.status(200).json(user);
    } else{
        return res.status(404).json({
            error: "User not found"
        })
    }
})

// update user by ID
router.patch('/:id', async (req: Request, res: Response) => {
    // Check if token is valid
    if(!validateToken(req)) return res.status(401).send("Unauthorized");

    // Extract id
    const id = parseInt(req.params.id);
    if(!id) return res.status(400).send("No user id provided");

    // Extract data
    const data = req.body;
    if(!data) return res.status(400).send("No data provided");

    // Ask DB to update user
    const user = await prisma.user.update({
        where: {
            id_user: id
        },
        data: data
    })

    // Return if user exist
    if (user){
        return res.status(200).json(user);
    } else{
        return res.status(404).json({
            error: "User not found"
        })
    }
});

export default router;