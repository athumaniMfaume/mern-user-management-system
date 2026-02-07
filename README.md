# MERN User Management System

🚀 **Live Demo:** [https://mern-user-management-system.onrender.com/](https://mern-user-management-system.onrender.com/)

A professional, full-featured User Management & Admin Control Panel built with the MERN stack. This system provides high-level security for user authentication, a powerful admin interface, and integrated payment processing.

## ✨ Key Features

### 🔐 Security & Authentication
*   **Dual-Token System:** Implements JWT Access Tokens (short-lived) and Refresh Tokens (long-lived).
*   **Secure Storage:** Refresh tokens stored in HttpOnly Cookies to prevent XSS attacks.
*   **Route Guarding:** Protected React routes for Admin and User dashboards.

### 💳 Payment Integration (New!)
*   **AzamPay Integration:** Support for mobile money donations via **AzamPay, Tigo Pesa, Airtel Money, and Halopesa**.
*   **Secure Checkout:** Backend-to-backend authentication using AzamPay API keys and bearer tokens.
*   **Dynamic Provider Selection:** Users can choose their preferred mobile network provider.

### 👤 User Functionality
*   **Profile Management:** Users can edit credentials with instant UI updates via React Context API.
*   **Modern UI:** Responsive design built with Tailwind CSS.

### 🛠️ Admin Control Panel
*   **Complete CRUD:** Full user management (Create, Read, Update, Delete).
*   **Advanced Pagination:** Efficient browsing with a fixed limit of 5 users per page.
*   **Role Management:** Toggle permissions between User and Admin roles.

## 💻 Tech Stack
*   **Frontend:** React 18, Vite, Axios, Tailwind CSS, React Router 6.
*   **Backend:** Node.js, Express.js.
*   **Database:** MongoDB Atlas via Mongoose ODM.
*   **Payments:** [AzamPay API](https://azampay.com).

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/athumaniMfaume/mern-user-management-system.git
cd mern-user-management-system
Use code with caution.

2. Backend Configuration
Create a .env file in the /backend folder:
ini
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_access_secret
REFRESH_TOKEN_SECRET=your_jwt_refresh_secret
NODE_ENV=development

# AzamPay Sandbox Credentials
AZAMPAY_APP_NAME=MyTestApp
AZAMPAY_CLIENT_ID=dee88f28-ce11-4c25-b911-ddf6f2c0e023
AZAMPAY_CLIENT_SECRET=your_secret_key
AZAMPAY_X_API_KEY=0fe8e494-efda-4cc5-a303-8879741e9223
AZAMPAY_BASE_URL=https://sandbox.azampay.co.tz
Use code with caution.

📡 API Documentation
Auth Endpoints
Method	Endpoint	Description	Access
POST	/api/auth/register	Register a new user	Public
POST	/api/auth/login	Login and receive JWT	Public
Payment Endpoints (AzamPay)
Method	Endpoint	Description	Access
POST	/api/payment/donate	Initiate Mobile Money Checkout	Private
User & Admin Endpoints
Method	Endpoint	Description	Access
GET	/api/users/me	Fetch personal profile	Private
DELETE	/api/users/:id	Permanent account removal	Admin Only
📄 License
This project is licensed under the MIT License.