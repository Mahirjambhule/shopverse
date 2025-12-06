import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="container mx-auto p-4 mt-8">
      <Link to="/" className="inline-block mb-6 text-gray-600 hover:text-black font-medium transition-colors">
         &larr; Continue Shopping
      </Link>
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="md:col-span-2">
          {cartItems.length === 0 ? (
            <div className="bg-blue-50 p-4 rounded-lg text-blue-700">
              Your cart is empty. <Link to="/" className="font-bold underline">Go Back</Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <Link to={`/product/${item._id}`} className="text-lg font-semibold hover:text-blue-600 text-gray-800">
                      {item.name}
                    </Link>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <span className="font-bold text-gray-700">${item.price}</span>
                    
                    {/* Qty Selector inside Cart */}
                    <select 
                      value={item.qty} 
                      onChange={(e) => dispatch(addToCart({...item, qty: Number(e.target.value)}))}
                      className="border border-gray-300 rounded p-1"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))}
                    </select>

                    <button 
                      onClick={() => removeFromCartHandler(item._id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Items:</span>
              <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
            </div>
            <div className="flex justify-between mb-6 text-2xl font-bold text-gray-900">
              <span>Total:</span>
              <span>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
            </div>
            <button 
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
              className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors disabled:bg-gray-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;