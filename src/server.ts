import express, { Request, Response } from 'express';
import { distanceHandler } from './router';

const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    res.send({
        message: "Squid Loyalty Technical Test",
    });
});

app.routes("/distance", distanceHandler);

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});