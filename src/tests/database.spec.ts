// test to check if the database is connected and the connection pool is created
import { Pool } from "pg"

const pool = new Pool({
    user: process.env.DB_USER ?? "postgres",
    host: process.env.DB_HOST ?? "100.94.203.111",
    database: process.env.DB_NAME ?? "postgres",
    password: process.env.DB_PASS ?? "admin",
    port: Number(process.env.DB_PORT) ?? 5432,
})

describe('Database', () => {
    it('should return a connection pool', async () => {
        await pool.connect();
    });

    it('should return a list of tables in the database', async () => {
        const { rows } = await pool.query('SELECT table_name FROM information_schema.tables', []);
        console.log(rows)
    });
});

