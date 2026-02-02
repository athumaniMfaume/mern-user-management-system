# MERN User Management System

[Live Demo](https://mern-user-management-system.onrender.com/)

A full-featured **User Management System** built with the MERN stack (MongoDB, Express, React, Node.js). The system includes **JWT authentication**, **role-based access control**, and **refresh token support**.  

---

## Features

- User registration and login  
- Password hashing with **bcrypt**  
- JWT-based **authentication** and **refresh tokens**  
- Role-based access control (Admin/User)  
- View user profile  
- Secure logout functionality  
- RESTful API backend  
- React frontend with context-based auth state  

---

## Tech Stack

- **Frontend:** React, Axios, Tailwind CSS, Vite  
- **Backend:** Node.js, Express, MongoDB, Mongoose  
- **Authentication:** JWT, Refresh Tokens  
- **Other:** Cookie-parser, dotenv, bcryptjs, cors  

---

## Installation

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/athumaniMfaume/mern-user-management-system.git
Navigate to the backend folder:

bash
Copy code
cd mern-user-management-system/backend
Install dependencies:

bash
Copy code
npm install
Create a .env file with:

ini
Copy code
MONGO_URI=<your_mongo_connection_string>
ACCESS_TOKEN_SECRET=<your_jwt_access_secret>
REFRESH_TOKEN_SECRET=<your_jwt_refresh_secret>
PORT=5000
NODE_ENV=development
Start the server:

bash
Copy code
npm run dev
Frontend
Navigate to the frontend folder:

bash
Copy code
cd ../frontend
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm run dev
API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login a user
GET	/api/auth/refresh	Get a new access token
POST	/api/auth/logout	Logout a user

User Routes
Method	Endpoint	Description
GET	/api/users/	Get all users (admin only)
GET	/api/users/me	Get logged-in user profile
DELETE	/api/users/:id	Delete a user (admin only)

Notes
Make sure environment variables are set correctly in production.

Admin users can manage all other users, while regular users can only view their profile.

Passwords are securely hashed using bcrypt.

Live Demo
You can access the live version of this system here:
https://mern-user-management-system.onrender.com

License
This project is licensed under the MIT License.