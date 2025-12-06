import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePayment from '../components/StripePayment';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stripePromise, setStripePromise] = useState(null);


  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${orderId}`);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);


  useEffect(() => {
    const getStripeKey = async () => {

      const { data: publishableKey } = await axios.get('/api/config/stripe');
      setStripePromise(loadStripe(publishableKey));
    };
    getStripeKey();
  }, []);

  const successPaymentHandler = () => {
    alert("Payment Successful!");
    window.location.reload();
  }

  if (loading) return <div className="text-center mt-20">Loading Order...</div>;
  if (!order) return <div className="text-center mt-20 text-red-500">Order Not Found</div>;


  return (
    <div className="container mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Order {order._id}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-2 flex flex-col gap-6">

          {/* Shipping Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Shipping</h2>
            <p className="mb-4">
              <strong className="text-gray-800">Name: </strong> {order.user.name} <br />
              <strong className="text-gray-800">Email: </strong> <a href={`mailto:${order.user.email}`} className="text-blue-600 underline">{order.user.email}</a> <br />
              <strong className="text-gray-800">Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <div className="bg-green-100 text-green-800 p-3 rounded font-bold">Delivered on {order.deliveredAt}</div>
            ) : (
              <div className="bg-red-100 text-red-800 p-3 rounded font-bold">Not Delivered</div>
            )}
          </div>

          {/* Payment Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Payment Method</h2>
            <p className="mb-4">
              <strong className="text-gray-800">Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <div className="bg-green-100 text-green-800 p-3 rounded font-bold">Paid on {order.paidAt?.substring(0, 10)}</div>
            ) : (
              <div className="bg-red-100 text-red-800 p-3 rounded font-bold">Not Paid</div>
            )}
          </div>

          {/* Order Items */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Order Items</h2>
            <div className="flex flex-col gap-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <Link to={`/product/${item.product}`} className="hover:text-blue-600 text-gray-800 font-medium">
                      {item.name}
                    </Link>
                  </div>
                  <div className="text-gray-600">
                    {item.qty} x ${item.price} = <span className="font-bold text-gray-900">${(item.qty * item.price).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-gray-900">Order Summary</h2>

            <div className="flex justify-between mb-3 text-gray-600">
              <span>Items</span>
              <span>${order.itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-3 text-gray-600">
              <span>Shipping</span>
              <span>${order.shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-3 text-gray-600">
              <span>Tax</span>
              <span>${order.taxPrice.toFixed(2)}</span>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <div className="flex justify-between mb-6 text-xl font-bold text-gray-900">
              <span>Total</span>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>

            {/* PAY BUTTON SECTION */}
            {!order.isPaid && stripePromise && (
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">Pay with Card</h3>
                <Elements stripe={stripePromise}>
                  <StripePayment
                    amount={order.totalPrice}
                    orderId={order._id}
                    onSuccess={successPaymentHandler}
                  />
                </Elements>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;