import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import data from '../../utils/data';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { Store } from '../../utils/Store';
import Modal from '../../components/Modal';

export default function Details() {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((id) => id.slug === slug);
  const [toggle, setToggle] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [message, setMessage] = useState('');
  const [btnText, setBtnText] = useState('');
  if (!product) {
    return <div>No product found</div>;
  }
  //   console.log(product);
  const handleAddToCart = () => {
    // this is to be able to add same item more than once
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      setToggle(true);
      setModalType(10);
      setMessage('Sorry, product out of stock!');
      setBtnText('Okay');
      return;
    }
    dispatch({ type: 'CARD_ADD_ITEM', payload: { ...product, quantity } });

    // this just add a single item
    // dispatch({ type: 'CARD_ADD_ITEM', payload: { ...product, quantity: 1 } });
  };

  const unToggle = () => {
    setToggle(false);
    setModalType(0);
    setMessage('');
    setBtnText('');
  };

  return (
    <Layout title={product.name}>
      <Modal
        toggle={toggle}
        offToggle={unToggle}
        rank={modalType}
        message={message}
        btnText={btnText}
      />
      ;
      <div className="py-2">
        <span className="flex">
          <Link href="/">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                />
              </svg>
            </a>
          </Link>
        </span>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div className="mb-3">
          <ul>
            <li>
              <h1 className="text-lg font-bold">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="flex justify-between mb-2">
              <div>Price</div>
              <div>&#8358;{product.price}</div>
            </div>
            <div className="flex justify-between mb-2">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
            </div>
            <button className="primary-button w-full" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
