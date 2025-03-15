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