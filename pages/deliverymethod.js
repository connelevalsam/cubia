import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function DeliveryScreen() {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('');
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, deliveryMethod } = cart;
  const router = useRouter();
  const readyDate = new Date();

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }
    console.log(deliveryMethod);
    setSelectedDeliveryMethod(deliveryMethod || 'Door Delivery');
  }, [deliveryMethod, router, shippingAddress.address]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedDeliveryMethod) {
      return toast.error('Delivery type is required');
    }
    dispatch({ type: 'SAVE_DELIVERY_METHOD', payload: selectedDeliveryMethod });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        deliveryMethod: selectedDeliveryMethod,
      })
    );
    router.push('/payment');
  };

  return (
    <Layout title="Delivery method">
      <CheckoutWizard activeStep={2} />;
      <form className="mx-auto max-w-screen-sm" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Delivery method</h1>
        {['Door Delivery', 'Drop Zone'].map((delivery) => (
          <div className="mb-4" key={delivery}>
            <input
              type="radio"
              name="deliveryMethod"
              className="p-2 outline-none focus:ring-0"
              checked={selectedDeliveryMethod === delivery}
              onChange={() => setSelectedDeliveryMethod(delivery)}
              id={delivery}
            />
            <label htmlFor={delivery} className="p-2">
              <span className="font-bold">{delivery}</span>
              <div className="p-2">
                {delivery == 'Door Delivery' ? (
                  <div>
                    <span className="text-gray-500">Delivered between </span>
                    <span className="font-bold">
                      {readyDate.getFullYear() +
                        '-' +
                        (readyDate.getMonth() + 1) +
                        '-' +
                        (readyDate.getDate() + 14)}
                    </span>
                    <span className="text-gray-500"> and </span>
                    <span className="font-bold">
                      {readyDate.getFullYear() +
                        '-' +
                        (readyDate.getMonth() + 1) +
                        '-' +
                        (readyDate.getDate() + 17)}
                    </span>
                    <ul className="list-disc list-inside text-sm font-semibold">
                      <li>Cubia prime members enjoy free delivery</li>
                      <li>
                        Large items (e.g. Freezers) may arrive 2 business days
                        later than other products.
                      </li>
                      <li>
                        Ensure your address is current as Delivery Agents would
                        only deliver to the stated address.
                      </li>
                      <li>
                        Package may arrive before the delivery date. Payment
                        must be made before collection as Delivery agents are
                        not allowed to open a package
                      </li>
                      <li>
                        On delivery day, delivery time may vary due to possible
                        eventualities.
                      </li>
                      <li>
                        Free return within 15 days for Official Store items and
                        7 days for other eligible items
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div>
                    <span className="text-gray-500">Dropped between </span>
                    <span className="font-bold">
                      {readyDate.getFullYear() +
                        '-' +
                        (readyDate.getMonth() + 1) +
                        '-' +
                        (readyDate.getDate() + 12)}
                    </span>
                    <span className="text-gray-500"> and </span>
                    <span className="font-bold">
                      {readyDate.getFullYear() +
                        '-' +
                        (readyDate.getMonth() + 1) +
                        '-' +
                        (readyDate.getDate() + 15)}
                    </span>
                    <ul className="list-disc list-inside text-sm font-semibold">
                      <li>Cubia prime members enjoy free delivery</li>
                      <li>
                        Large items (e.g. Freezers) may arrive 2 business days
                        later than other products.
                      </li>
                      <li>Scheduled pickup at your own convenience</li>
                      <li>
                        Free return within 15 days for Official Store items and
                        7 days for other eligible items
                      </li>
                    </ul>
                  </div>
                )}
              </div>
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
