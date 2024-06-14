import express, { Request, Response } from 'express';

const router = express.Router();

router.get("/:file", (req: Request, res: Response) => {
    // Get file in content folder
    const file = req.params.file;
    res.sendFile(file, { root: 'Backend/content' });
});

export default router;