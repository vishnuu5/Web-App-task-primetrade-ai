# Task Management Application

A full-stack web application built with React.js (Vite) for the frontend and Node.js (Express) with MongoDB for the backend. This application includes user authentication, profile management, and comprehensive CRUD operations for task management.

## Production Environment Configuration

Ensure these environment variables are set during deployment:

### Backend (`backend`)
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to sign JWT tokens
- `CLIENT_URL` — the frontend’s deployed origin (e.g. `https://web-app-task-primetrade-ai.vercel.app`)

### Frontend (`frontend`)
- `VITE_API_URL` — backend base URL (e.g. `https://web-app-task-primetrade-ai-backend.onrender.com`)

## Dev vs Production API Routing

- In development, the Vite dev server proxies requests from `/api/*` to the backend at `http://localhost:5000`.
- In production, the frontend uses `VITE_API_URL` and a shared axios client that automatically removes the leading `/api` from request paths.

No code changes are required to switch environments; set the env vars appropriately.

## Features

### Frontend

- **User Authentication**: Register and login with JWT tokens
- **Protected Routes**: Dashboard and profile pages require authentication
- **Responsive Design**: Fully responsive UI using TailwindCSS (mobile, tablet, desktop)
- **Task Management**: Create, read, update, and delete tasks
- **Search & Filter**: Search tasks by title/description and filter by status and priority
- **User Profile**: View and update user profile information
- **Form Validation**: Client-side validation for all forms

### Backend

- **User Management**: User registration and authentication with bcrypt password hashing
- **JWT Authentication**: Secure token-based authentication with 7-day expiration
- **Task CRUD**: Full CRUD operations on tasks with user-specific data isolation
- **Error Handling**: Comprehensive error handling and validation
- **Security**: Password hashing, token verification, and authorization checks

## Tech Stack

### Frontend

- **Framework**: React.js 18.2.0
- **Build Tool**: Vite 5.0.8
- **Styling**: TailwindCSS 3.3.6
- **HTTP Client**: Axios 1.6.2
- **Routing**: React Router DOM 6.21.0

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js 4.18.2
- **Database**: MongoDB 7.6.3
- **Authentication**: JWT (jsonwebtoken 9.1.2)
- **Password Hashing**: bcryptjs 2.4.3
- **Environment**: dotenv 16.3.1
- **CORS**: cors 2.8.5

## Deployment Task

**VIew Project**
[View project]()

## Gir Clone

```bash
git clone https://github.com/vishnuu5/Web-App-task-primetrade-ai.git
```

## Getting Started

### Frontend Setup

1. Navigate to the Frontend directory:

```bash
cd Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Backend Setup

1. Navigate to the Backend directory:

```bash
cd Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env
```

4. Update the `.env` file with your MongoDB URI and JWT secret:

```bash
MONGODB_URI=
JWT_SECRET=
PORT=5000
NODE_ENV=development
```

5. Start the server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## API Documentation

### Authentication Endpoints

#### Register User

- **POST** `/auth/register`
- **Body**: `{ name: string, email: string, password: string }`
- **Response**: `{ message: string, user: { id, name, email } }`

#### Login User

- **POST** `/auth/login`
- **Body**: `{ email: string, password: string }`
- **Response**: `{ token: string, user: { id, name, email } }`

#### Get Profile

- **GET** `/auth/profile`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{ user: { id, name, email, createdAt } }`

#### Update Profile

- **PUT** `/auth/profile`
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ name: string, email: string }`
- **Response**: `{ message: string, user: { id, name, email } }`

### Task Endpoints

#### Get All Tasks

- **GET** `/tasks`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{ tasks: [{ _id, title, description, status, priority, dueDate, userId, createdAt }] }`

#### Create Task

- **POST** `/tasks`
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ title: string, description: string, status: string, priority: string, dueDate: date }`
- **Response**: `{ message: string, task: { _id, title, description, status, priority, dueDate } }`

#### Update Task

- **PUT** `/tasks/:id`
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ title, description, status, priority, dueDate }`
- **Response**: `{ message: string, task: { _id, ...updated fields } }`

#### Delete Task

- **DELETE** `/tasks/:id`
- **Headers**: `Authorization: Bearer {token}`
- **Response**: `{ message: string }`

## Security Features

- Password hashing using bcryptjs (10 salt rounds)
- JWT token-based authentication with 7-day expiration
- Protected routes requiring valid authentication tokens
- User-specific data isolation (users can only access their own tasks)
- Authorization checks on all API endpoints
- Input validation on client and server side
- CORS configuration for secure cross-origin requests

## Responsive Design

The application is fully responsive and optimized for:

- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop computers (1024px and up)

All components use TailwindCSS responsive classes (`md:`, `lg:`) for responsive layouts.

## Error Handling

The application includes comprehensive error handling:

- Server-side validation for all inputs
- Client-side form validation
- Proper HTTP status codes
- Meaningful error messages
- Try-catch blocks in async operations

## State Management

Frontend state management:

- React hooks (useState, useEffect) for component state
- LocalStorage for persisting authentication tokens
- Context API for global state (can be extended)

Backend state management:

- Database-driven state with MongoDB
- JWT tokens for session management
- User-specific data isolation

## 🚨 Problems Faced & Solutions

### 1. CORS Errors in Frontend

**Problem**: `Access to XMLHttpRequest blocked by CORS policy`

**Solutions**:

- Backend must have CORS enabled:
  ```javascript
  const cors = require("cors");
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  ```
- Ensure `VITE_API_URL` is correctly set in `.env`
- For production, update CORS origin to your Vercel domain:
  ```javascript
  origin: "https://your-app.vercel.app";
  ```
- Clear browser cache and restart dev server

### 2. MongoDB Query Issues / No Tasks Showing

**Problem**: Tasks not appearing in dashboard

**Solutions**:

- Verify user is authenticated (token should exist)
- Check if userId is properly stored in Task model
- Test query with Postman: GET `/tasks` with Authorization header
- Check MongoDB directly:
  ```javascript
  db.tasks.find({ userId: "user_id_here" });
  ```
- Ensure database name is correct in MONGODB_URI

### 3. Form Validation Not Working

**Problem**: Invalid data is being submitted

**Solutions**:

- Add console logs in form handlers to check values
- Verify regex patterns in validation functions
- Check browser console for JavaScript errors
- Ensure form fields have proper `name` and `value` attributes
- Test email validation: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

### 4. Date/Time Formatting Issues

**Problem**: Dates show as `Invalid Date` or wrong timezone

**Solutions**:

- Use consistent date format (ISO 8601: `YYYY-MM-DD`)
- Convert dates in frontend:
  ```javascript
  const date = new Date(dueDate).toLocaleDateString();
  ```
- Ensure MongoDB stores dates as proper Date objects
- Test with sample dates before deployment

### 5. Memory/Performance Issues

**Problem**: App becomes slow or crashes

**Solutions**:

- Implement pagination for tasks (limit: 10 per page)
- Add database indexes on frequently queried fields:
  ```javascript
  db.tasks.createIndex({ userId: 1 });
  ```
- Implement lazy loading for large lists
- Use React DevTools Profiler to identify bottlenecks
- Monitor backend with `pm2 save` and `pm2 startup`

## Support

For issues or questions:

1. Check existing issues on GitHub
2. Create a detailed issue with steps to reproduce
3. Include error messages and screenshots
4. Specify your environment (OS, Node version, browser)

## License

This project is open source and available under the MIT License.
