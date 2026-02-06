import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    if (error) setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form, { withCredentials: true });
      
      // Updates AuthContext with user data from your controller's res.status(200).json
      setAuth({
        accessToken: res.data.accessToken,
        username: res.data.user.username,
        role: res.data.user.role,
        user: res.data.user
      });
      navigate('/');
    } catch (err) {
      // Captures: res.status(401).json({ message: 'Invalid credentials' })
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">Welcome Back</h2>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-red-700 text-sm">{error}</div>
      )}
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-600" htmlFor="email">Email</label>
          <input className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                 type="email" id="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-600" htmlFor="password">Password</label>
          <input className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                 type="password" id="password" value={form.password} onChange={handleChange} required />
        </div>
        <button disabled={loading} type="submit" className={`w-full py-3 rounded-lg font-bold text-white shadow-md transition-all ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {loading ? 'Checking...' : 'Sign In'}
        </button>
      </form>
      <p className="mt-8 text-center text-sm text-gray-600">New here? <Link to="/register" className="text-blue-600 font-bold hover:underline">Create Account</Link></p>
    </div>
  );
};

export default Login;


