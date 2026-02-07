import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

// Automatically detect URL
const API_BASE = import.meta.env.PROD 
  ? 'https://mern-user-management-system.onrender.com' 
  : 'http://localhost:5000';

axios.defaults.baseURL = API_BASE;
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  // Global Interceptor: Injects token into every request
  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      if (auth?.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }
      return config;
    });
    return () => axios.interceptors.request.eject(interceptor);
  }, [auth]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/refresh");
        if (res.data.accessToken) {
          setAuth({ accessToken: res.data.accessToken, user: res.data.user });
        }
      } catch (err) {
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
