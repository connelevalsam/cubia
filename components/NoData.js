import Link from 'next/link';
import React from 'react';
import Layout from './Layout';

export default function NoDataPage({ message }) {
  return (
    <Layout title="Cubia | No data found">
      <div className="flex flex-col justify-center items-center h-96 my-20 container">
        <div className="no-data"></div>
        <p className="font-bold mt-6">{message}</p>
        <p className="text-sm mt-6 mb-10">
          Browse other categories and discover our best deals!
        </p>
        <Link href="/">
          <a className="primary-button">CONTINUE SHOPPING</a>
        </Link>
      </div>
    </Layout>
  );
}
