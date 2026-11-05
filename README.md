# QueueLess – Digital Queue Management System

QueueLess helps students take digital tokens and check queue status while administrators manage active queues.

## Features
- Student and admin login
- Digital token generation for campus services
- Queue status display
- Admin queue view and token status updates
- MySQL database with password hashing and JWT authentication

## Requirements
- Node.js and npm
- MySQL Server
- VS Code (recommended)

## Setup
1. Open this project folder in VS Code.
2. Open a terminal in the project root and install packages:
   ```bash
   npm install
   ```
3. Create the database and tables by running `database/schema.sql` in MySQL Workbench or the MySQL command line.
4. Edit `.env` and enter your MySQL password. Change `JWT_SECRET` to a long random value.
5. Start the backend:
   ```bash
   npm run dev
   ```
6. Open `frontend/index.html` in your browser. You can also use the VS Code Live Server extension for the frontend.

## Create the first account
The API provides `POST http://localhost:3000/api/auth/register` with JSON:
```json
{"name":"Admin User","email":"admin@example.com","password":"Admin123!","role":"admin"}
```
Register a student similarly with role `student`. Then log in through `frontend/login.html`.

## API endpoints
- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/queue/token` (authenticated)
- `GET /api/queue/status` (authenticated)
- `PATCH /api/queue/:id` (admin only)

## Important notes
- `.env` contains local credentials. Never upload real passwords or secrets to GitHub.
- This starter project uses JWT authentication. For production, add rate limiting, input validation, HTTPS, stronger secret management, and role/ownership checks.
- The current login page supports login; create accounts using the registration API or add a registration page.
