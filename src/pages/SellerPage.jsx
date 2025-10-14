import React from 'react';
import { Link } from 'react-router-dom';
import DescriptionGenerator from '../components/DescriptionGenerator';
import AddProductForm from '../components/AddProductForm';

export default function SellerPage({ products, onGenerated, onAddProduct }) {
  return (
    <div className="app">
      <header>
        <h1>Stellar Market — Seller Dashboard</h1>
        <nav>
          <Link to="/">Buyer</Link> | <Link to="/seller">Seller</Link> | <Link to="/requests">Requests</Link>
        </nav>
      </header>
      <AddProductForm onAdd={onAddProduct} />
      <DescriptionGenerator products={products} onGenerated={onGenerated} />
    </div>
  );
}
