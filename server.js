const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data', 'subscribers.db');

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Setup
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        createTable();
    }
});

function createTable() {
    db.run(`CREATE TABLE IF NOT EXISTS subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        source_page TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Subscribers table ready.');
        }
    });
}

// API Routes
app.post('/api/subscribe', (req, res) => {
    const { email, source_page } = req.body;

    // Basic Validation
    if (!email || !email.includes('@') || email.length < 5) {
        return res.status(400).json({ success: false, error: 'Invalid email address' });
    }

    const stmt = db.prepare('INSERT INTO subscribers (email, source_page) VALUES (?, ?)');
    stmt.run(email, source_page || 'unknown', function (err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                // Email already exists, treat as success
                console.log(`Duplicate email skipped: ${email}`);
                return res.status(200).json({ success: true, message: 'Already subscribed' });
            }
            console.error('Error inserting email:', err.message);
            return res.status(500).json({ success: false, error: 'Database error' });
        }
        console.log(`New subscriber: ${email}`);
        res.status(200).json({ success: true, message: 'Subscribed successfully' });
    });
    stmt.finalize();
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Database path: ${DB_PATH}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        }
        console.log('Database connection closed.');
        process.exit(0);
    });
});
