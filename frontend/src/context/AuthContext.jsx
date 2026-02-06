import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

// ✅ FIXED: Automatically switch between local and production API URLs
axios.defaults.baseURL = import.meta.env.PROD 
  ? 'https://mern-user-management-system.onrender.com' 
  : 'http://localhost:5000';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Use relative path - axios will prepend the baseURL set above
        const res = await axios.get("/api/auth/refresh", {
          withCredentials: true,
        });

        if (res.data.accessToken && res.data.user) {
          setAuth({
            accessToken: res.data.accessToken,
            role: res.data.user.role,
            user: res.data.user,
          });
        }
      } catch (error) {
        setAuth(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

