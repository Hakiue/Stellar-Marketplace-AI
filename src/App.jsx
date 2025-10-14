import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import BuyerPage from './pages/BuyerPage';
import SellerPage from './pages/SellerPage';
import RequestPage from './pages/RequestPage';
import CheckoutPage from './pages/CheckoutPage';
import WalletConnectionPage from './pages/WalletConnectionPage';
import { WalletProvider } from './context/WalletContext';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  const initialProducts = [
    { id: 1, name: 'Stellar T-Shirt', description: 'Nice tee', price: 5, seller: 'GASAFXGOF7BY6NDVESCDERFBUBTF4SHCJWO7GWWM3YPOEDUAIUXNF3ZD', category: 'apparel' },
    { id: 2, name: 'XLM Mug', description: 'Ceramic mug', price: 10, seller: 'GASAFXGOF7BY6NDVESCDERFBUBTF4SHCJWO7GWWM3YPOEDUAIUXNF3ZD', category: 'home' },
    { id: 3, name: 'React Development Skill', description: 'Expert React developer available for hire', price: 50, seller: 'GASAFXGOF7BY6NDVESCDERFBUBTF4SHCJWO7GWWM3YPOEDUAIUXNF3ZD', category: 'skills' },
  ];

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleGenerated = (id, desc) => {
    setProducts(products.map(p => p.id === id ? { ...p, description: desc } : p));
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <WalletProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<BuyerPage products={products} />} />
          <Route path="/seller" element={<SellerPage products={products} onGenerated={handleGenerated} onAddProduct={handleAddProduct} />} />
          <Route path="/requests" element={<RequestPage products={products} onAddRequest={handleAddProduct} onRemoveProduct={(id) => setProducts(products.filter(p => p.id !== id))} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/wallet-connect" element={<WalletConnectionPage />} />
        </Routes>
      </CartProvider>
    </WalletProvider>
  );
}

export default App;
