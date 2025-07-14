import React, { useState, useEffect, useRef } from 'react';

const EchoDeepakSection = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    responseTime: 'N/A',
    accuracy: 'N/A',
    uptime: 'N/A'
  });
  const [activeCategory, setActiveCategory] = useState('general');
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_API_KEY || '');
  const [selectedProvider, setSelectedProvider] = useState('gemini');
  const [isApiConfigured, setIsApiConfigured] = useState(false);
  const [apiError, setApiError] = useState('');
  const chatContainerRef = useRef(null);

  const aiProviders = [
    { id: 'simulated', name: 'Simulated AI', description: 'Local responses (no API key needed)' },
    { id: 'openai', name: 'OpenAI GPT', description: 'Powerful language model by OpenAI' },
    { id: 'anthropic', name: 'Anthropic Claude', description: 'Advanced AI by Anthropic' },
    { id: 'gemini', name: 'Google Gemini', description: 'Google\'s latest AI model' },
    { id: 'huggingface', name: 'Hugging Face', description: 'Open source AI models' }
  ];

  const categories = [
    { id: 'general', name: 'General Coding' },
    { id: 'frontend', name: 'Frontend Dev' },
    { id: 'backend', name: 'Backend Dev' },
    { id: 'devops', name: 'DevOps & Cloud' },
    { id: 'algorithms', name: 'Algorithms' },
    { id: 'interview-prep', name: 'Interview Prep' },
    { id: 'fun', name: 'Fun & Trivia' },
  ];

  const simulatedResponses = {
    'general': [
      "That's a great general coding question! What specific language or concept are you thinking of?",
      "I can help with that. Can you provide more details on the problem?",
      "General coding queries are my specialty. How can I assist you today?",
      "In general coding, remember the importance of clear logic and efficient algorithms."
    ],
    'frontend': [
      "For frontend, are you working with React, Vue, Angular, or something else?",
      "Frontend development is vast! Tell me more about your CSS, JavaScript, or UI challenge.",
      "I'm ready to assist with your HTML, CSS, or JavaScript questions. What's on your mind?",
      "Remember to optimize for user experience and responsiveness in frontend development."
    ],
    'backend': [
      "Backend development often involves databases, APIs, and server logic. What specific area are you exploring?",
      "Node.js, Python, Java, or Go? Which backend technology are you using?",
      "I can help debug server-side issues or optimize database queries. What's the scenario?",
      "Security and scalability are paramount in backend systems."
    ],
    'devops': [
      "DevOps and cloud are critical. Are you dealing with CI/CD, Docker, Kubernetes, or a specific cloud provider like AWS/Azure/GCP?",
      "Automating infrastructure can be tricky. What part of your deployment pipeline needs attention?",
      "Looking for help with containerization or cloud resource management? I'm here to assist.",
      "Continuous integration and deployment can significantly speed up your development cycle."
    ],
    'algorithms': [
      "Algorithms are fundamental! Are you looking for help with sorting, searching, graph traversal, or dynamic programming?",
      "Let's break down that algorithm. Can you explain the problem and your current approach?",
      "I enjoy complex algorithm challenges. What specific algorithm is giving you trouble?",
      "Big O notation is crucial for understanding algorithm efficiency."
    ],
    'interview-prep': [
      "Interview preparation is key. Are you practicing behavioral questions, coding challenges, or system design?",
      "Tell me about the type of interview question you're preparing for. I can simulate scenarios or provide tips.",
      "I can offer mock interview questions or strategies for technical interviews. What's your focus area?",
      "Practice, practice, practice! It's the best way to ace technical interviews."
    ],
    'fun': [
      "Why did the programmer quit his job? Because he didn't get arrays!",
      "What's a programmer's favorite place to hang out? Foo Bar.",
      "I'm not just code; I've got a byte-sized sense of humor!",
      "Do you know any good coding jokes? Share them with me!"
    ],
    'keyword_responses': {
      'hello': 'Hello there! How can I help you today?',
      'hi': 'Hi! What coding challenge are you facing?',
      'how are you': `As an AI, I don't have feelings, but I'm ready to assist you!`,
      'thank you': `You're welcome! Is there anything else I can do?`,
      'bye': 'Goodbye! Come back anytime you need coding help.',
      'react': 'React is a popular JavaScript library for building user interfaces. Are you working on a React project?',
      'python': `Python is a versatile language! Are you looking for help with web development, data science, or something else in Python?`,
      'html': `HTML is the structure of the web! Are you having trouble with a specific tag or layout?`,
      'css': `CSS makes web pages beautiful! What styling issue are you trying to solve?`,
      'javascript': `JavaScript brings interactivity to your web pages. What JavaScript concept are you exploring?`
    },
    'default': [
      "I'm not sure I understood that. Could you please rephrase your question?",
      "My apologies, I need more clarity. Can you give me an example or more context?",
      "Interesting query! Let me think about that. In the meantime, feel free to ask a more specific question.",
    ]
  };

  const quickQuestions = [
    'How do I center a div?',
    'Explain Promises in JavaScript.',
    'What is a microservice architecture?',
    'Best way to learn Python?',
    'Difference between SQL and NoSQL?',
    'What is Big O notation?',
    'Tell me a coding joke.'
  ];

  // API Integration Functions
  const callOpenAI = async (message) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are Naveenkm07, a helpful AI coding mentor. Provide clear, concise, and practical coding advice. Focus on being educational and supportive.'
            },
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            })),
            { role: 'user', content: message }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      throw new Error(`OpenAI API call failed: ${error.message}`);
    }
  };

  const callAnthropic = async (message) => {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 500,
          messages: [
            {
              role: 'user',
              content: `You are Naveenkm07, a helpful AI coding mentor. Provide clear, concise, and practical coding advice. Focus on being educational and supportive.

Previous conversation:
${messages.map(msg => `${msg.sender === 'user' ? 'User' : 'Naveenkm07'}: ${msg.text}`).join('\n')}

User: ${message}`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Anthropic API error: ${response.status}`);
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      throw new Error(`Anthropic API call failed: ${error.message}`);
    }
  };

  const callGemini = async (message) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Naveenkm07, a helpful AI coding mentor. Provide clear, concise, and practical coding advice. Focus on being educational and supportive.

Previous conversation:
${messages.map(msg => `${msg.sender === 'user' ? 'User' : 'Naveenkm07'}: ${msg.text}`).join('\n')}

User: ${message}`
            }]
          }],
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
            topP: 0.8,
            topK: 40
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      throw new Error(`Gemini API call failed: ${error.message}`);
    }
  };

  const callHuggingFace = async (message) => {
    try {
      const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          inputs: message,
          parameters: {
            max_length: 100,
            temperature: 0.7
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.status}`);
      }

      const data = await response.json();
      return data[0].generated_text;
    } catch (error) {
      throw new Error(`Hugging Face API call failed: ${error.message}`);
    }
  };

  const getSimulatedResponse = (messageText) => {
    const lowerCaseMessage = messageText.toLowerCase();
    
    // Check keyword responses first
    for (const keyword in simulatedResponses.keyword_responses) {
      if (lowerCaseMessage.includes(keyword)) {
        return simulatedResponses.keyword_responses[keyword];
      }
    }

    // Fall back to category-based responses
    const responseOptions = simulatedResponses[activeCategory] || simulatedResponses['default'];
    return responseOptions[Math.floor(Math.random() * responseOptions.length)];
  };

  useEffect(() => {
    // Simulate initial greeting from Deepak
    setTimeout(() => {
      setMessages([{ sender: 'deepak', text: "Hello! I'm Naveenkm07, your AI coding mentor. How can I assist you today?" }]);
    }, 500);

    // Simulate updating performance metrics
    const interval = setInterval(() => {
      setPerformanceMetrics({
        responseTime: `${(Math.random() * 0.1 + 0.1).toFixed(2)}s`,
        accuracy: `${(90 + Math.random() * 10).toFixed(1)}%`,
        uptime: `99.${(90 + Math.random() * 9).toFixed(1)}%`
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Scroll to bottom of chat when new messages arrive
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (messageText = inputMessage) => {
    if (messageText.trim() === '') return;

    const newUserMessage = { sender: 'user', text: messageText };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);
    setApiError('');

    const startTime = Date.now();
    let aiResponse = '';

    try {
      if (selectedProvider === 'simulated' || !isApiConfigured) {
        // Use simulated responses
        setTimeout(() => {
          aiResponse = getSimulatedResponse(messageText);
          setMessages((prevMessages) => [...prevMessages, { sender: 'deepak', text: aiResponse }]);
          setIsTyping(false);
        }, 1500);
      } else {
        // Use real API
        switch (selectedProvider) {
          case 'openai':
            aiResponse = await callOpenAI(messageText);
            break;
          case 'anthropic':
            aiResponse = await callAnthropic(messageText);
            break;
          case 'gemini':
            aiResponse = await callGemini(messageText);
            break;
          case 'huggingface':
            aiResponse = await callHuggingFace(messageText);
            break;
          default:
            aiResponse = getSimulatedResponse(messageText);
        }

        const responseTime = ((Date.now() - startTime) / 1000).toFixed(2);
        setPerformanceMetrics(prev => ({ ...prev, responseTime: `${responseTime}s` }));

        setMessages((prevMessages) => [...prevMessages, { sender: 'deepak', text: aiResponse }]);
        setIsTyping(false);
      }
    } catch (error) {
      console.error('API Error:', error);
      setApiError(error.message);
      // Fallback to simulated response
      aiResponse = getSimulatedResponse(messageText);
      setMessages((prevMessages) => [...prevMessages, { sender: 'deepak', text: aiResponse }]);
      setIsTyping(false);
    }
  };

  const handleQuickQuestionClick = (question) => {
    handleSendMessage(question);
  };

  const handleClearChat = () => {
    setMessages([]);
    setInputMessage('');
    setIsTyping(false);
    setApiError('');
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim() && selectedProvider !== 'simulated') {
      setIsApiConfigured(true);
      setApiError('');
    } else if (selectedProvider === 'simulated') {
      setIsApiConfigured(true);
      setApiError('');
    } else {
      setApiError('Please enter a valid API key');
    }
  };

  return (
    <section className="content-section card" id="echoDeepakSection">
      <div className="card__body echo-deepak-container">
        <div className="echo-deepak-header">
          <h1>Naveenkm07 - AI Assistant</h1>
          <p>Your personal AI coding mentor for instant help, feedback, and learning support.</p>
        </div>

        {/* API Configuration Section */}
        <div className="api-config-section">
          <h3>AI Provider Configuration</h3>
          <div className="api-config-form">
            <select 
              value={selectedProvider} 
              onChange={(e) => {
                setSelectedProvider(e.target.value);
                setIsApiConfigured(false);
                setApiError('');
              }}
              className="provider-select"
            >
              {aiProviders.map(provider => (
                <option key={provider.id} value={provider.id}>
                  {provider.name} - {provider.description}
                </option>
              ))}
            </select>
            
            {selectedProvider !== 'simulated' && (
              <div className="api-key-input">
                <input
                  type="password"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="api-key-field"
                />
                <button onClick={handleApiKeySubmit} className="configure-button">
                  Configure
                </button>
              </div>
            )}
            
            {isApiConfigured && (
              <div className="api-status success">
                <i className="fas fa-check-circle"></i> API Configured Successfully
              </div>
            )}
            
            {apiError && (
              <div className="api-status error">
                <i className="fas fa-exclamation-triangle"></i> {apiError}
              </div>
            )}
          </div>
        </div>

        <div className="ai-chat-interface">
          <div className="chat-sidebar">
            <div className="sidebar-section category-selection">
              <h3>Categories</h3>
              <div className="category-list">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`category-item ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="sidebar-section quick-questions">
              <h3>Quick Questions</h3>
              <div className="question-list">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="quick-question-item"
                    onClick={() => handleQuickQuestionClick(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
            <div className="sidebar-section performance-metrics">
              <h3>Performance Metrics</h3>
              <div className="metrics-list">
                <p>Response Time: <span>{performanceMetrics.responseTime}</span></p>
                <p>Accuracy: <span>{performanceMetrics.accuracy}</span></p>
                <p>Uptime: <span>{performanceMetrics.uptime}</span></p>
                <p>Provider: <span>{selectedProvider}</span></p>
              </div>
            </div>
          </div>

          <div className="chat-main">
            <div className="chat-messages" ref={chatContainerRef}>
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender}`}>
                  <div className="message-avatar">
                    <i className={`fas ${msg.sender === 'user' ? 'fa-user-circle' : 'fa-robot'}`}></i>
                  </div>
                  <div className="message-bubble">
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="chat-message deepak typing-indicator">
                  <div className="message-avatar">
                    <i className="fas fa-robot"></i>
                  </div>
                  <div className="message-bubble">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              )}
            </div>
            <div className="chat-input">
              <textarea
                placeholder="Ask Naveenkm07 anything..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button onClick={handleSendMessage} className="send-button" disabled={isTyping}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            <div className="chat-actions">
              <button onClick={handleClearChat} className="clear-chat-button">
                <i className="fas fa-redo"></i> Clear Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EchoDeepakSection; 