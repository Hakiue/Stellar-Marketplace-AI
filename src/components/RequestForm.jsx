import React, { useState } from 'react';

export default function RequestForm({ onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('n8n workflow');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !description) return;
    setLoading(true);
    try {
      const newRequest = {
        id: Date.now(),
        name,
        price: parseFloat(price).toFixed(2),
        category,
        description,
        type: 'request',
        seller: 'buyer-request' // Placeholder, since it's from buyer
      };
      onAdd(newRequest);
      setName('');
      setPrice('');
      setCategory('n8n workflow');
      setDescription('');
    } catch (err) {
      console.error('Failed to add request', err);
      alert('Failed to post request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{marginBottom: 20, padding: 16, border: '1px solid #ccc', borderRadius: 8}}>
      <h4>Post a Job Request</h4>
      <form onSubmit={handleSubmit}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <input
            type="text"
            placeholder="Job Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{padding: 8}}
          />
          <input
            type="number"
            placeholder="Budget (XLM)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="0.01"
            required
            style={{padding: 8}}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{padding: 8}}>
            <option value="n8n workflow">n8n Workflow</option>
            <option value="AI training">AI Training</option>
          </select>
          <textarea
            placeholder="Describe what you need (the problem to solve)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            style={{padding: 8}}
          />
          <button type="submit" disabled={loading} style={{padding: 8, background: '#007bff', color: 'white', border: 'none', borderRadius: 4}}>
            {loading ? 'Posting...' : 'Post Request'}
          </button>
        </div>
      </form>
    </div>
  );
}
