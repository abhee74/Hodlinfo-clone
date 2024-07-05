const { Pool } = require('pg');
require('dotenv').config();

const isLocal = process.env.DATABASE_URL.includes('localhost');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'hodlinfo',
    password: process.env.DB_PASSWORD || '1234',
    port: process.env.DB_PORT || 5432,
    ssl: isLocal ? false : { rejectUnauthorized: false }
});

pool.query(`
    CREATE TABLE IF NOT EXISTS crypto_data (
        name VARCHAR(50) PRIMARY KEY,
        last DECIMAL,
        buy DECIMAL,
        sell DECIMAL,
        volume DECIMAL,
        base_unit VARCHAR(10)
    );
`, (err, res) => {
    if (err) {
        console.error('Error creating table:', err);
    } else {
        console.log('Table created successfully');
    }
});

module.exports = pool;
