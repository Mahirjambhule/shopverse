import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';

const OrderListScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchOrders();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders');
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="container mx-auto p-4 mt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">All Orders</h1>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="w-full text-left text-gray-600">
          <thead className="bg-gray-50 text-gray-700 uppercase font-bold text-xs">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">User</th>
              <th className="p-4">Date</th>
              <th className="p-4">Total</th>
              <th className="p-4">Paid</th>
              <th className="p-4">Delivered</th>
              <th className="p-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 text-xs font-mono">{order._id}</td>
                <td className="p-4 font-semibold">{order.user && order.user.name}</td>
                <td className="p-4">{order.createdAt.substring(0, 10)}</td>
                <td className="p-4 font-bold text-gray-900">${order.totalPrice}</td>
                <td className="p-4">
                  {order.isPaid ? (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">
                        {order.paidAt.substring(0, 10)}
                    </span>
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                </td>
                <td className="p-4">
                  {order.isDelivered ? (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">
                        {order.deliveredAt.substring(0, 10)}
                    </span>
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                </td>
                <td className="p-4">
                  <Link 
                    to={`/order/${order._id}`} 
                    className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderListScreen;