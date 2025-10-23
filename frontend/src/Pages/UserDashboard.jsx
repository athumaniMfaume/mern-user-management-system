import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { auth, setAuth } = useAuth(); // ✅ include setAuth
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth?.accessToken) return;

      try {
        const res = await axios.get('/api/users/me', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        });

        setProfile(res.data.user);

        // ✅ Update auth with latest user info if needed
        setAuth({
          accessToken: auth.accessToken,
          role: res.data.role,
          user: res.data,
        });

        console.log('Profile fetched successfully:', res.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setError('Failed to fetch user profile');
      }
    };

    fetchProfile();
  }, [auth?.accessToken]); // ✅ add setAuth to dependencies

  return (
    <div className="container mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {profile && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Profile Information</h3>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role}</p>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;

