import express, { Request, Response } from 'express';
import { discoveryHandler } from './router';

function main() {
    const app = express();

    app.use(express.json());

    app.get("/", (_req: Request, res: Response) => {
        res.send({
            message: "Squid Loyalty Technical Test",
        });
    });

    app.get("/discovery", discoveryHandler);

    app.listen(4000, () => {
        console.log("Server is running on port 4000");
    });
}

main();