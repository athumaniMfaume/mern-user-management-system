import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Login from "./Pages/login";
import Register from "./Pages/Register";
import AdminDashboard from "./Pages/AdminDashboard";
import UserDashboard from "./Pages/UserDashboard";
import Donate from "./Pages/Donate"; 
import PrivateRoutes from "./components/PrivateRoutes"; 
import { PublicRoutes } from "./components/PublicRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* --- GUESTS ONLY (Redirects to Home if logged in) --- */}
          <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
          <Route path="/register" element={<PublicRoutes><Register /></PublicRoutes>} />
          
          {/* --- ACCESSIBLE TO EVERYONE (No Wrappers) --- */}
          <Route path="/donate" element={<Donate />} />

          {/* --- PRIVATE (Login Required) --- */}
          <Route path="/admin" element={<PrivateRoutes allowedRoles={["admin"]}><AdminDashboard /></PrivateRoutes>} />
          <Route path="/user" element={<PrivateRoutes allowedRoles={["user"]}><UserDashboard /></PrivateRoutes>} />

          {/* --- DEFAULT REDIRECT --- */}
          <Route path="/" element={
              <PrivateRoutes>
                {(auth) => auth?.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
              </PrivateRoutes>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;



