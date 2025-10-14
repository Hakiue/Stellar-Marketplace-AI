import React, { useState } from 'react';
import { generateProductDescription } from '../utils/ai';
import { useWallet } from '../context/WalletContext';

export default function DescriptionGenerator({ products, onGenerated }) {
  const { connectedWalletAddress } = useWallet();
  const [loadingId, setLoadingId] = useState(null);

  const handleGenerate = async (product) => {
    setLoadingId(product.id);
    const desc = await generateProductDescription(product.name, product.category || 'general', connectedWalletAddress);
    onGenerated(product.id, desc);
    setLoadingId(null);
  };

  return (
    <div style={{marginBottom:12}}>
      <h4>AI Description Generator</h4>
      {products.map(p => (
        <div key={p.id} style={{display:'flex',gap:8,alignItems:'center',marginBottom:6}}>
          <div style={{flex:1}}><strong>{p.name}</strong> — <small>{p.description}</small></div>
          <div>
            <button onClick={() => handleGenerate(p)} disabled={loadingId===p.id}>
              {loadingId===p.id ? 'Generating...' : 'Generate Description'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
