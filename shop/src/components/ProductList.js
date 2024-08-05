import React from 'react';
import Product from './Product';

const products = [
  { id: 1, name: '이모티콘 테마 1', price: 1900, image: 'emoji_theme1.png', description: '설명.' },
  { id: 2, name: '이모티콘 테마 2', price: 1900, image: 'emoji_theme2.png', description: '설명.' }
];

function ProductList({ onProductClick }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <Product key={product.id} product={product} onClick={() => onProductClick(product)} />
      ))}
    </div>
  );
}