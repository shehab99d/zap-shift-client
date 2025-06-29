import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../Loading';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '18px',
      color: '#32325d',
      fontFamily: 'sans-serif',
      lineHeight: '48px',
      '::placeholder': { color: '#aab7c4' },
    },
    invalid: {
      color: '#fa755a',
    },
  },
};

const PaymentForm = () => {
  const { parcelId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ['parcels', parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/parcels/${parcelId}`);
      return res.data;
    }
  });

  if (isPending) {
    return <Loading />;
  }

  const amount = parcelInfo.delivery_cost;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('Stripe error:', error.message);
      setError(error.message);
    } else {
      setError('');
      const res = await axiosSecure.post('/create-payment-intent', {
        amountInCents,
        parcelId
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          const paymentData = {
            parcelId,
            email: user.email,
            amount,
            transactionId: result.paymentIntent.id
          };

          const paymentRes = await axiosSecure.post('/api/payment-success', paymentData);
          if (paymentRes.data.paymentId) {
            Swal.fire({
              title: '✅ Payment Successful!',
              html: `<p>Your transaction ID:</p><code>${result.paymentIntent.id}</code>`,
              icon: 'success',
              confirmButtonText: 'Go to My Parcels',
            }).then(() => {
              navigate('/dashboard/myParcels');
            });
          }
        }
      }
    }
  };

  // ✅ JSX must be returned outside the handleSubmit function
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow space-y-6"
    >
      <div className="border-2 rounded-md overflow-hidden">
        <CardElement className='max-w-6xl' options={CARD_ELEMENT_OPTIONS} />
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
      >
        Pay ৳{amount}
      </button>

      <p className="text-black">Please fill this form Please fill this form Please fill this form</p>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}; 

export default PaymentForm;
