import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));

    navigate('/payment');
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-gray-100">

        {/* Progress Steps (Visual only for now) */}
        <div className="flex justify-between mb-8 text-sm font-bold text-gray-400 uppercase tracking-wide">
          <span className="text-black border-b-2 border-black pb-1">1. Shipping</span>
          <span>2. Payment</span>
          <span>3. Place Order</span>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-gray-900">Shipping Address</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
            <input
              type="text"
              required
              placeholder="Enter street address"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-black"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
              <input
                type="text"
                required
                placeholder="Enter city"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-black"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Postal Code</label>
              <input
                type="text"
                required
                placeholder="Zip code"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-black"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
            <input
              type="text"
              required
              placeholder="Enter country"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-black"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white p-4 rounded-lg font-bold hover:bg-gray-800 transition-colors mt-4"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;