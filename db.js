import pg from 'pg';
import 'dotenv/config';

const client = new pg.Client({
user: process.env.DB_USER,
host: process.env.DB_HOST,
database: process.env.DB_DATABASE,
password: process.env.DB_PASSWORD
});

await client.connect();

export default client;
