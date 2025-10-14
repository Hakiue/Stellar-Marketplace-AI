
# 🌟 Stellar Marketplace AI

Project Title
**Stellar Marketplace AI** — A decentralized marketplace with AI-powered assistance and on-chain payments via the Stellar blockchain.

---

 Project Description
**Stellar Marketplace AI** is a decentralized web marketplace that lets users connect their Stellar wallets (Freighter or xBull), browse products, and purchase them securely using **XLM on the Stellar Testnet**.

The app also includes:
- An **AI-powered assistant (“Stella”)** that answers user questions.
- Integration with an **n8n workflow** for dynamic FAQ lookup and AI chat.
- Automatic transaction handling and product management directly on the blockchain.

This project demonstrates how AI + blockchain can merge to create **smarter, self-service decentralized commerce** experiences.

---

Features
✅ Connect your Stellar wallet (Freighter or xBull)  
✅ Browse and buy products on Stellar Testnet  
✅ Process real on-chain XLM payments  
✅ AI-powered assistant (Stella) using n8n + Gemini/OpenAI  
✅ FAQ responses stored and managed via Google Sheets  
✅ Logs every chat and transaction automatically  
✅ Expandable product system (add descriptions via AI)  

---

Tech Stack
**Frontend:** React + Vite  
**Blockchain:** Stellar Testnet (via @stellar/stellar-sdk)  
**Wallet Integration:** @creit.tech/stellar-wallets-kit  
**AI Integration:** Google Gemini / OpenAI (via n8n workflows)  
**Automation Platform:** n8n (custom workflows for FAQ + AI chat)  
**Data Storage:** Google Sheets (FAQ + Logs)  
**Other Tools:** Axios, Vite, Freighter/xBull wallets  

---

How to Run the Project

 🧩 Prerequisites
- Node.js 18+ installed  
- Freighter or xBull wallet (set to **Testnet**)  
- Google Sheets + n8n account (for AI workflows)  

 🪄 Setup Instructions
``bash
Clone the repo
git clone https://github.com/yourusername/stellar-marketplace-ai.git

# 2. Navigate into the folder
cd stellar-marketplace-ai

# 3. Install dependencies
npm install

# 4. Add your environment variables
# (Edit .env file)
VITE_GEMINI_API_KEY=your_api_key_here
VITE_N8N_WEBHOOK=https://n8n.yourdomain.app/webhook/stellar-ai

# 5. Run the development server
npm run dev
``

Then open [http://localhost:5173](http://localhost:5173)  

---

Demo Video Link
🎥 [Add your YouTube / Google Drive demo link here]  

---

Team Members
| Name | Role |
|------|------|
| Zaakir Shaibu | Developer, Designer, AI Workflow Engineer |

---

Future Improvements
🚀 Planned Upgrades:
- Support for **custom Stellar tokens** (beyond XLM)
- Add **AI-based seller verification and reputation scoring**
- Implement **escrow smart contracts (Soroban)** for secure multi-party payments
- **Multi-language support** for global accessibility
- Integrate **Stellar Quest-style gamified achievements**
