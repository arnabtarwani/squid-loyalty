import express, { Request, Response } from 'express';
import { discoveryHandler } from './router';
import cors from 'cors';
import { dbConnection } from './db/database';
import dotenv from 'dotenv';

dotenv.config();

// Initialise DB connection pool
export const pool = dbConnection({
    dbUser: process.env.DB_USER,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPass: process.env.DB_PASSWORD,
    dbPort: Number(process.env.DB_PORT)
});

// The main function that starts the server
async function main() {
    const PORT = process.env.PORT || 4000;
    const app = express();

    app.use(express.json());

    app.use(cors({
        origin: "*",
        methods: ["GET"],
        ...cors
    }))

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

main().then(async () => {

    if (await pool.connect()) {
        console.log("Database connected successfully");
    }

    console.log("Server started successfully");
}).catch((error) => {
    console.error("Error starting the server", error);
    process.exit(-1);
});
