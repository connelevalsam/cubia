import Product from '../../../models/Product';
import db from '../../../utils/DB';

const getProducts = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  return res.send(product);
};

export default getProducts;
