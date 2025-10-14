import React, { useState } from 'react';
import { chatReply } from '../utils/ai';
import { useWallet } from '../context/WalletContext';

export default function ChatAssistant() {
  const { connectedWalletAddress } = useWallet();
  const [messages, setMessages] = useState([
    {role:'system', content:'You are Stella, a helpful assistant for the Stellar marketplace.'}
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = {role:'user', content: input.trim()};
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const r = await chatReply(input.trim(), connectedWalletAddress);
      setMessages(prev => [...prev, {role:'assistant', content: r}]);
    } catch (error) {
      setMessages(prev => [...prev, {role:'assistant', content: 'Sorry, I encountered an error. Please try again.'}]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{role:'system', content:'You are Stella, a helpful assistant for the Stellar marketplace.'}]);
    setInput('');
  };

  const chatContainerRef = React.useRef(null);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-assistant">
      <div className="chat-header">
        <h4>Stella — AI Assistant</h4>
        <button onClick={clearChat} className="clear-btn">Clear</button>
      </div>
      <div ref={chatContainerRef} className="chat-messages">
        {messages.filter(m => m.role !== 'system').map((m, i) => (
          <div key={i} className={`message ${m.role}`}>
            <div className="message-bubble">
              <strong>{m.role === 'user' ? 'You' : 'Stella'}:</strong>
              <p>{m.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="message assistant">
            <div className="message-bubble">
              <div className="typing-indicator">Stella is typing...</div>
            </div>
          </div>
        )}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Stella about wallets, buying, or the app..."
          onKeyPress={e => e.key === 'Enter' && send()}
        />
        <button onClick={send} disabled={loading || !input.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}
