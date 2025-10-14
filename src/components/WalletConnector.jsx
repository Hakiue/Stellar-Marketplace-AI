import React from 'react';

export default function WalletConnector({ onConnect }) {
  const wallets = [
    { id: 'xbull', name: 'xBull' },
    { id: 'freighter', name: 'Freighter' },
  ];

  return (
    <div className="wallet-connector">
      <h3>Connect Your Wallet</h3>
      <div>
        {wallets.map(w => <button key={w.id} onClick={() => onConnect(w.id)}>{`Connect with ${w.name}`}</button>)}
      </div>
    </div>
  );
}
