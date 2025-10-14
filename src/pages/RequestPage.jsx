import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RequestForm from '../components/RequestForm';
import ProductList from '../components/ProductList';
import { generateProductDescription } from '../utils/ai';
import { useWallet } from '../context/WalletContext';

export default function RequestPage({ products, onAddRequest, onRemoveProduct }) {
  const { connectedWalletAddress } = useWallet();
  const [issue, setIssue] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateSuggestion = async () => {
    if (!issue.trim()) return;
    setLoading(true);
    try {
      const aiSuggestion = await generateProductDescription('Custom Solution Suggestion', 'n8n', connectedWalletAddress);
      setSuggestion(aiSuggestion);
    } catch (err) {
      console.error('Failed to generate suggestion', err);
      setSuggestion('Failed to generate suggestion. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const requestProducts = products.filter(p => p.type === 'request');

  return (
    <div className="app request-page">
      <header>
        <h1>Stellar Market — Job Requests</h1>
        <nav>
          <Link to="/">Buyer</Link> | <Link to="/seller">Seller</Link> | <Link to="/requests">Requests</Link>
        </nav>
      </header>
      <RequestForm onAdd={onAddRequest} />
      <div style={{marginBottom: 20, padding: 16, border: '1px solid #ccc', borderRadius: 8}}>
        <h4>Get AI-Tailored Suggestion for Your Issue</h4>
        <textarea
          placeholder="Describe your problem or what you need..."
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          rows={4}
          style={{width: '100%', padding: 8, marginBottom: 8}}
        />
        <button onClick={handleGenerateSuggestion} disabled={loading} style={{padding: 8, background: '#28a745', color: 'white', border: 'none', borderRadius: 4}}>
          {loading ? 'Generating...' : 'Generate Suggestion'}
        </button>
        {suggestion && (
          <div style={{marginTop: 16, padding: 12, background: '#f8f9fa', borderRadius: 8}}>
            <strong>AI Suggestion:</strong>
            <p>{suggestion}</p>
          </div>
        )}
      </div>
      <ProductList products={requestProducts} onAccept={onRemoveProduct} />
      <footer>
        <p>Post your job requests here. Sellers can view and take on these jobs.</p>
      </footer>
    </div>
  );
}
