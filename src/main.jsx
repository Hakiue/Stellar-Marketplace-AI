import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CartProvider } from './context/CartContext'
import { WalletProvider } from './context/WalletContext'
import './App.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </WalletProvider>
    </BrowserRouter>
  </React.StrictMode>
)
