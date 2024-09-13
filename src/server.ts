import express, { Request, Response } from 'express';
import { discoveryHandler } from './router';
import Database from './db/database';

export const pool = new Database();

function main() {
    const app = express();

    app.use(express.json());

    if (!pool) {
        console.error("Database connection failed");
        process.exit(1);
    }

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