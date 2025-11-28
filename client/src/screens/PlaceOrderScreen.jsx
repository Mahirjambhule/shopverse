import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // --- MATH HELPER ---
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };


  const itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);


  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);


  const placeOrderHandler = async () => {
    try {
      const res = await axios.post('/api/orders', {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      });


      dispatch(clearCartItems());

      navigate(`/order/${res.data._id}`);


    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-8">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8 text-sm font-bold text-gray-400 uppercase tracking-wide max-w-lg mx-auto">
        <span className="text-black border-b-2 border-black pb-1">1. Shipping</span>
        <span className="text-black border-b-2 border-black pb-1">2. Payment</span>
        <span className="text-black border-b-2 border-black pb-1">3. Place Order</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Info */}
        <div className="md:col-span-2 flex flex-col gap-6">

          {/* Shipping Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Shipping</h2>
            <p className="text-gray-600">
              <span className="font-bold text-gray-800">Address: </span>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          {/* Payment Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Payment Method</h2>
            <p className="text-gray-600">
              <span className="font-bold text-gray-800">Method: </span>
              {cart.paymentMethod}
            </p>
          </div>

          {/* Order Items */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div className="flex flex-col gap-4">
                {cart.cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <Link to={`/product/${item._id}`} className="hover:text-blue-600 text-gray-800 font-medium">
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-gray-600">
                      {item.qty} x ${item.price} = <span className="font-bold text-gray-900">${(item.qty * item.price).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Summary */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold mb-6 text-gray-900">Order Summary</h2>

            <div className="flex justify-between mb-3 text-gray-600">
              <span>Items</span>
              <span>${itemsPrice}</span>
            </div>
            <div className="flex justify-between mb-3 text-gray-600">
              <span>Shipping</span>
              <span>${shippingPrice}</span>
            </div>
            <div className="flex justify-between mb-3 text-gray-600">
              <span>Tax</span>
              <span>${taxPrice}</span>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <div className="flex justify-between mb-6 text-xl font-bold text-gray-900">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>

            <button
              onClick={placeOrderHandler}
              className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-lg"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;