import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import WalletConnector from '../components/WalletConnector';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import ChatAssistant from '../components/ChatAssistant';
import TransactionHistory from '../components/TransactionHistory';

export default function BuyerPage({ products }) {
  const location = useLocation();
  const { publicKey, status, handleConnect } = useWallet();
  const [searchCategory, setSearchCategory] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  React.useEffect(() => {
    if (location.state?.justCheckedOut) {
      setRefreshTrigger(prev => prev + 1);
    }
  }, [location.state]);

  return (
    <div className="app">
      <header>
        <h1>Stellar Market — Gemini AI</h1>
        <nav>
          <Link to="/">Buyer</Link> | <Link to="/seller">Seller</Link> | <Link to="/requests">Requests</Link>
        </nav>
      </header>
      <WalletConnector onConnect={handleConnect} />
      <div className="search-container">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by category (leave empty to show all)"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <ProductList products={products} searchCategory={searchCategory} />
      <Cart />
      <ChatAssistant />
      <TransactionHistory refreshTrigger={refreshTrigger} />
      <footer>
        <p>{status}</p>
        <p className="note">
          Need test XLM? Use{' '}
          <a href="https://friendbot.stellar.org" target="_blank" rel="noopener noreferrer">
            Friendbot
          </a>.
        </p>
      </footer>
    </div>
  );
}
