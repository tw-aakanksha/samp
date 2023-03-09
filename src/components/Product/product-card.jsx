import './style.css';

import { UserContext } from '../../App';
import { useContext } from 'react';

const Product = ({ product }) => {
  const userLogInfo = useContext(UserContext);

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={`${product.name}`} />
      <div className="footer">
        <span className="name">{product.name}</span>
        {userLogInfo.isLoggedIn ? (
          <span className="price">${product.price}</span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Product;
