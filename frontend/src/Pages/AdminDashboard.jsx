import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // ✅ Success notification state

  // Modal & Form State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });

  const limit = 5; // ✅ Pagination 5

  const fetchUsers = async () => {
    if (!auth?.accessToken) return;
    try {
      const res = await axios.get(`/api/users?page=${page}&limit=${limit}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
      });
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError('Failed to fetch users. Session may have expired.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, auth?.accessToken]);

  // Handle Modal Open
  const handleOpenModal = (user = null) => {
    setError(null);
    setSuccess(null);
    if (user) {
      setIsEditing(true);
      setSelectedId(user._id);
      setFormData({ username: user.username, email: user.email, password: '', role: user.role });
    } else {
      setIsEditing(false);
      setFormData({ username: '', email: '', password: '', role: 'user' });
    }
    setShowModal(true);
  };

  // Add and Edit Submit Logic
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const config = {
        withCredentials: true,
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
      };

      if (isEditing) {
        await axios.put(`/api/users/admin-edit/${selectedId}`, formData, config);
        setSuccess('User updated successfully!'); // ✅ Success Edit
      } else {
        await axios.post('/api/users', formData, config);
        setSuccess('New user created successfully!'); // ✅ Success Add
      }
      
      setShowModal(false);
      fetchUsers();
      
      // Auto-hide success message
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  // Delete User Logic
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setError(null);
    try {
      await axios.delete(`/api/users/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
      });
      setSuccess('User deleted successfully!'); // ✅ Success Delete
      fetchUsers();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center font-sans">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-indigo-600">
        
        {/* Header - Indigo Theme */}
        <div className="bg-indigo-600 p-4 flex justify-between items-center px-8">
          <h2 className="text-xl font-bold text-white uppercase tracking-widest">User Management</h2>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-white text-indigo-600 px-4 py-1.5 rounded font-bold text-xs hover:bg-indigo-50 transition uppercase shadow-sm"
          >
            + Add New User
          </button>
        </div>

        <div className="p-6">
          {/* Success Message UI */}
          {success && (
            <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 text-[10px] font-bold text-center rounded uppercase tracking-widest">
              {success}
            </div>
          )}

          {/* Error Message UI */}
          {error && (
            <p className="text-red-500 text-[10px] text-center mb-4 bg-red-50 p-2 rounded border border-red-100 uppercase font-bold tracking-widest">
              {error}
            </p>
          )}

          {/* User Table */}
          <div className="overflow-x-auto border border-gray-100 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Username</th>
                  <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</th>
                  <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Role</th>
                  <th className="px-6 py-3 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 text-sm">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 italic">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-indigo-100 text-indigo-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center space-x-4">
                      <button onClick={() => handleOpenModal(user)} className="text-indigo-600 hover:text-indigo-900 font-bold uppercase text-[10px] tracking-tighter">Edit</button>
                      <button onClick={() => handleDelete(user._id)} className="text-red-500 hover:text-red-700 font-bold uppercase text-[10px] tracking-tighter">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination UI */}
          <div className="mt-8 flex justify-center items-center space-x-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 text-[10px] font-bold rounded bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition uppercase"
            >
              Prev
            </button>
            <div className="flex space-x-1">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setPage(idx + 1)}
                  className={`px-3 py-1 text-[10px] font-bold rounded transition ${page === idx + 1 ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:bg-indigo-50'}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 text-[10px] font-bold rounded bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition uppercase"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* REGISTRATION STYLE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="max-w-md w-full bg-white rounded-lg shadow-2xl overflow-hidden border-t-4 border-indigo-600">
            <div className="bg-indigo-600 p-4">
              <h3 className="text-white font-bold text-center uppercase tracking-widest text-sm">
                {isEditing ? 'Update User Data' : 'Create New Account'}
              </h3>
            </div>
            <form onSubmit={handleFormSubmit} className="p-8 space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Username</label>
                <input 
                  className="w-full p-2 border border-gray-200 rounded text-sm outline-none focus:ring-1 focus:ring-indigo-500 bg-gray-50"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email</label>
                <input 
                  type="email"
                  className="w-full p-2 border border-gray-200 rounded text-sm outline-none focus:ring-1 focus:ring-indigo-500 bg-gray-50"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  {isEditing ? 'New Password (Optional)' : 'Password'}
                </label>
                <input 
                  type="password"
                  className="w-full p-2 border border-gray-200 rounded text-sm outline-none focus:ring-1 focus:ring-indigo-500 bg-gray-50"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required={!isEditing}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Role Permission</label>
                <select 
                  className="w-full p-2 border border-gray-200 rounded text-sm outline-none bg-gray-50 font-bold text-indigo-600"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 text-gray-500 font-bold py-2 rounded text-[10px] uppercase tracking-widest hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-indigo-600 text-white font-bold py-2 rounded text-[10px] uppercase tracking-widest shadow-md hover:bg-indigo-700 transition"
                >
                  {isEditing ? 'Save Changes' : 'Register User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;








