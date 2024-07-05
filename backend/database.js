const { Pool } = require('pg');
require('dotenv').config();

const isLocal = process.env.DATABASE_URL.includes('localhost');

const pool = new Pool({
    user:'postgre',
    host:'dpg-cq3t3qbqf0us73dnemhg-a',
    database:'hodlinfo_e6yl',
    password:'zzaNYdZ2by4wztIsdGulY4s19mc5obec',
    port:5432,
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
