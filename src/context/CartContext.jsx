import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('stellar-marketplace-cart');
    if (saved) {
      try { setCartItems(JSON.parse(saved)); } catch(e){ setCartItems([]); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('stellar-marketplace-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.map(p => p.id===product.id?{...p, quantity:p.quantity+1}:p);
      return [...prev, {...product, quantity:1}];
    });
  };

  const removeFromCart = (productId) => setCartItems(prev => prev.filter(p=>p.id!==productId));
  const updateQuantity = (id, qty) => { if(qty<=0) removeFromCart(id); else setCartItems(prev => prev.map(p=>p.id===id?{...p,quantity:qty}:p)); }
  const clearCart = () => setCartItems([]);
  const totalPrice = cartItems.reduce((s,p)=>s + (parseFloat(p.price)*p.quantity), 0);
  const totalQuantity = cartItems.reduce((s,p)=>s + p.quantity, 0);

  return <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice, totalQuantity }}>
    {children}
  </CartContext.Provider>
}

export function useCart(){ return useContext(CartContext); }
