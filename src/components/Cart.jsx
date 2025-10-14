import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!cartItems.length) return;
    navigate('/checkout');
  };

  return (
    <div className="cart">
      <h3>Your Cart</h3>
      {cartItems.length===0 && <div>No items in cart.</div>}
      {cartItems.map(item => (
        <div key={item.id} className="item" style={{display:'flex',justifyContent:'space-between',padding:8}}>
          <div>
            <strong>{item.name}</strong>
            <div style={{fontSize:13,color:'#666'}}>{item.quantity} × {item.price} XLM</div>
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <input type="number" value={item.quantity} min={1} style={{width:60}} onChange={(e)=>updateQuantity(item.id, parseInt(e.target.value||'1'))} />
            <button onClick={()=>removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div style={{marginTop:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div><strong>Total:</strong> {totalPrice.toFixed(2)} XLM</div>
        <div><button className="secondary" onClick={handleCheckout} disabled={cartItems.length===0}>Checkout</button></div>
      </div>
    </div>
  );
}
