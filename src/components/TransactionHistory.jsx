import React, { useEffect, useState } from 'react';
import { useWallet } from '../context/WalletContext';

export default function TransactionHistory({ refreshTrigger }) {
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(false);
  const { publicKey, server } = useWallet();

  useEffect(() => {
    if (!publicKey) return;
    let mounted = true;
    const fetchTx = async () => {
      setLoading(true);
      try {
        const res = await server.transactions().forAccount(publicKey).order('desc').limit(10).call();
        if (!mounted) return;
        setTxns(res.records || []);
      } catch (err) {
        console.error(err);
      } finally { if (mounted) setLoading(false); }
    };
    fetchTx();
    const id = setInterval(fetchTx, 20000);
    return () => { mounted=false; clearInterval(id); };
  }, [publicKey, server, refreshTrigger]);

  return (
    <div className="transaction-history">
      <h4>Recent Transactions</h4>
      {loading && <div>Loading...</div>}
      {!loading && txns.length===0 && <div>No recent transactions.</div>}
      {txns.map(tx => <div key={tx.id} style={{padding:8,borderBottom:'1px solid #eee'}}><div><strong>Hash:</strong> {tx.hash.slice(0,12)}...</div><div style={{fontSize:13,color:'#666'}}>{new Date(tx.created_at).toLocaleString()}</div></div>)}
      <div style={{marginTop:8,fontSize:13}}>View more on <a href="https://stellar.expert/explorer/testnet" target="_blank" rel="noreferrer">Stellar Explorer (Testnet)</a></div>
    </div>
  );
}
