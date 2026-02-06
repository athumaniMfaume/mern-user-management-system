import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Login from "./Pages/login";
import Register from "./Pages/Register";
import AdminDashboard from "./Pages/AdminDashboard";
import UserDashboard from "./Pages/UserDashboard";
import PrivateRoutes from "./components/PrivateRoutes"; // ✅ Imported as PrivateRoutes
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
              /* ✅ Changed to PrivateRoutes to match import */
              <PrivateRoutes allowedRoles={["admin"]}>
                <AdminDashboard />
              </PrivateRoutes>
            }
          />

          {/* Private route for User */}
          <Route
            path="/user"
            element={
              /* ✅ Changed to PrivateRoutes to match import */
              <PrivateRoutes allowedRoles={["user"]}>
                <UserDashboard />
              </PrivateRoutes>
            }
          />

          {/* Default route (redirects based on role) */}
          <Route
            path="/"
            element={
              /* ✅ Changed to PrivateRoutes to match import */
              <PrivateRoutes>
                {(auth) =>
                  auth?.role === "admin" ? (
                    <AdminDashboard />
                  ) : (
                    <UserDashboard />
                  )
                }
              </PrivateRoutes>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;


