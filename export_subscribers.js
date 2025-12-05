const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data', 'subscribers.db');

if (!fs.existsSync(DB_PATH)) {
    console.error(`Database file not found at: ${DB_PATH}`);
    process.exit(1);
}

const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        process.exit(1);
    }
});

console.log('id,email,source_page,created_at');

db.each("SELECT * FROM subscribers", (err, row) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log(`${row.id},${row.email},${row.source_page || ''},${row.created_at}`);
    }
}, (err, count) => {
    if (err) {
        console.error('Error reading rows:', err);
    }
    // console.error(`Exported ${count} rows.`); // Print to stderr to not mess up CSV output
    db.close();
});
