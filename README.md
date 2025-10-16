
# 🌟 **Stellar Marketplace AI**

## 🏷️ Project Title
**Stellar Marketplace AI** — A decentralized marketplace with AI-powered assistance, automation exchange, and on-chain payments via the Stellar blockchain.

---

## 🧠 Project Description
**Stellar Marketplace AI** is a decentralized web marketplace that lets users connect their Stellar wallets (Freighter or xBull), browse products, post their own listings, and purchase securely using **XLM on the Stellar Testnet**.  

Beyond traditional marketplaces, it expands into a **service and automation economy** — empowering creators, developers, and AI enthusiasts to share, sell, and collaborate using **Web3 + AI automation**.  

### 💡 Core Concepts
- **AI-powered assistant (“Stella”)** helps users navigate, create listings, and interact with the marketplace.  
- **Seller Page:** Users can list physical or digital products, showcase skills, and use the AI **description generator** to automatically generate polished listings.  
- **Workflow Exchange Page:** Users can post n8n workflows they’re seeking, offer automation jobs, or request custom AI agents trained for specific tasks.  
- **Full on-chain payments** via the Stellar blockchain — fast, transparent, and low-cost transactions.

This project demonstrates how **AI, automation, and blockchain** merge to form a **smart decentralized commerce ecosystem**.

---

## ⚙️ Features

✅ Connect and authenticate with Stellar wallets (Freighter or xBull)  
✅ Browse and purchase products using **Stellar Testnet payments**  
✅ Create listings for items, digital assets, or skills  
✅ Use the **AI description generator** for listings and skills  
✅ **AI assistant “Stella”** powered by n8n + Gemini/OpenAI  
✅ **Workflow marketplace** — find or offer n8n automations and AI agents  
✅ **Logs** all user and AI interactions to Google Sheets for transparency  
✅ Full blockchain **transaction history** for all purchases  

---

## 🧰 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React + Vite |
| **Blockchain** | Stellar Testnet (via `@stellar/stellar-sdk`) |
| **Wallet Integration** | `@creit.tech/stellar-wallets-kit` |
| **AI Integration** | Google Gemini / OpenAI (via n8n workflows) |
| **Automation Platform** | n8n (custom workflows for FAQ + AI chat) |
| **Data Storage** | Google Sheets (FAQ + Logs) |
| **Other Tools** | Axios, Freighter/xBull wallets, Vite |

---

## 🧩 How to Run the Project

### 🔧 Prerequisites
- Node.js 18+ installed  
- Freighter or xBull wallet (set to **Testnet**)  
- Google Sheets + n8n account (for AI workflows)

### 🪄 Setup Instructions
```bash
# 1. Clone the repository
git clone https://github.com/yourusername/stellar-marketplace-ai.git

# 2. Navigate into the folder
cd stellar-marketplace-ai

# 3. Install dependencies
npm install

# 4. Add your environment variables
# (Edit the .env file)
VITE_GEMINI_API_KEY=your_api_key_here
VITE_N8N_WEBHOOK=https://n8n.yourdomain.app/webhook/ai-helper

# 5. Run the development server
npm run dev
```

Then open your app in a browser:  
👉 [http://localhost:5173](http://localhost:5173)

---

## 👥 Team Members
| Name | Role |
|------|------|
| **Zaakir Shaibu** | Developer, Designer, AI Workflow Engineer |

---

## 🚀 Future Improvements

- Support for **custom Stellar tokens** (beyond XLM)  
- **AI-based seller verification** and reputation scoring  
- Implement **escrow smart contracts (Soroban)** for secure multi-party payments  
- **Multi-language support** for global accessibility  
- Integrate **Stellar Quest-style gamified achievements**  
- Expand AI workflows to **generate dynamic product pricing** or **auto-train custom models**  

---

## 🎥 Demo Video
👉 [Watch on YouTube](https://youtu.be/dT9ItxK6yKk)
