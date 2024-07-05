const axios = require('axios');
const pool = require('./database');

async function fetchData() {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const data = Object.values(response.data).slice(0, 10);

        for (const item of data) {
            const query = `
                INSERT INTO crypto_data (name, last, buy, sell, volume, base_unit)
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (name) DO UPDATE SET
                    last = EXCLUDED.last,
                    buy = EXCLUDED.buy,
                    sell = EXCLUDED.sell,
                    volume = EXCLUDED.volume,
                    base_unit = EXCLUDED.base_unit;
            `;
            await pool.query(query, [
                item.name,
                item.last,
                item.buy,
                item.sell,
                item.volume,
                item.base_unit
            ]);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

module.exports = fetchData;
