const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const SQL = `

-- Reset the database for development purposes
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;

-- Create the 'users' table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    membership_status BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'messages' table
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES users(id) ON DELETE CASCADE
);

-- Insert sample data into the 'users' table
INSERT INTO users (first_name, last_name, username, password, membership_status) 
VALUES 
    ('John', 'Doe', 'johndoe', 'password123', true),
    ('Jane', 'Smith', 'janesmith', 'securepass', false),
    ('Mike', 'Johnson', 'mikej', 'mikepass', true),
    ('Sara', 'Williams', 'sara_w', 'sarapassword', false);

-- Insert sample data into the 'messages' table
INSERT INTO messages (title, content, user_id) 
VALUES 
    ('Welcome', 'Hello everyone! This is my first post.', 1),
    ('Announcement', 'We are launching a new feature next week.', 2),
    ('Update', 'The server will be down for maintenance tonight.', 3),
    ('Question', 'Does anyone know how to fix this issue?', 4);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();
