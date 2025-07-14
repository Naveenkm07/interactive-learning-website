import React, { useState } from 'react';

const GEMINI_API_KEY = "AIzaSyAQ6F1gqBVM7n8Yai6bVGFnTsPadIHXKjQ";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

async function askGemini(message) {
  const body = {
    contents: [
      {
        parts: [
          { text: message }
        ]
      }
    ]
  };
  try {
    const response = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
  } catch (error) {
    return "Error contacting Gemini API: " + error.message;
  }
}

const ChatSidebar = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! I am your AI coding assistant. Ask me anything about code!' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    const aiText = await askGemini(input);
    setMessages(msgs => [...msgs, { sender: 'ai', text: aiText }]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ width: 320, height: '100%', borderLeft: '1px solid #eee', display: 'flex', flexDirection: 'column', background: '#fafbfc' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 12, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <div style={{
              display: 'inline-block',
              background: msg.sender === 'user' ? '#d1e7fd' : '#e9ecef',
              color: '#222',
              borderRadius: 8,
              padding: '8px 12px',
              maxWidth: '80%'
            }}>{msg.text}</div>
          </div>
        ))}
        {loading && <div style={{ color: '#888', fontStyle: 'italic' }}>AI is typing...</div>}
      </div>
      <div style={{ padding: 12, borderTop: '1px solid #eee', background: '#fff' }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          style={{ width: '100%', resize: 'none', borderRadius: 6, border: '1px solid #ccc', padding: 8 }}
          placeholder="Ask AI about your code..."
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          style={{ marginTop: 6, width: '100%', padding: 8, borderRadius: 6, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 600 }}
        >Send</button>
      </div>
    </div>
  );
};

export default ChatSidebar; 