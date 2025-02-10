const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 5000;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

app.get('/api/data', (req, res) => {
    db.query('SELECT * FROM sample_table', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
