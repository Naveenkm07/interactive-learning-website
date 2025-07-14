import React, { useState } from 'react';
import './AIChatBotWidget.css';

const mockAIResponse = (userMessage) => {
  // Simple mock logic
  return `You said: "${userMessage}". This is a mock AI response.`;
};

const AIChatBotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! I am your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    const aiMsg = { sender: 'ai', text: mockAIResponse(input) };
    setMessages((msgs) => [...msgs, userMsg, aiMsg]);
    setInput('');
  };

  return (
    <div className={`ai-chatbot-widget ${open ? 'open' : ''}`}> 
      {open ? (
        <div className="chat-window">
          <div className="chat-header">
            <span>AI Chatbot</span>
            <button onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.sender}`}>{msg.text}</div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      ) : (
        <button className="open-btn" onClick={() => setOpen(true)}>💬 AI Chat</button>
      )}
    </div>
  );
};

export default AIChatBotWidget; 