MERN User Management System

🚀 Live Demo: https://mern-user-management-system.onrender.com/
A professional, full-featured User Management & Admin Control Panel built with the MERN stack. This system provides high-level security for user authentication and a powerful interface for administrators to manage the user database.

✨ Key Features
🔐 Security & Authentication
Dual-Token System: Implements JWT Access Tokens (short-lived) and Refresh Tokens (long-lived) for a seamless, secure user session.
Secure Storage: Refresh tokens are stored in HttpOnly Cookies to prevent XSS attacks.
Password Protection: Industry-standard encryption using bcryptjs.
Route Guarding: Protected React routes prevent unauthorized access to Admin and User dashboards.

👤 User Functionality
Dynamic Profile Management: Users can view and edit their own credentials (username, email, password) from their dashboard.
Global Auth State: Instant UI updates via React Context API when profile changes occur.
Modern UI: Clean, responsive Indigo-themed design built with Tailwind CSS.

🛠️ Admin Control Panel
Complete CRUD: Create, Read, Update, and Delete users from a centralized management table.
Advanced Pagination: Efficiently browse users with a fixed limit of 5 users per page.
Role Management: Easily toggle user permissions between User and Admin.
Action Feedback: Integrated Success/Error notifications with auto-hide logic for every system action.
Safe Operations: Built-in protection to prevent admins from deleting their own accounts.

💻 Tech Stack
Frontend: React 18, Vite, Axios, Tailwind CSS, React Router 6.
Backend: Node.js, Express.js.
Database: MongoDB Atlas via Mongoose ODM.
Authentication: JSON Web Tokens (JWT), Cookie-parser.

🚀 Installation & Setup
1. Clone the repository
bash
git clone https://github.com/athumaniMfaume/mern-user-management-system.git
cd mern-user-management-system
Use code with caution.

2. Backend Configuration
bash
cd backend
npm install
Use code with caution.

Create a .env file in the /backend folder:
ini
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_access_secret
REFRESH_TOKEN_SECRET=your_jwt_refresh_secret
NODE_ENV=development
Use code with caution.

Start the server:
bash
npm run dev
Use code with caution.

3. Frontend Configuration
bash
cd ../frontend
npm install
npm run dev
Use code with caution.

📡 API Documentation
Auth Endpoints
Method	Endpoint	Description	Access
POST	/api/auth/register	Register a new user	Public
POST	/api/auth/login	Login and receive JWT	Public
GET	/api/auth/refresh	Renew expired Access Token	Public
POST	/api/auth/logout	Clear session cookies	Private

User & Admin Endpoints
Method	Endpoint	Description	Access
GET	/api/users/me	Fetch personal profile	Private
PUT	/api/users/profile/update	Update personal credentials	Private
GET	/api/users?page=1&limit=5	Paginated user list	Admin Only
POST	/api/users	Manually add a new user	Admin Only
PUT	/api/users/admin-edit/:id	Update any user profile/role	Admin Only
DELETE	/api/users/:id	Permanent account removal	Admin Only

📝 Deployment Notes
Production Mode: Ensure NODE_ENV=production is set on Render or Heroku to enable secure, same-site cookie attributes.
CORS: The backend is configured to accept requests from the frontend URL defined in environment variables.
📄 License
This project is licensed under the MIT License.
Live Project: https://mern-user-management-system.onrender.com/
