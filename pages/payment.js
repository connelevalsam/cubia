import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [state, dispatch] = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;
  const router = useRouter();

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }
    setSelectedPaymentMethod(paymentMethod || 'PayPal');
  }, [paymentMethod, router, shippingAddress.address]);

  const submitHandler = (e) => {
    e.preventDeafult();
    if (!selectedPaymentMethod) {
      return toast.error('Payment type is required');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );
    router.push('/placeholder');
  };

  return (
    <Layout title="Payment method">
      <CheckoutWizard activeStep={2} />;
      <form className="mx-auto max-w-screen-sm" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment method</h1>
        {['PayPal', 'Paystack', 'CashOnDelivery'].map((payment) => (
          <div className="mb-4" key={payment}>
            <input
              type="radio"
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
              id={payment}
            />
            <label htmlFor={payment} className="p-2">
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            className="default-button"
            onClick={() => router.push('/shipping')}
            type="button"
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}
