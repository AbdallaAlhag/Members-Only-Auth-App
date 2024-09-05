import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;
// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('Connected to the database');
        client.release();
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

testConnection();

export default pool;