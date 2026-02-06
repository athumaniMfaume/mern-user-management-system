import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export const Navbar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      setAuth(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="bg-white border-b shadow-sm py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-blue-600">APP</Link>
        <div className="flex items-center space-x-6">
          {auth?.accessToken ? (
            <>
              <span className="text-gray-600">Hi, <b className="text-gray-900">{auth.username}</b></span>
              <button onClick={handleLogout} className="text-red-500 font-semibold hover:text-red-700">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 font-semibold">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">Join</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};



