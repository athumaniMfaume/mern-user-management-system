import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export const Navbar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const handleLogout = async () => {
    try {
      // ✅ FIXED: Removed 'http://localhost:5000' to use relative path
      // This allows the app to work on both localhost and Render automatically
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      
      setAuth(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
      // Even if the network call fails, we clear local state for safety
      setAuth(null);
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white border-b shadow-sm py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Match your Indigo/Blue theme */}
        <Link to="/" className="text-2xl font-black text-indigo-600 tracking-tighter">APP</Link>
        <div className="flex items-center space-x-6">
          {auth?.accessToken ? (
            <>
              <span className="text-sm text-gray-500 uppercase font-bold tracking-widest">
                Hi, <span className="text-indigo-600">{auth.user?.username || auth.username}</span>
              </span>
              <button 
                onClick={handleLogout} 
                className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-widest border border-red-200 px-3 py-1 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-indigo-600">Login</Link>
              <Link to="/register" className="bg-indigo-600 text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-widest shadow-md hover:bg-indigo-700 transition">
                Join
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};



