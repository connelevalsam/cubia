import Link from 'next/link';
import React from 'react';

export default function EmptyCart() {
  return (
    <div className="flex flex-col justify-center items-center h-52 my-20 container">
      <div className="mx-auto flex items-center justify-center p-5 rounded-full bg-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-amber-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
      <p className="font-bold mt-6">Your cart is empty!</p>
      <p className="text-sm mt-6 mb-10">
        Browse our categories and discover our best deals!
      </p>
      <Link href="/">
        <a className="primary-button">START SHOPPING</a>
      </Link>
    </div>
  );
}
