import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Login from "./Pages/login";
import Register from "./Pages/Register";
import AdminDashboard from "./Pages/AdminDashboard";
import UserDashboard from "./Pages/UserDashboard";
import PrivateRoute from "./components/PrivateRoutes";
import { PublicRoutes } from "./components/PublicRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />

          {/* Private route for Admin */}
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* Private route for User */}
          <Route
            path="/user"
            element={
              <PrivateRoute allowedRoles={["user"]}>
                <UserDashboard />
              </PrivateRoute>
            }
          />

          {/* Default route (redirects based on role) */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                {(auth) =>
                  auth?.role === "admin" ? (
                    <AdminDashboard />
                  ) : (
                    <UserDashboard />
                  )
                }
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

