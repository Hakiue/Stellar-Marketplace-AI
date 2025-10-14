import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import WalletConnector from '../components/WalletConnector';

export default function WalletConnectionPage() {
  const { publicKey, status, handleConnect } = useWallet();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (publicKey) {
      navigate('/checkout');
    }
  }, [publicKey, navigate]);

  return (
    <div className="wallet-connection-page">
      <h1>Connect Your Wallet</h1>
      <p>Please connect your Stellar wallet to proceed to checkout.</p>
      <WalletConnector onConnect={handleConnect} />
      <p className="status">{status}</p>
    </div>
  );
}
