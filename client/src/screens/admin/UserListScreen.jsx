import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const UserListScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchUsers();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/users');
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`/api/users/${id}`);
        fetchUsers();
      } catch (error) {
        alert('Error deleting user');
      }
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="container mx-auto p-4 mt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Users</h1>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="w-full text-left text-gray-600">
          <thead className="bg-gray-50 text-gray-700 uppercase font-bold text-xs">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4 text-center">Admin</th>
              <th className="p-4 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 text-xs font-mono">{user._id}</td>
                <td className="p-4 font-semibold text-gray-900">{user.name}</td>
                <td className="p-4"><a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">{user.email}</a></td>
                <td className="p-4 text-center">
                  {user.isAdmin ? (
                    <FaCheck className="text-green-500 mx-auto" />
                  ) : (
                    <FaTimes className="text-red-500 mx-auto" />
                  )}
                </td>
                <td className="p-4 text-center">
                  {!user.isAdmin && ( 
                      <button onClick={() => deleteHandler(user._id)} className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListScreen;