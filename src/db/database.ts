import { Pool } from 'pg';


/**
 * Create a new pool of connections to the database
 * 
 * The reason we use a pool of connections is to avoid the overhead of creating a new connection every time we need to interact with the database. A pool of connections allows us to reuse connections and manage them efficiently. It will check out a connection from the pool when needed and return it to the pool when the operation is complete.
 */
export const dbConnection = ({ dbUser, dbHost, dbName, dbPass, dbPort }: {
    dbUser?: string,
    dbHost?: string,
    dbName?: string,
    dbPass?: string,
    dbPort?: number
}) => {

    const pool = new Pool({
        user: dbUser ?? "user",
        host: dbHost ?? "localhost",
        database: dbName ?? "postgres",
        password: dbPass ?? "password",
        port: Number(dbPort) ?? 5432,
    })

    pool.on("acquire", () => {
        console.log(`Client acquired. Total clients: ${pool.totalCount}. Idle clients: ${pool.idleCount}`);
    });

    pool.on("error", (error) => {
        console.error(`An error occurred in the pool: ${error}`);
    })

    return pool;
}

// NOTE: executeQuery ensures that the pool is connected only when needed and releases the connection when the operation is complete. This is important to avoid resource leaks and ensure that the pool is used efficiently. Although using pool directly will handle the query execution exactly like this, it is recommended to use a helper function like executeQuery to handle the connection management.
export const executeQuery = async (pool: Pool, query: string, values: Array<string>) => {
    try {
        const client = await pool.connect();

        const { rows } = await client.query(query, values);

        client.release();

        return rows;
    } catch (error) {
        throw new Error(`Error while querying the database: ${error}`);
    }
}

