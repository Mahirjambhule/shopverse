import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('Stripe');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-gray-100">

        {/* Progress Steps */}
        <div className="flex justify-between mb-8 text-sm font-bold text-gray-400 uppercase tracking-wide">
          <span className="text-black border-b-2 border-black pb-1">1. Shipping</span>
          <span className="text-black border-b-2 border-black pb-1">2. Payment</span>
          <span>3. Place Order</span>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-gray-900">Payment Method</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                className="w-5 h-5 text-black focus:ring-black"
                label="Stripe"
                name="paymentMethod"
                value="Stripe"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="font-medium text-gray-800">Credit Card (Stripe)</span>
            </label>
          </div>

          <button
            type="submit"
            className="bg-black text-white p-4 rounded-lg font-bold hover:bg-gray-800 transition-colors mt-4"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;