const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'ponce-todolist'
});

db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err);
        return;
    }

    console.log("Connected to MySQL");
});

app.get('/', (req, res) => {
    res.redirect('./public/index.html');
});

app.get('/api/tasks', (req, res) => {

    const sql = 'SELECT * FROM tasks';

    db.query(sql, (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        return res.json(results);
    });
});


app.get('/api/tasks/:id', (req, res) => {

    const id = req.params.id;

    const sql = 'SELECT * FROM tasks WHERE id = ?';

    db.query(sql, [id], (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.json(results[0]);
    });
});


app.post('/api/tasks', (req, res) => {

    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    const sql = `
        INSERT INTO tasks (title, description)
        VALUES (?, ?)
    `;

    db.query(sql, [title, description], (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        return res.status(201).json({
            message: "Task created successfully",
            id: result.insertId
        });
    });
});


app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});