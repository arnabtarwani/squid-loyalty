import { Pool, Query } from 'pg';

export const pool = new Pool({
    user: process.env.DB_USER ?? "postgres",
    host: process.env.DB_HOST ?? "100.69.220.19",
    database: process.env.DB_NAME ?? "postgres",
    password: process.env.DB_PASS ?? "admin",
    port: Number(process.env.DB_PORT) ?? 5432,
})