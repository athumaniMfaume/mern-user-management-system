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
      // ✅ FIXED: Removed 'http://localhost:5000' to use relative path
      const res = await axios.post('/api/auth/login', form, { withCredentials: true });
      
      setAuth({
        accessToken: res.data.accessToken,
        username: res.data.user.username,
        role: res.data.user.role,
        user: res.data.user
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-3xl font-extrabold mb-6 text-indigo-600 text-center tracking-tight">Welcome Back</h2>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-red-700 text-xs font-bold uppercase tracking-widest">{error}</div>
      )}
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-500" htmlFor="email">Email</label>
          <input className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm" 
                 type="email" id="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-500" htmlFor="password">Password</label>
          <input className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm" 
                 type="password" id="password" value={form.password} onChange={handleChange} required />
        </div>
        <button disabled={loading} type="submit" className={`w-full py-3 rounded-lg font-bold text-white shadow-md transition-all uppercase text-xs tracking-widest ${loading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
          {loading ? 'Verifying...' : 'Sign In'}
        </button>
      </form>
      <p className="mt-8 text-center text-[10px] uppercase font-bold tracking-widest text-gray-400">
        New here? <Link to="/register" className="text-indigo-600 hover:underline">Create Account</Link>
      </p>
    </div>
  );
};

export default Login;


