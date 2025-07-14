import React, { useState } from 'react';
import './AIHubSection.css';

const TABS = [
  { key: 'chatbot', label: 'AI Chatbot Assistant' },
  { key: 'codeReview', label: 'AI Code Review' },
  { key: 'learningPath', label: 'Personalized Learning Path' },
  // More tabs to come
];

const AIHubSection = () => {
  const [activeTab, setActiveTab] = useState('chatbot');

  // Chatbot state
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! I am your AI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  // Code Review state
  const [code, setCode] = useState('');
  const [reviewResult, setReviewResult] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);

  // Learning Path state
  const [learningPath, setLearningPath] = useState([]);
  const [isGeneratingPath, setIsGeneratingPath] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(msgs => [...msgs, { sender: 'ai', text: 'This is a placeholder AI response. (Connect your API for real answers!)' }]);
    }, 800);
  };

  const handleCodeReview = () => {
    if (!code.trim()) return;
    setIsReviewing(true);
    setReviewResult('');
    setTimeout(() => {
      setReviewResult('AI Review: This is a placeholder review. (Connect your API for real code analysis!)');
      setIsReviewing(false);
    }, 1200);
  };

  const handleGeneratePath = () => {
    setIsGeneratingPath(true);
    setLearningPath([]);
    setTimeout(() => {
      setLearningPath([
        '1. Master JavaScript fundamentals',
        '2. Build 3 React projects',
        '3. Complete 20 LeetCode Medium problems',
        '4. Learn basic system design concepts',
        '5. Contribute to an open source repo',
        '6. Prepare for behavioral interviews',
      ]);
      setIsGeneratingPath(false);
    }, 1200);
  };

  return (
    <div className="aihub-container">
      <div className="aihub-tabs">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`aihub-tab${activeTab === tab.key ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === 'chatbot' && (
        <div className="aihub-chatbot">
          <div className="aihub-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`aihub-message ${msg.sender}`}>{msg.text}</div>
            ))}
          </div>
          <div className="aihub-input-row">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              className="aihub-input"
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button className="aihub-send" onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
      {activeTab === 'codeReview' && (
        <div className="aihub-codereview">
          <textarea
            className="aihub-codearea"
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="Paste your code here for AI review..."
            rows={10}
          />
          <div className="aihub-input-row">
            <button className="aihub-send" onClick={handleCodeReview} disabled={isReviewing}>
              {isReviewing ? 'Reviewing...' : 'Review Code'}
            </button>
          </div>
          {reviewResult && <div className="aihub-review-result">{reviewResult}</div>}
        </div>
      )}
      {activeTab === 'learningPath' && (
        <div className="aihub-learningpath">
          <button className="aihub-send" onClick={handleGeneratePath} disabled={isGeneratingPath}>
            {isGeneratingPath ? 'Generating...' : 'Generate My AI Learning Path'}
          </button>
          <div className="aihub-learningpath-list">
            {learningPath.map((step, idx) => (
              <div key={idx} className="aihub-learningpath-step">{step}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIHubSection; 