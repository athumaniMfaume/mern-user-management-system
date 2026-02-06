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
      // Points to your backend controller: export const register = ...
      await axios.post('http://localhost:5000/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      // Captures: res.status(409).json({ message: 'User already exists' })
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">Create Account</h2>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
      <form onSubmit={handleRegister} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-600" htmlFor="username">Username</label>
          <input className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                 type="text" id="username" placeholder="johndoe" value={form.username} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-600" htmlFor="email">Email</label>
          <input className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                 type="email" id="email" placeholder="name@email.com" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-600" htmlFor="password">Password</label>
          <input className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                 type="password" id="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
        </div>
        <button disabled={loading} type="submit" className={`w-full py-3 rounded-lg font-bold text-white shadow-md transition-all ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {loading ? 'Processing...' : 'Register'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log in</Link></p>
    </div>
  );
};

export default Register;
