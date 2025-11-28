import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchProducts();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        fetchProducts(); 
      } catch (error) {
        alert('Error deleting product');
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Create a new product?')) {
        try {
            const { data } = await axios.post('/api/products', {});
            navigate(`/admin/product/${data._id}/edit`);
        } catch (error) {
            alert('Error creating product');
        }
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="container mx-auto p-4 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <button 
            onClick={createProductHandler}
            className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800"
        >
            <FaPlus /> Create Product
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="w-full text-left text-gray-600">
          <thead className="bg-gray-50 text-gray-700 uppercase font-bold text-xs">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 text-xs font-mono">{product._id}</td>
                <td className="p-4 font-semibold text-gray-900">{product.name}</td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4 flex justify-center gap-3">
                  <Link 
                    to={`/admin/product/${product._id}/edit`} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </Link>
                  <button 
                    onClick={() => deleteHandler(product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListScreen;