import React from 'react';

function Product({ product, onClick }) {
  return (
    <div className="product" onClick={onClick}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₩{product.price}</p>
    </div>
  );
}

export default Product;
