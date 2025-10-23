import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const limit = 2;

  useEffect(() => {
    const fetchUsers = async () => {
      if (!auth?.accessToken) return;
      try {
        const res = await axios.get(`/api/users?page=${page}&limit=${limit}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        });
        setUsers(res.data.users);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError('Failed to fetch users');
      }
    };
    fetchUsers();
  }, [page, auth]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Failed to delete user:', error);
      setError('Failed to delete user');
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, idx) => (
              <tr
                key={user._id}
                className={idx % 2 === 0 ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-100'}
              >
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center space-x-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 transition"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 rounded-lg transition ${
              page === idx + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;


