import React, { useState } from 'react';
import { generateProductDescription } from '../utils/ai';
import { useWallet } from '../context/WalletContext';

export default function AddProductForm({ onAdd }) {
  const { connectedWalletAddress } = useWallet();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('general');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !description) return;
    setLoading(true);
    try {
      const improvedDesc = await generateProductDescription(name, category, connectedWalletAddress);
      const newProduct = {
        id: Date.now(),
        name,
        price: parseFloat(price).toFixed(2),
        category,
        description: improvedDesc,
        quantity: parseInt(quantity),
        seller: 'GASAFXGOF7BY6NDVESCDERFBUBTF4SHCJWO7GWWM3YPOEDUAIUXNF3ZD' // Hardcoded seller address
      };
      onAdd(newProduct);
      setName('');
      setPrice('');
      setCategory('general');
      setDescription('');
      setQuantity(1);
    } catch (err) {
      console.error('Failed to generate description', err);
      alert('Failed to improve description. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{marginBottom: 20, padding: 16, border: '1px solid #ccc', borderRadius: 8}}>
      <h4>Add New Product</h4>
      <form onSubmit={handleSubmit}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{padding: 8}}
          />
          <input
            type="number"
            placeholder={category.toLowerCase().includes('skill') ? "Price per hour (XLM)" : "Price (XLM)"}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="0.01"
            required
            style={{padding: 8}}
          />
          <input
            type="text"
            placeholder="Category (e.g., apparel, skills)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{padding: 8}}
          />
          <textarea
            placeholder="Short Description (required, will be improved by AI)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
            style={{padding: 8}}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            min="1"
            required
            style={{padding: 8}}
          />
          <button type="submit" disabled={loading} style={{padding: 8, background: '#007bff', color: 'white', border: 'none', borderRadius: 4}}>
            {loading ? 'Improving Description...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
