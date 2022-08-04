import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useState } from 'react';
import EmptyCart from '../components/EmptyCart';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';

function Cart() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const {
    cart: { cartItems },
  } = state;
  const i = 1;

  const handleRemoveItem = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const handleUpdateCart = async (item, qty) => {
    // if (value === qty) {
    //   setIsAddDisabled(true);
    //   setIsRemoveDisabled(false);
    // } else {
    //   setValue(value + 1);

    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }

    dispatch({ type: 'CARD_ADD_ITEM', payload: { ...item, quantity } });

    toast.success('Product updated in cart successfully.');
  };

  const [value, setValue] = useState(1);
  const [isAddDisabled, setIsAddDisabled] = useState(false);
  const [isRemoveDisabled, setIsRemoveDisabled] = useState(true);

  // const addValue = (qty) => {
  //   if (value === qty) {
  //     setIsAddDisabled(true);
  //     setIsRemoveDisabled(false);
  //   } else {
  //     setValue(value + 1);
  //   }
  // };

  return (
    <Layout title={'Shopping Cart'}>
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            {cartItems.map((item) => (
              <article key={item.id} className="mt-3 bg-gray-50 p-5">
                <div className="flex justify-around">
                  <Link href={`/products/${item.slug}`}>
                    <a className="flex grow">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                      ></Image>
                      <div className="flex flex-col grow ml-5">
                        <p className="font-medium">{item.name}</p>
                        <p className="font-light text-sm">{item.description}</p>
                        <p className="font-medium text-gray-700 text-sm">
                          {item.brand}
                        </p>
                      </div>
                    </a>
                  </Link>
                  <div className="flex flex-col mx-5">
                    <p className="font-bold text-lg">
                      &#8358;{item.price.toLocaleString('en-US')}
                    </p>
                    <p className="font-medium text-sm">Qty:</p>
                    <select
                      value={item.quantity}
                      onChange={(e) => handleUpdateCart(item, e.target.value)}
                    >
                      {[...Array(item.countInStock).keys()].map((i) => (
                        <option value={i + 1} key={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    {/* <div className="flex justify-between items-center">
                      <button className="primary-button" disabled="true">
                        -
                      </button>
                      {item.quantity}
                      <button
                        className="primary-button"
                        onClick={handleUpdateCart(item, 1)}
                      >
                        +
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-amber-500 font-bold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <button
                    className="text-amber-500 font-bold"
                    onClick={() => handleRemoveItem(item)}
                  >
                    Remove Item
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div>
            <div className="card p-5">
              <ul>
                <li>
                  <div className="pb-3 md:text-sm lg:text-lg font-semibold">
                    Subtotal ({cartItems.reduce((i, j) => i + j.quantity, 0)}) :
                    &#8358;
                    {cartItems
                      .reduce(
                        (i, j) => i + j.quantity * j.price, //.replace(',', ''),
                        0
                      )
                      .toLocaleString('en-US')}
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => router.push('login?redirect=/shipping')}
                    className="primary-button w-full"
                  >
                    Check out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
