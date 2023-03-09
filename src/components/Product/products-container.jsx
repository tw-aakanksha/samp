import SHOP_DATA from '../../shopdata.json';
import './style.css';
import Product from './product-card';
import Ad from '../news/ad';
import Home from '../Home/homepage';
const Shop = () => {
  return (
    <>
      <Ad />
      <Home />

      <div className="product-card-container">
        {SHOP_DATA.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Shop;
