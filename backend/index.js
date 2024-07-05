const express = require('express');
const fetchData = require('./fetchData');  // Import fetchData
const pool = require('./database');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('frontend'));

app.get('/api/crypto-data', async (req, res) => {
console.log("request Receive");
console.log(pool);
    try {
        const result = await pool.query('SELECT * FROM crypto_data');
        console.log(result);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching data from database:', error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    fetchData();  // Fetch data on server start
});
