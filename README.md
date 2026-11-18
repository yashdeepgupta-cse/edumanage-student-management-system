# EduManage – Student Management System

EduManage is a full-stack Student Management System built using React.js, Node.js, Express.js and MongoDB. It provides a centralized platform for student registration, authentication, profile management and administrative operations.

## Features

### Student Features
- Student registration and login
- Secure password hashing
- JWT-based authentication
- Personal student dashboard
- View student profile
- Protected student routes
- Logout functionality

### Admin Features
- Admin authentication
- View all registered students
- Search students by name, email, course or enrollment number
- Edit student information
- Delete student records
- Protected admin dashboard

### Security Features
- Password hashing using bcrypt
- JWT authentication
- Role-based authorization
- Protected API endpoints
- Environment variables for sensitive configuration
- Input validation

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite, JavaScript |
| Styling | CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JWT |
| Password Security | bcrypt |
| API Communication | Axios |
| Routing | React Router |
| Version Control | Git and GitHub |

## Project Structure

```text
edumanage-student-management-system/
│
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── Student.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── studentRoutes.js
│   ├── db.js
│   ├── seedAdmin.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
│
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yashdeepgupta-cse/edumanage-student-management-system.git
```

```bash
cd edumanage-student-management-system
```

### 2. Backend Setup

Open a terminal:

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

Replace the placeholder values with your own credentials.

Create the admin account:

```bash
node seedAdmin.js
```

Start the backend:

```bash
npm run dev
```

Backend runs at:

http://localhost:5000

### 3. Frontend Setup

Open another terminal from the project root:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at:

http://localhost:5173

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a student |
| POST | `/api/auth/login` | Login |

### Student Management

| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/students/me` | Authenticated student |
| GET | `/api/students` | Admin |
| PUT | `/api/students/:id` | Admin |
| DELETE | `/api/students/:id` | Admin |

Protected endpoints require a valid JWT Bearer token.

## Database

EduManage uses MongoDB Atlas to store student information, account credentials and user roles.

Mongoose is used for database modeling and operations.

## Future Improvements

- Attendance management
- Fee management
- Student performance tracking
- Password reset functionality
- Email notifications
- Deployment on AWS
- Advanced reporting and analytics

## Author

**Yash Deep Gupta**

GitHub: [yashdeepgupta-cse](https://github.com/yashdeepgupta-cse)

Project Repository: [EduManage Student Management System](https://github.com/yashdeepgupta-cse/edumanage-student-management-system)

---

If you find this project useful, consider giving the repository a star!
