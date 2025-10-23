import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PublicRoutes = ({ children }) => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (auth && auth.accessToken) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
