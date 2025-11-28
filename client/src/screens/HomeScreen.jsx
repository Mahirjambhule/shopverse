import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams} from 'react-router-dom'; 

const HomeScreen = () => {
    const { keyword } = useParams(); 

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {

      const { data } = await axios.get(keyword ? `/api/products?keyword=${keyword}` : '/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, [keyword]); 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">
        Latest Products
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (

          <Link 
            to={`/product/${product._id}`} 
            key={product._id} 
            className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <div className="h-64 overflow-hidden bg-gray-50 flex items-center justify-center relative">
               <img 
                 src={product.image} 
                 alt={product.name} 
                 className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300" 
               />
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-sm text-blue-600 font-medium">
                  View Details
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;