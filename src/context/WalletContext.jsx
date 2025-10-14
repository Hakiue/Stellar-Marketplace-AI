import React, { createContext, useContext, useState } from 'react';
import {
  StellarWalletsKit,
  WalletNetwork,
  xBullModule,
  FreighterModule,
  XBULL_ID
} from '@creit.tech/stellar-wallets-kit';
import { Horizon } from '@stellar/stellar-sdk';

const kit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: XBULL_ID,
  modules: [new xBullModule(), new FreighterModule()],
});

const server = new Horizon.Server('https://horizon-testnet.stellar.org');

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [publicKey, setPublicKey] = useState(null);
  const [status, setStatus] = useState('');

  const handleConnect = async (walletId) => {
    try {
      await kit.setWallet(walletId);
      const { address } = await kit.getAddress();
      setPublicKey(address);
      setStatus(`Connected: ${address.slice(0, 6)}...`);
    } catch (error) {
      console.error('Connection failed:', error);
      setStatus('Failed to connect wallet.');
    }
  };

  return (
    <WalletContext.Provider value={{
      publicKey,
      status,
      handleConnect,
      kit,
      server,
      setStatus
    }}>
      {children}
    </WalletContext.Provider>
  );
};
