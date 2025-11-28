import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const StripePayment = ({ orderId, amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`ATTEMPTING PAY URL: /api/orders/${orderId}/pay`);
    setLoading(true);

    if (!stripe || !elements) return;

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
    } else {
      try {
        const { data } = await axios.put(`/api/orders/${orderId}/pay`, {
          id: paymentMethod.id,
          status: 'succeeded',
          update_time: new Date().toISOString(),
          email_address: 'test@test.com',
        });

        setLoading(false);
        onSuccess(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="p-4 border border-gray-300 rounded-md bg-gray-50 mb-4">
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: { color: '#9e2146' },
          },
        }} />
      </div>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : `Pay $${amount}`}
      </button>
    </form>
  );
};

export default StripePayment;