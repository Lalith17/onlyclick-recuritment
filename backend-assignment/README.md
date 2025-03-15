# Task Manager API

A RESTful API built with Node.js, Express, TypeScript, and MongoDB for managing tasks.

## Features

- User authentication (signup/login) with JWT
- CRUD operations for tasks
- Rate limiting
- Security headers with Helmet
- MongoDB integration
- TypeScript support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local instance or MongoDB Atlas)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

#### POST /api/users/signup
Register a new user
- Body: `{ "name": "string", "email": "string", "password": "string" }`
- Returns: User object and JWT token

#### POST /api/users/login
Login with existing credentials
- Body: `{ "email": "string", "password": "string" }`
- Returns: User object and JWT token

#### GET /api/users/me
Get current user profile
- Headers: `Authorization: Bearer <token>`
- Returns: User object

### Tasks

#### POST /api/tasks
Create a new task
- Headers: `Authorization: Bearer <token>`
- Body: `{ "title": "string", "description": "string", "completed": boolean }`
- Returns: Created task object

#### GET /api/tasks
Get all tasks for the authenticated user
- Headers: `Authorization: Bearer <token>`
- Returns: Array of task objects

#### GET /api/tasks/:id
Get a specific task by ID
- Headers: `Authorization: Bearer <token>`
- Returns: Task object

#### PATCH /api/tasks/:id
Update a task
- Headers: `Authorization: Bearer <token>`
- Body: `{ "title": "string", "description": "string", "completed": boolean }`
- Returns: Updated task object

#### DELETE /api/tasks/:id
Delete a task
- Headers: `Authorization: Bearer <token>`
- Returns: Deleted task object

## Security Features

- Password hashing with bcrypt
- JWT authentication
- Rate limiting (100 requests per 15 minutes)
- Security headers with Helmet
- CORS enabled
- Request body parsing limits
- MongoDB injection protection

## Error Handling

The API implements proper error handling for:
- Invalid requests
- Authentication errors
- Database errors
- Rate limiting errors
- Validation errors

## Development

To run the development server with hot reload:
```bash
npm run dev
```

## Bonus Features

### 1. Rate Limiting
- Implemented rate limiting using `express-rate-limit`
- Limits: 100 requests per 15 minutes per IP
- Helps prevent DoS attacks and abuse

### 2. Load Balancing with Nginx
This project implements load balancing using Nginx as a reverse proxy, distributing traffic across multiple Node.js instances.

#### Setup Instructions

1. **Install Nginx**
   - Windows: Download from http://nginx.org/en/download.html
   - Linux: `sudo apt-get install nginx`
   - Mac: `brew install nginx`

2. **Configure Nginx**
   - Copy the `nginx.conf` file to your Nginx configuration directory
   - Windows: `C:\nginx\conf\nginx.conf`
   - Linux/Mac: `/etc/nginx/nginx.conf`

3. **Start Multiple Node.js Instances**
```bash
npm run start:all
```
This will start three instances of the application on ports 5000, 5001, and 5002.

4. **Start Nginx**
   - Windows: Run `nginx.exe`
   - Linux/Mac: `sudo service nginx start`

5. **Access the Load Balanced API**
   - The API is now available at `http://localhost:80`
   - Requests will be distributed across the three Node.js instances
   - Each instance handles a portion of the traffic

#### Load Balancing Features
- Round-robin distribution of requests
- Automatic failover if an instance goes down
- Session persistence through sticky sessions
- Health checks for backend servers

#### Monitoring
- Check Nginx access logs for request distribution
- Monitor individual Node.js instances through their console output
- Use the built-in rate limiting metrics 
