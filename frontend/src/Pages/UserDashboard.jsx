import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { auth, setAuth } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/users/me', {
          headers: { Authorization: `Bearer ${auth?.accessToken}` }
        });
        setProfile(res.data.user);
        setFormData({ username: res.data.user.username, email: res.data.user.email, password: '' });
      } catch (err) { setError('Error loading profile'); }
    };
    if (auth?.accessToken) fetchProfile();
  }, [auth?.accessToken]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // ✅ Using the specific profile update endpoint
      const res = await axios.put('/api/users/profile/update', formData, {
        headers: { Authorization: `Bearer ${auth.accessToken}` }
      });
      
      setProfile(res.data);
      setAuth({ ...auth, user: res.data }); // Sync context
      setSuccess('Profile updated!');
      setIsEditing(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-indigo-600">
        <div className="bg-indigo-600 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white uppercase">Profile</h2>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="text-[10px] bg-white text-indigo-600 px-3 py-1 rounded font-bold uppercase">
              Edit
            </button>
          )}
        </div>

        <div className="p-6">
          {error && <p className="bg-red-50 text-red-500 text-xs p-2 rounded mb-4">{error}</p>}
          {success && <p className="bg-green-50 text-green-600 text-xs p-2 rounded mb-4">{success}</p>}

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Username</label>
              {isEditing ? (
                <input className="w-full p-2 border rounded mt-1 text-sm outline-none focus:ring-1 focus:ring-indigo-600" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} required />
              ) : (
                <p className="p-2 bg-gray-50 rounded text-gray-800 font-medium border border-gray-100 mt-1">{profile?.username}</p>
              )}
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</label>
              {isEditing ? (
                <input type="email" className="w-full p-2 border rounded mt-1 text-sm outline-none focus:ring-1 focus:ring-indigo-600" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
              ) : (
                <p className="p-2 bg-gray-50 rounded text-gray-800 font-medium border border-gray-100 mt-1">{profile?.email}</p>
              )}
            </div>

            {isEditing && (
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">New Password</label>
                <input type="password" placeholder="Min 6 characters" className="w-full p-2 border rounded mt-1 text-sm outline-none focus:ring-1 focus:ring-indigo-600" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              </div>
            )}

            <div className="pt-4 flex flex-col gap-2">
              {isEditing ? (
                <>
                  <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2 rounded text-xs uppercase shadow hover:bg-indigo-700">Save</button>
                  <button type="button" onClick={() => setIsEditing(false)} className="w-full bg-gray-200 text-gray-600 font-bold py-2 rounded text-xs uppercase">Cancel</button>
                </>
              ) : (
                <button onClick={() => navigate('/')} type="button" className="w-full bg-indigo-600 text-white font-bold py-2 rounded text-xs uppercase">Back</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;



