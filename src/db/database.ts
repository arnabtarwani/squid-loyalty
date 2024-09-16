import { Pool } from 'pg';


/**
 * Create a new pool of connections to the database
 * 
 * The reason we use a pool of connections is to avoid the overhead of creating a new connection every time we need to interact with the database. A pool of connections allows us to reuse connections and manage them efficiently. It will check out a connection from the pool when needed and return it to the pool when the operation is complete.
 */
export const pool = new Pool({
    user: process.env.DB_USER ?? "user",
    host: process.env.DB_HOST ?? "100.94.203.111",
    database: process.env.DB_NAME ?? "postgres",
    password: process.env.DB_PASS ?? "password",
    port: Number(process.env.DB_PORT) ?? 5432,
})

