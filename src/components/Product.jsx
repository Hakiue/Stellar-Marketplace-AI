import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWallet } from '../context/WalletContext';

export default function Product({ product, onAccept }) {
  const [localStatus, setLocalStatus] = useState('');
  const { addToCart } = useCart();
  const { publicKey, kit, server, setStatus } = useWallet();

  return (
    <div className="product">
      <div className="product-header">
        <h3 className="product-name">{product.name}</h3>
        <span className="product-category">{product.category}</span>
      </div>
      <p className="product-description">{product.description}</p>
      <div className="product-price">
        <span className="price-label">Price:</span>
        <span className="price-value">{product.price} XLM{product.category.toLowerCase().includes('skill') ? ' per hour' : ''}</span>
      </div>
      <div className="product-actions">
        <button onClick={() => addToCart(product)} className="add-btn">Add to Cart</button>
        <button onClick={product.type === 'request' ? () => onAccept(product.id) : () => addToCart(product)} className="buy-btn">{product.type === 'request' ? 'Accept Request' : 'Buy Now'}</button>
      </div>
      {localStatus && <div className="product-status">{localStatus}</div>}
    </div>
  );
}
