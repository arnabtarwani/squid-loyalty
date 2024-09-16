import express, { Request, Response } from 'express';
import { discoveryHandler } from './router';
import cors from 'cors';
import { pool } from './db/database';

// The main function that starts the server

const PORT = process.env.PORT || 4000;

async function main() {
    const app = express();

    app.use(express.json());

    app.use(cors({
        origin: "*",
        methods: ["GET"],
        ...cors
    }))

    console.log("Connecting to the database...");
    if (await pool.connect()) {
        // Initialise connection events for the pool
        pool.on('connect', () => {
            console.log('✅ Connected to the database');
        });

        pool.on('error', (err) => {
            console.error('Unexpected error on idle client', err);
            process.exit(-1);
        });
    }

    app.get("/", (_req: Request, res: Response) => {
        res.send({
            message: "Squid Loyalty Technical Test",
        });
    });

    app.get("/discovery", discoveryHandler);

    app.listen(PORT, () => {
        console.log("Server is running on port 4000");
    });
}

main().then(() => {
    console.log("Server started successfully");
}).catch((error) => {
    console.error("Error starting the server", error);
    process.exit(-1);
});
