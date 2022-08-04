import { useContext, useState } from 'react';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/DB';
import { Store } from '../utils/Store';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from '../components/Modal';

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [toggle, setToggle] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [message, setMessage] = useState('');
  const [btnText, setBtnText] = useState('');

  const handleAddToCart = async (product) => {
    // this is to be able to add same item more than once
    const existItem = cart.cartItems.find((item) => item.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      setToggle(true);
      setModalType(10);
      setMessage('Sorry, product out of stock!');
      setBtnText('Okay');
      return;
    }
    dispatch({ type: 'CARD_ADD_ITEM', payload: { ...product, quantity } });

    toast.success(`${product.name} added to cart successfully!`);
  };

  const unToggle = () => {
    setToggle(false);
    setModalType(0);
    setMessage('');
    setBtnText('');
  };

  return (
    <Layout title={'Home'}>
      <Modal
        toggle={toggle}
        offToggle={unToggle}
        rank={modalType}
        message={message}
        btnText={btnText}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            handleAddToCart={() => handleAddToCart(product)}
            key={product.id}
          >
            {' '}
          </ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
