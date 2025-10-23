import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/refresh", {
          withCredentials: true,
        });

        // Make sure your backend returns `accessToken` and `user` object
        if (res.data.accessToken && res.data.user) {
          setAuth({
            accessToken: res.data.accessToken,
            role: res.data.user.role,
            user: res.data.user,
          });
        } else {
          setAuth(null);
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

