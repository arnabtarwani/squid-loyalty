import { Pool } from 'pg';

class Database {
    constructor() {
        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err)
            process.exit(-1)
        });

        this.pool.on('connect', () => {
            console.log('Database connected');
        });

        this.pool.on('remove', () => {
            console.log('Database removed');
        });
    }

    private pool: Pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT || '5432'),
    });

    async query(query: string, values: any[]) {
        const client = await this.pool.connect();

        try {
            const { rows } = await client.query(query, values);
            return rows;
        } catch (error) {
            this.pool.end();
            throw new Error("Error querying database");
        }
    }
}

export default Database;