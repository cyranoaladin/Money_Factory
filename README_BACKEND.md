# Money Factory AI - Email Capture Backend

This is a simple Node.js service to capture email subscriptions from the landing page.

## Setup

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start the Server:**
    ```bash
    npm start
    ```
    The server will run on port 3000 by default.
    The database will be created at `data/subscribers.db`.

## Configuration

You can configure the server using environment variables:

*   `PORT`: The port to listen on (default: 3000).
*   `DB_PATH`: The path to the SQLite database file (default: `data/subscribers.db`).

## Deployment (Nginx + Systemd)

### 1. Systemd Service
Create a file `/etc/systemd/system/mfai-email.service`:

```ini
[Unit]
Description=MFAI Email Capture Service
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/landing_page_money_factory
ExecStart=/usr/bin/node server.js
Restart=on-failure
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

### 2. Nginx Configuration
Add this to your Nginx server block to proxy requests to the backend:

```nginx
location /api/ {
    proxy_pass http://localhost:3000/api/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

## Data Export

To export the subscribers to a CSV file:

```bash
npm run export > subscribers.csv
```
