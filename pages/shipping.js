import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function Shipping() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { cart } = state;
  const { shippingAddress } = cart;
  const [data, setData] = useState([]);
  const [values, setValues] = useState('');

  const fetchData = () => {
    const headers = new Headers();
    headers.append(
      'X-CSCAPI-KEY',
      'OG1vNVk4aWp5NnpEM3R6MERkUjJyVGNjZ0dsRFg5eDlXeFhyN0NyZg=='
    );
    const requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    };
    fetch('https://api.countrystatecity.in/v1/countries', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log('result', result);
        // console.log(typeof result);
        setData(result);
        setValues(shippingAddress.country ? shippingAddress.country : data[0]);
      })
      .catch((error) => console.log('error', error));

    // fetch(
    //   `https://api.countrystatecity.in/v1/countries/${values}/cities`,
    //   requestOptions
    // )
    //   .then((response) => response.json())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('country', shippingAddress.country);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, shippingAddress]);

  const eventSubmit = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });

    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );

    router.push('/deliverymethod');
  };
  // let countries = Object.keys(data);
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(eventSubmit)}
      >
        <div className="m-5">
          <div className="container w-full p-6 m-auto bg-white border-t border-amber-50 rounded shadow-lg shadow-amber-300/50 lg:max-w-md">
            <h1 className="text-3xl font-semibold text-center text-amber-600">
              Shipping Address
            </h1>
            <div>
              <label htmlFor="fullName" className="block text-sm text-gray-800">
                Full name
              </label>
              <input
                {...register('fullName', {
                  required: 'Please enter full name',
                })}
                id="fullName"
                autoFocus
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-amber-400 focus:ring-amber-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.fullName && (
                <div className="text-red-500 text-sm">
                  {errors.fullName.message}
                </div>
              )}
            </div>
            <div className="mt-4">
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm text-gray-800"
                >
                  Address
                </label>
                <input
                  {...register('address', {
                    required: 'Please enter address',
                    minLength: {
                      value: 3,
                      message: 'address is more than 2 characters',
                    },
                  })}
                  id="address"
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-amber-400 focus:ring-amber-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.address && (
                  <div className="text-red-500 text-sm">
                    {errors.address.message}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm text-gray-800"
                  >
                    Country
                  </label>
                  <select
                    {...register('country', {
                      required: 'Please enter Country',
                    })}
                    id="country"
                    className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-amber-400 focus:ring-amber-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={values ? values : 'Select country'}
                    onChange={(e) => setValues(e.target.value)}
                  >
                    {data &&
                      data.map((country) => {
                        console.log(country);
                        return (
                          <option value={country.name} key={country.id}>
                            {country.name}
                          </option>
                        );
                      })}
                  </select>
                  {errors.country && (
                    <div className="text-red-500 text-sm">
                      {errors.country.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <label htmlFor="city" className="block text-sm text-gray-800">
                    City
                  </label>
                  <input
                    {...register('city', {
                      required: 'Please enter city',
                    })}
                    id="city"
                    className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-amber-400 focus:ring-amber-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.city && (
                    <div className="text-red-500 text-sm">
                      {errors.city.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-sm text-gray-800"
                  >
                    Postal Code
                  </label>
                  <input
                    {...register('postalCode', {
                      required: 'Please enter postal code',
                    })}
                    id="postalCode"
                    className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-amber-400 focus:ring-amber-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.postalCode && (
                    <div className="text-red-500 text-sm">
                      {errors.postalCode.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-amber-600 rounded-md hover:bg-amber-500 focus:outline-none focus:bg-amber-600">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
}

Shipping.auth = true;
