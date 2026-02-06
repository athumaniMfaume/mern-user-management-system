import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    if (error) setError(null);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ✅ FIXED: Removed 'http://localhost:5000' to use relative path
      await axios.post('/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-3xl font-extrabold mb-6 text-indigo-600 text-center tracking-tight">Create Account</h2>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-red-700 text-xs font-bold uppercase tracking-widest">{error}</div>
      )}
      <form onSubmit={handleRegister} className="space-y-5">
        <div>
          <label className="block mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-500" htmlFor="username">Username</label>
          <input className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm" 
                 type="text" id="username" placeholder="johndoe" value={form.username} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-500" htmlFor="email">Email Address</label>
          <input className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm" 
                 type="email" id="email" placeholder="name@email.com" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-500" htmlFor="password">Password</label>
          <input className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm" 
                 type="password" id="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
        </div>
        <button disabled={loading} type="submit" className={`w-full py-3 rounded-lg font-bold text-white shadow-md transition-all uppercase text-xs tracking-widest ${loading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
          {loading ? 'Processing...' : 'Register'}
        </button>
      </form>
      <p className="mt-6 text-center text-[10px] uppercase font-bold tracking-widest text-gray-400">
        Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Log in</Link>
      </p>
    </div>
  );
};

export default Register;

