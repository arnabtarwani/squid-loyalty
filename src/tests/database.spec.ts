// test to check if the database is connected and the connection pool is created
import { dbConnection } from "../db/database"
import dotenv from 'dotenv';

dotenv.config();

describe('Database', () => {
    const pool = dbConnection({
        dbHost: process.env.DB_HOST,
        dbUser: process.env.DB_USER,
        dbName: process.env.DB_NAME,
        dbPass: process.env.DB_PASSWORD,
        dbPort: Number(process.env.DB_PORT)
    })

    it('should return a connection pool', async () => {
        if (await pool.connect()) {
            console.log("Database connected successfully");
        }

        expect(pool).toBeDefined();
    });

    it('should return a list of tables in the database', async () => {
        const { rows } = await pool.query('SELECT table_name FROM information_schema.tables WHERE table_name=$1', ["businesses"]);

        expect({
            table_name: rows[0].table_name
        }).toEqual({
            table_name: "businesses"
        })
    });
});

