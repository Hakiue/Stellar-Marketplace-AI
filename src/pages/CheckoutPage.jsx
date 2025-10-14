import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { useCart } from '../context/CartContext';
import { TransactionBuilder, Operation, Asset, Networks } from '@stellar/stellar-sdk';

export default function CheckoutPage() {
  const { publicKey, kit, server, setStatus } = useWallet();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!publicKey) {
      navigate('/wallet-connect');
    }
  }, [publicKey, navigate]);

  if (!publicKey) {
    return null;
  }

  const handleCheckout = async () => {
    if (!cartItems.length) return;
    setLoading(true);
    setStatus('Building checkout transaction...');
    try {
      const account = await server.loadAccount(publicKey);
      const fee = await server.fetchBaseFee();
      let txBuilder = new TransactionBuilder(account, { fee, networkPassphrase: Networks.TESTNET });
      cartItems.forEach(item => {
        const amount = (parseFloat(item.price) * item.quantity).toFixed(7);
        txBuilder = txBuilder.addOperation(Operation.payment({ destination: item.seller, asset: Asset.native(), amount: amount.toString() }));
      });
      const tx = txBuilder.setTimeout(60).build();
      const { signedTxXdr } = await kit.signTransaction(tx.toXDR(), { address: publicKey, networkPassphrase: Networks.TESTNET });
      const signedTx = TransactionBuilder.fromXDR(signedTxXdr, Networks.TESTNET);
      const res = await server.submitTransaction(signedTx);
      setStatus(`Checkout successful — tx: ${res.hash}`);
      clearCart();
      navigate('/', { state: { justCheckedOut: true } });
    } catch (err) {
      console.error('Checkout error', err);
      setStatus('Checkout failed. Check console.');
    } finally { setLoading(false); }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            {cartItems.map(item => (
              <div key={item.id} className="item" style={{display:'flex',justifyContent:'space-between',padding:8}}>
                <div>
                  <strong>{item.name}</strong>
                  <div style={{fontSize:13,color:'#666'}}>{item.quantity} × {item.price} XLM</div>
                </div>
                <div>{(item.price * item.quantity).toFixed(2)} XLM</div>
              </div>
            ))}
            <div style={{marginTop:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div><strong>Total:</strong> {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} XLM</div>
            </div>
          </div>
          <button onClick={handleCheckout} className="checkout-button" disabled={loading}>
            {loading ? 'Processing...' : 'Complete Checkout'}
          </button>
        </>
      )}
    </div>
  );
}
