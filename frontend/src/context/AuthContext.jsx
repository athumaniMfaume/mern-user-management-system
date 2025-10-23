import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react";
import axios from "axios";



const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await axios.get('/api/auth/refresh', {
        withCredentials: true
      });
      // ✅ Some backends return `newAccessToken`, not `accessToken`
      const token = res.data.accessToken || res.data.newAccessToken;
      if (token) {
        setAuth({ accessToken: token, role: res.data.role });
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
}, []); // ✅ only runs once when the app loads


    return (
        <AuthContext.Provider value={{auth, setAuth, loading}}> 
            {children}
        </AuthContext.Provider>
    )
}

export const  useAuth = () => useContext(AuthContext);
