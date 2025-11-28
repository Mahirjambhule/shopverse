import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setName(data.name);
      setPrice(data.price);
      setImage(data.image);
      setCategory(data.category);
      setCountInStock(data.countInStock);
      setDescription(data.description);
    };
    fetchProduct();
  }, [productId]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]; 
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data); 
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${productId}`, {
        name,
        price,
        image,
        category,
        description,
        countInStock,
      });
      navigate('/admin/productlist');
    } catch (error) {
      alert('Error updating product');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <Link to="/admin/productlist" className="text-gray-500 hover:text-black mb-4 inline-block">&larr; Go Back</Link>
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Edit Product</h1>
        
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          
          {/* Name */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg focus:border-black outline-none" />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg focus:border-black outline-none" />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
            
            {/* The Text Box (Shows the URL) */}
            <input 
                type="text" 
                value={image} 
                onChange={(e) => setImage(e.target.value)} 
                className="w-full border border-gray-300 p-3 rounded-lg focus:border-black outline-none mb-2" 
                placeholder="Enter image URL"
            />

            {/* The File Select Button */}
            <input 
                type="file" 
                id="image-file"
                label="Choose File"
                onChange={uploadFileHandler}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
            />
            
            {uploading && <div className="text-sm text-gray-500 mt-1">Uploading...</div>}
          </div>

           {/* Category */}
           <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg focus:border-black outline-none" />
          </div>

          {/* Count In Stock */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Count In Stock</label>
            <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg focus:border-black outline-none" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg focus:border-black outline-none" />
          </div>

          <button type="submit" className="bg-black text-white p-4 rounded-lg font-bold hover:bg-gray-800 transition-colors mt-4">
            Update Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default ProductEditScreen;