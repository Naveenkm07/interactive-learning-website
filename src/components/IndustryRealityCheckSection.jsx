import React, { useState, useEffect } from 'react';

// Helper to get Unsplash image URL based on a query
const getUnsplashImage = (query) => {
  // This uses Unsplash's free source API for demo purposes (no API key required)
  // For production, use the official Unsplash API with an access key
  return `https://source.unsplash.com/400x200/?${encodeURIComponent(query)}`;
};

// Confetti component (simple canvas-based, no external package)
const Confetti = ({ show }) => {
  const ref = React.useRef();
  useEffect(() => {
    if (!show) return;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    let confetti = [];
    for (let i = 0; i < 120; i++) {
      confetti.push({
        x: Math.random() * W,
        y: Math.random() * -H,
        r: Math.random() * 6 + 4,
        d: Math.random() * 80 + 40,
        color: `hsl(${Math.random() * 360}, 80%, 60%)`,
        tilt: Math.random() * 10 - 10,
        tiltAngle: 0,
        tiltAngleIncremental: (Math.random() * 0.07) + 0.05
      });
    }
    let angle = 0;
    let animationFrame;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < confetti.length; i++) {
        let c = confetti[i];
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 3, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.d / 10);
        ctx.stroke();
      }
      update();
      animationFrame = requestAnimationFrame(draw);
    }
    function update() {
      angle += 0.01;
      for (let i = 0; i < confetti.length; i++) {
        let c = confetti[i];
        c.y += (Math.cos(angle + c.d) + 3 + c.r / 2) / 2;
        c.x += Math.sin(angle);
        c.tiltAngle += c.tiltAngleIncremental;
        c.tilt = Math.sin(c.tiltAngle) * 15;
        if (c.y > H) {
          c.x = Math.random() * W;
          c.y = -10;
        }
      }
    }
    draw();
    return () => cancelAnimationFrame(animationFrame);
  }, [show]);
  return show ? (
    <canvas ref={ref} style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',pointerEvents:'none',zIndex:9999}} />
  ) : null;
};

// Quiz Game Component
const QuizGameComponent = ({ quizzes }) => {
  // Flatten all questions from all quizzes
  const allQuestions = quizzes.flatMap(qz => qz.questions.map(q => ({
    ...q,
    quizTitle: qz.title,
    quizImage: qz.image
  })));
  const [gameStarted, setGameStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    if (showResult && score === allQuestions.length && allQuestions.length > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);
    }
  }, [showResult, score, allQuestions.length]);

  const startGame = () => {
    // Shuffle questions for each game
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setGameStarted(true);
    setCurrentIdx(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const handleOption = (option) => {
    if (showFeedback) return;
    setSelectedOption(option);
    setShowFeedback(true);
    if (option === shuffledQuestions[currentIdx].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < shuffledQuestions.length - 1) {
      setCurrentIdx(idx => idx + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setShowResult(true);
      setGameStarted(false);
    }
  };

  if (!gameStarted && !showResult) {
    return (
      <div className="quiz-game-intro">
        <h2>Quiz Game</h2>
        <p>Test your knowledge! Questions will appear one at a time. Try to get them all right!</p>
        <button className="btn btn--primary" onClick={startGame}>Start Game</button>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="quiz-game-result">
        {showConfetti && <Confetti show={true} />}
        <h2>Game Over!</h2>
        <p>Your Score: <strong>{score} / {shuffledQuestions.length}</strong></p>
        {score === shuffledQuestions.length && <p>🎉 Perfect Score! 🎉</p>}
        <button className="btn btn--secondary" onClick={startGame}>Play Again</button>
      </div>
    );
  }

  const q = shuffledQuestions[currentIdx];
  return (
    <div className="quiz-game-card">
      <div className="quiz-game-progress">
        Question {currentIdx + 1} / {shuffledQuestions.length}
      </div>
      {q.quizImage && <img src={q.quizImage} alt={q.quizTitle} className="quiz-game-image" style={{maxWidth:'220px',borderRadius:'12px',margin:'0 auto 1rem',display:'block'}} />}
      <h3 className="quiz-game-question">{q.question}</h3>
      <div className="quiz-game-options">
        {q.options.map(option => (
          <button
            key={option}
            className={`quiz-game-option-btn${selectedOption === option ? ' selected' : ''} ${showFeedback && option === q.correctAnswer ? ' correct' : ''} ${showFeedback && selectedOption === option && option !== q.correctAnswer ? ' wrong' : ''}`}
            onClick={() => handleOption(option)}
            disabled={showFeedback}
          >
            {option}
          </button>
        ))}
      </div>
      {showFeedback && (
        <div className="quiz-game-feedback">
          {selectedOption === q.correctAnswer ? (
            <span className="correct-answer">Correct!</span>
          ) : (
            <span className="wrong-answer">Wrong! Correct: <span className="correct-answer">{q.correctAnswer}</span></span>
          )}
        </div>
      )}
      <button className="btn btn--primary" style={{marginTop:'1.5rem'}} onClick={nextQuestion} disabled={!showFeedback}>
        {currentIdx === shuffledQuestions.length - 1 ? 'Finish' : 'Next'}
      </button>
    </div>
  );
};

// Mini Quiz Game (for the 'Game' tab)
const MiniQuizGame = () => {
  const questions = [
    {
      question: 'What does HTML stand for?',
      options: ['Hyper Trainer Marking Language', 'Hyper Text Markup Language', 'Hyper Text Marketing Language', 'Hyper Text Markup Leveler'],
      correct: 'Hyper Text Markup Language',
    },
    {
      question: 'Which company developed React?',
      options: ['Google', 'Facebook', 'Microsoft', 'Amazon'],
      correct: 'Facebook',
    },
    {
      question: 'What is the value of 2 + 2 * 2?',
      options: ['6', '8', '4', '10'],
      correct: '6',
    },
    {
      question: 'Which tag is used for the largest heading in HTML?',
      options: ['<h6>', '<heading>', '<h1>', '<head>'],
      correct: '<h1>',
    },
  ];
  const [step, setStep] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);

  const handleOption = (option) => {
    setSelected(option);
    if (option === questions[step].correct) setScore(s => s + 1);
  };
  const next = () => {
    if (step < questions.length - 1) {
      setStep(s => s + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };
  const restart = () => {
    setStep(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) return (
    <div className="mini-quiz-game-result">
      <h2>Mini Quiz Complete!</h2>
      <p>Your Score: <strong>{score} / {questions.length}</strong></p>
      <button className="btn btn--primary" onClick={restart}>Play Again</button>
    </div>
  );

  return (
    <div className="mini-quiz-game-card">
      <div className="mini-quiz-progress">Question {step + 1} / {questions.length}</div>
      <h3 className="mini-quiz-question">{questions[step].question}</h3>
      <div className="mini-quiz-options">
        {questions[step].options.map(option => (
          <button
            key={option}
            className={`mini-quiz-option-btn${selected === option ? (option === questions[step].correct ? ' correct' : ' wrong') : ''}`}
            onClick={() => handleOption(option)}
            disabled={!!selected}
          >
            {option}
          </button>
        ))}
      </div>
      {selected && (
        <div className="mini-quiz-feedback">
          {selected === questions[step].correct ? 'Correct!' : `Wrong! Correct: ${questions[step].correct}`}
        </div>
      )}
      <button className="btn btn--primary" style={{marginTop:'1.2rem'}} onClick={next} disabled={!selected}>
        {step === questions.length - 1 ? 'Finish' : 'Next'}
      </button>
    </div>
  );
};

// Scenario-based Learning Game for the 'quizzes' tab
const ScenarioQuizGame = () => {
  const levels = [
    {
      title: 'Level 1: The HTML Bridge',
      scenario: 'You reach a rickety bridge labeled "HTML". To cross, answer this:',
      question: 'Which HTML tag is used to create a hyperlink?',
      options: ['<a>', '<link>', '<href>', '<hyper>'],
      answer: '<a>',
      tip: 'The <a> tag defines a hyperlink, which is used to link from one page to another.',
      success: 'You crossed the HTML Bridge! Onward!'
    },
    {
      title: 'Level 2: The CSS Cave',
      scenario: 'A dark cave blocks your path. The walls are covered in code. Solve this to light your way:',
      question: 'What does CSS stand for?',
      options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Syntax', 'Colorful Style Sheets'],
      answer: 'Cascading Style Sheets',
      tip: 'CSS is used to style and layout web pages.',
      success: 'The CSS Cave glows with color! You move forward.'
    },
    {
      title: 'Level 3: The JavaScript Jungle',
      scenario: 'Vines of code hang everywhere. A monkey blocks your way and asks:',
      question: 'What is the output of: console.log(typeof null);',
      options: ['null', 'object', 'undefined', 'number'],
      answer: 'object',
      tip: 'In JavaScript, typeof null returns "object" due to a historical bug.',
      success: 'The monkey is impressed! You swing across the JavaScript Jungle.'
    },
    {
      title: 'Level 4: The Framework Fortress',
      scenario: 'A castle stands before you. The guard asks:',
      question: 'Which of these is a JavaScript framework?',
      options: ['Laravel', 'Django', 'React', 'Flask'],
      answer: 'React',
      tip: 'React is a popular JavaScript library for building user interfaces.',
      success: 'The gates open! You enter the Framework Fortress.'
    },
  ];
  const [step, setStep] = React.useState(-1); // -1 = intro
  const [selected, setSelected] = React.useState(null);
  const [feedback, setFeedback] = React.useState('');
  const [score, setScore] = React.useState(0);
  const [showTip, setShowTip] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);

  const startGame = () => {
    setStep(0);
    setSelected(null);
    setFeedback('');
    setScore(0);
    setShowTip(false);
    setShowResult(false);
  };

  const handleOption = (option) => {
    setSelected(option);
    setShowTip(true);
    if (option === levels[step].answer) {
      setFeedback(levels[step].success);
      setScore(s => s + 1);
    } else {
      setFeedback('Oops! That wasn\'t right. ' + levels[step].tip);
    }
    setTimeout(() => next(), 2000);
  };
  const next = () => {
    setSelected(null);
    setFeedback('');
    setShowTip(false);
    if (step < levels.length - 1) {
      setStep(s => s + 1);
    } else {
      setShowResult(true);
    }
  };
  const restart = () => {
    setStep(-1);
    setSelected(null);
    setFeedback('');
    setScore(0);
    setShowTip(false);
    setShowResult(false);
  };

  if (step === -1) return (
    <div className="scenario-quiz-intro">
      <h2>🌟 Welcome to the Web Dev Adventure! 🌟</h2>
      <p>Progress through levels by solving coding challenges. Can you reach the Framework Fortress and claim the treasure?</p>
      <button className="btn btn--primary" onClick={startGame}>Start Adventure</button>
    </div>
  );

  if (showResult) return (
    <div className="scenario-quiz-result">
      <h2>🏆 You completed the adventure! 🏆</h2>
      <p>Your Score: <strong>{score} / {levels.length}</strong></p>
      <p>Thanks for playing! Want to try again?</p>
      <button className="btn btn--primary" onClick={restart}>Play Again</button>
    </div>
  );

  const level = levels[step];
  return (
    <div className="scenario-quiz-game-card">
      <div className="scenario-quiz-header">
        <span className="scenario-quiz-level">{level.title}</span>
        <span className="scenario-quiz-progress">Level {step + 1} / {levels.length}</span>
        <div className="scenario-quiz-bar">
          <div className="scenario-quiz-bar-fill" style={{width: `${((step+1)/levels.length)*100}%`}}></div>
        </div>
      </div>
      <div className="scenario-quiz-scenario">{level.scenario}</div>
      <h2 className="scenario-quiz-question">{level.question}</h2>
      <div className="scenario-quiz-options">
        {level.options.map(option => (
          <button
            key={option}
            className={`scenario-quiz-option-btn${selected === option ? (option === level.answer ? ' correct' : ' wrong') : ''}`}
            onClick={() => handleOption(option)}
            disabled={!!selected}
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && (
        <div className={`scenario-quiz-feedback ${selected === level.answer ? 'correct' : 'wrong'}`}>{feedback}</div>
      )}
    </div>
  );
};

// Simple Classic Quiz for the 'quizzes' tab
const SimpleQuiz = () => {
  const questions = [
    {
      question: 'What does HTML stand for?',
      options: ['Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'Hyper Trainer Marking Language'],
      answer: 'Hyper Text Markup Language',
    },
    {
      question: 'Which language is used for styling web pages?',
      options: ['HTML', 'JQuery', 'CSS', 'XML'],
      answer: 'CSS',
    },
    {
      question: 'Which is not a JavaScript Framework?',
      options: ['Python Script', 'JQuery', 'Django', 'NodeJS'],
      answer: 'Django',
    },
    {
      question: 'Which is used for Connect To Database?',
      options: ['PHP', 'HTML', 'JS', 'All'],
      answer: 'PHP',
    },
  ];
  const [step, setStep] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  const [feedback, setFeedback] = React.useState('');
  const [score, setScore] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);

  const handleOption = (option) => {
    setSelected(option);
    if (option === questions[step].answer) {
      setFeedback('Correct!');
      setScore(s => s + 1);
    } else {
      setFeedback('Wrong!');
    }
    setTimeout(() => next(), 1200);
  };
  const next = () => {
    setSelected(null);
    setFeedback('');
    if (step < questions.length - 1) {
      setStep(s => s + 1);
    } else {
      setShowResult(true);
    }
  };
  const restart = () => {
    setStep(0);
    setSelected(null);
    setFeedback('');
    setScore(0);
    setShowResult(false);
  };

  if (showResult) return (
    <div className="simple-quiz-result">
      <h2>Quiz Complete!</h2>
      <p>Your Score: <strong>{score} / {questions.length}</strong></p>
      <button className="btn btn--primary" onClick={restart}>Play Again</button>
    </div>
  );

  return (
    <div className="simple-quiz-card">
      <div className="simple-quiz-header">
        <span className="simple-quiz-progress">Question {step + 1} / {questions.length}</span>
        <div className="simple-quiz-bar">
          <div className="simple-quiz-bar-fill" style={{width: `${((step+1)/questions.length)*100}%`}}></div>
        </div>
      </div>
      <h2 className="simple-quiz-question">{questions[step].question}</h2>
      <div className="simple-quiz-options">
        {questions[step].options.map(option => (
          <button
            key={option}
            className={`simple-quiz-option-btn${selected === option ? (option === questions[step].answer ? ' correct' : ' wrong') : ''}`}
            onClick={() => handleOption(option)}
            disabled={!!selected}
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && (
        <div className={`simple-quiz-feedback ${feedback === 'Correct!' ? 'correct' : 'wrong'}`}>{feedback}</div>
      )}
    </div>
  );
};

const IndustryRealityCheckSection = () => {
  const [activeTab, setActiveTab] = useState('trends');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [quizResults, setQuizResults] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const insightsData = {
    trends: [
      {
        id: 1,
        title: "The Rise of AI in Software Development",
        summary: "Explore how AI is transforming coding, testing, and deployment processes.",
        content: "Artificial intelligence is rapidly becoming an indispensable tool in software development. From AI-powered code completion and debugging tools to automated testing and deployment pipelines, AI is enhancing efficiency and accuracy across the entire software lifecycle. Developers are leveraging machine learning models for predictive analytics, anomaly detection in production, and even generating boiler-plate code. This trend necessitates developers to understand AI fundamentals and adapt to new AI-driven workflows.",
        tags: ["AI", "Trends", "Automation"],
        image: "/images/ai-dev.jpg"
      },
      {
        id: 2,
        title: "Web3 and Blockchain: Beyond Cryptocurrencies",
        summary: "Dive into decentralized applications, NFTs, and the future of the internet.",
        content: "Web3, built on blockchain technology, promises a decentralized internet where users have more control over their data and digital assets. Beyond cryptocurrencies, Web3 encompasses decentralized applications (dApps), non-fungible tokens (NFTs), and decentralized autonomous organizations (DAOs). Developers are increasingly exploring Solidity, Rust, and Go for building on platforms like Ethereum, Solana, and Polkadot. Understanding smart contracts and distributed ledger technology is becoming crucial for innovation in this space.",
        tags: ["Web3", "Blockchain", "Decentralization"],
        image: "/images/web3.jpg"
      },
      {
        id: 3,
        title: "Edge Computing: Processing Power at the Source",
        summary: "Learn about distributed computing and its impact on IoT and real-time data.",
        content: "Edge computing brings computation and data storage closer to the sources of data, reducing latency and bandwidth usage. This paradigm is critical for IoT devices, autonomous vehicles, and real-time analytics. As more data is generated at the 'edge' of networks, the demand for developers skilled in optimizing applications for resource-constrained environments and handling distributed systems grows. Technologies like Kubernetes, serverless functions, and specialized edge hardware are at the forefront.",
        tags: ["Edge Computing", "IoT", "Cloud"],
        image: "/images/edge-computing.jpg"
      },
      {
        id: 4,
        title: "The Impact of Quantum Computing",
        summary: "Quantum computers are set to revolutionize problem-solving in cryptography, chemistry, and more.",
        content: "Quantum computing leverages the principles of quantum mechanics to process information in fundamentally new ways. While still in its early stages, quantum computers have the potential to solve problems that are intractable for classical computers, such as factoring large numbers or simulating complex molecules. Developers should keep an eye on quantum programming languages and emerging frameworks as the field evolves.",
        tags: ["Quantum Computing", "Trends"],
        image: "/images/quantum-computing.jpg"
      },
      {
        id: 5,
        title: "How Spotify Uses Data Science",
        summary: "Spotify personalizes music recommendations using advanced data science techniques.",
        content: "Spotify employs machine learning and big data analytics to deliver personalized playlists and recommendations to millions of users. By analyzing listening habits, user feedback, and contextual data, Spotify's algorithms continuously improve the user experience. This case study highlights the importance of data-driven decision-making in modern tech companies.",
        tags: ["Data Science", "Case Study"],
        image: "/images/spotify.jpg"
      },
    ],
    caseStudies: [
      {
        id: 1,
        title: "Netflix's Microservices Journey",
        summary: "How Netflix scaled its streaming platform using a microservices architecture.",
        content: "Netflix's transition from a monolithic application to a microservices architecture is a classic case study in distributed systems. Facing immense scaling challenges, they broke down their large application into hundreds of smaller, independently deployable services. This approach allowed them to achieve high availability, fault tolerance, and rapid development cycles. Key takeaways include the importance of robust communication mechanisms, distributed data management, and comprehensive monitoring in a microservices environment.",
        tags: ["Microservices", "Scalability", "Netflix"],
        image: "/images/netflix.jpg"
      },
      {
        id: 2,
        title: "Airbnb's Design System Evolution",
        summary: "A look at how Airbnb built a cohesive user experience across platforms.",
        content: "Airbnb's experience in building a robust design system, 'DLS' (Design Language System), highlights the challenges and benefits of creating consistency across diverse platforms and teams. Their journey involved standardizing components, documentation, and design principles, which significantly improved development speed and brand cohesion. This case study emphasizes the value of collaboration between designers and developers, the need for clear guidelines, and iterative development in building effective design systems.",
        tags: ["Design System", "UX/UI", "Airbnb"],
        image: "/images/airbnb.jpg"
      }
    ],
    expertInterviews: [
      {
        id: 1,
        title: "Interview with a Senior DevOps Engineer",
        summary: "Insights into the day-to-day life and challenges of a DevOps professional.",
        content: "In this exclusive interview, [Expert Name], a Senior DevOps Engineer at [Company Name], shares their experiences with implementing CI/CD pipelines, managing cloud infrastructure, and fostering a culture of collaboration. They discuss the importance of automation, observability, and security in modern software delivery. Key topics include the adoption of GitOps, serverless architectures, and the continuous learning required to stay ahead in the rapidly evolving DevOps landscape.",
        tags: ["DevOps", "Interview", "Career"],
        image: "/images/expert-interview.jpg"
      },
      {
        id: 2,
        title: "A Day in the Life of a Machine Learning Engineer",
        summary: "What it's like to build and deploy ML models in production.",
        content: "Join [Expert Name], a Machine Learning Engineer at [Company Name], as they walk us through their typical day, from data preprocessing and model training to deployment and monitoring of AI solutions. They delve into the challenges of ensuring model fairness, interpretability, and performance in real-world scenarios. The interview highlights the blend of coding, statistical analysis, and domain expertise required for a successful career in machine learning.",
        tags: ["Machine Learning", "AI", "Interview"],
        image: "/images/ml-engineer.jpg"
      },
      {
        id: 3,
        title: "Interview with a Frontend Architect",
        summary: "Insights from a senior frontend architect on building scalable UIs.",
        content: "[Expert Name], a Frontend Architect at [Company], discusses the challenges of designing scalable and maintainable user interfaces. Topics include component-driven development, performance optimization, and the importance of collaboration between designers and developers.",
        tags: ["Frontend", "Interview"],
        image: "/images/frontend-architect.jpg"
      },
      {
        id: 4,
        title: "Cloud Security Engineer: A Day in the Life",
        summary: "A look into the responsibilities and challenges of a cloud security engineer.",
        content: "[Expert Name], a Cloud Security Engineer at [Company], shares their daily routine, focusing on securing cloud infrastructure, monitoring threats, and implementing best practices for compliance and data protection.",
        tags: ["Cloud", "Security", "Interview"],
        image: "/images/cloud-security.jpg"
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "AI in Software Development Quiz",
        description: "Test your knowledge on the impact of AI on software engineering practices.",
        image: "/images/ai-dev.jpg",
        questions: [
          {
            id: 1,
            question: "Which of these is NOT a common application of AI in software development?",
            options: [
              "Automated code generation",
              "Predictive analytics for system failures",
              "Manual regression testing",
              "Intelligent debugging assistance"
            ],
            correctAnswer: "Manual regression testing"
          },
          {
            id: 2,
            question: "What is a primary benefit of AI-powered code refactoring tools?",
            options: [
              "Increased code complexity",
              "Automated bug introduction",
              "Improved code quality and maintainability",
              "Reduced team collaboration"
            ],
            correctAnswer: "Improved code quality and maintainability"
          }
        ]
      },
      {
        id: 2,
        title: "Web3 Fundamentals Quiz",
        description: "Check your understanding of decentralized technologies and their components.",
        image: "/images/web3.jpg",
        questions: [
          {
            id: 1,
            question: "Which term best describes a decentralized application?",
            options: [
              "Centralized database",
              "DApp",
              "Monolithic architecture",
              "Cloud-hosted service"
            ],
            correctAnswer: "DApp"
          },
          {
            id: 2,
            question: "What is the primary technology underlying Web3?",
            options: [
              "HTTP/2",
              "Blockchain",
              "SQL Databases",
              "NoSQL Databases"
            ],
            correctAnswer: "Blockchain"
          }
        ]
      },
      {
        id: 3,
        title: "Quantum Computing Quiz",
        description: "Test your knowledge of quantum computing fundamentals.",
        image: "/images/quantum-computing.jpg",
        questions: [
          {
            id: 1,
            question: "What is the main advantage of quantum computing over classical computing?",
            options: [
              "Lower power consumption",
              "Ability to solve certain problems exponentially faster",
              "Cheaper hardware",
              "Easier programming languages"
            ],
            correctAnswer: "Ability to solve certain problems exponentially faster"
          }
        ]
      },
      {
        id: 4,
        title: "Data Science in Music Quiz",
        description: "How well do you know how data science is used in music platforms?",
        image: "/images/spotify.jpg",
        questions: [
          {
            id: 1,
            question: "Which company is known for using data science to personalize music recommendations?",
            options: [
              "Netflix",
              "Spotify",
              "Amazon",
              "Google"
            ],
            correctAnswer: "Spotify"
          }
        ]
      },
      {
        id: 5,
        title: "Cloud Computing Basics Quiz",
        description: "Test your understanding of cloud computing concepts and benefits.",
        image: "/images/edge-computing.jpg",
        questions: [
          {
            id: 1,
            question: "Which of the following is NOT a cloud service model?",
            options: [
              "IaaS",
              "PaaS",
              "SaaS",
              "BIOS"
            ],
            correctAnswer: "BIOS"
          },
          {
            id: 2,
            question: "What is the main benefit of cloud computing for businesses?",
            options: [
              "Increased hardware costs",
              "Scalability and flexibility",
              "Slower deployment",
              "Limited access"
            ],
            correctAnswer: "Scalability and flexibility"
          }
        ]
      },
      {
        id: 6,
        title: "Frontend Frameworks Quiz",
        description: "Check your knowledge of popular frontend frameworks.",
        image: "/images/frontend-architect.jpg",
        questions: [
          {
            id: 1,
            question: "Which JavaScript framework is maintained by Facebook?",
            options: [
              "Angular",
              "Vue.js",
              "React",
              "Svelte"
            ],
            correctAnswer: "React"
          }
        ]
      },
      {
        id: 7,
        title: "Machine Learning Fundamentals Quiz",
        description: "Assess your understanding of basic machine learning concepts.",
        image: "/images/ml-engineer.jpg",
        questions: [
          {
            id: 1,
            question: "What is overfitting in machine learning?",
            options: [
              "A model that performs well on training data but poorly on new data",
              "A model that underestimates the data",
              "A model that ignores input features",
              "A model that never updates"
            ],
            correctAnswer: "A model that performs well on training data but poorly on new data"
          }
        ]
      },
    ]
  };

  const filteredInsights = insightsData[activeTab]?.filter(insight =>
    insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    insight.summary.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleQuizChange = (quizId, questionId, selectedOption) => {
    setQuizResults(prev => ({
      ...prev,
      [quizId]: {
        ...(prev[quizId] || {}),
        [questionId]: selectedOption
      }
    }));
  };

  const handleSubmitQuiz = (quiz) => {
    const results = {};
    let correctCount = 0;
    quiz.questions.forEach(q => {
      const userAnswer = quizResults[quiz.id]?.[q.id];
      const isCorrect = userAnswer === q.correctAnswer;
      results[q.id] = { userAnswer, isCorrect };
      if (isCorrect) correctCount++;
    });
    setQuizResults(prev => ({
      ...prev,
      [quiz.id]: { ...prev[quiz.id], submitted: true, score: correctCount, total: quiz.questions.length }
    }));
    setQuizSubmitted(true);
    // Confetti for perfect score
    if (correctCount === quiz.questions.length) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);
    }
  };

  const getQuizScore = (quizId) => {
    return quizResults[quizId]?.score !== undefined
      ? `${quizResults[quizId].score} / ${quizResults[quizId].total}`
      : 'Not attempted';
  };

  return (
    <section className="content-section card" id="industryRealityCheckSection">
      <Confetti show={showConfetti} />
      <div className="card__body">
        <div className="reality-check-header">
          <h1>Industry Reality Check</h1>
          <p>Stay updated with the latest tech trends, industry insights, and real-world case studies.</p>
        </div>

        <div className="reality-check-tabs">
          <button
            className={`tab-button ${activeTab === 'trends' ? 'active' : ''}`}
            onClick={() => { setActiveTab('trends'); setSelectedInsight(null); setQuizSubmitted(false); }}
          >
            <i className="fas fa-chart-line"></i>
            Trends
          </button>
          <button
            className={`tab-button ${activeTab === 'caseStudies' ? 'active' : ''}`}
            onClick={() => { setActiveTab('caseStudies'); setSelectedInsight(null); setQuizSubmitted(false); }}
          >
            <i className="fas fa-lightbulb"></i>
            Case Studies
          </button>
          <button
            className={`tab-button ${activeTab === 'expertInterviews' ? 'active' : ''}`}
            onClick={() => { setActiveTab('expertInterviews'); setSelectedInsight(null); setQuizSubmitted(false); }}
          >
            <i className="fas fa-user-tie"></i>
            Expert Interviews
          </button>
          <button
            className={`tab-button ${activeTab === 'quizzes' ? 'active' : ''}`}
            onClick={() => { setActiveTab('quizzes'); setSelectedInsight(null); setQuizSubmitted(false); }}
          >
            <i className="fas fa-question-circle"></i>
            Quizzes
          </button>
          <button
            className={`tab-button ${activeTab === 'quizGame' ? 'active' : ''}`}
            onClick={() => { setActiveTab('quizGame'); setSelectedInsight(null); setQuizSubmitted(false); }}
          >
            <i className="fas fa-gamepad"></i>
            Quiz Game
          </button>
          <button
            className={`tab-button ${activeTab === 'game' ? 'active' : ''}`}
            onClick={() => { setActiveTab('game'); setSelectedInsight(null); setQuizSubmitted(false); }}
          >
            <i className="fas fa-dice"></i>
            Game
          </button>
        </div>

        <div className="reality-check-content">
          {selectedInsight ? (
            <div className="insight-detail">
              <button className="back-button" onClick={() => setSelectedInsight(null)}>
                <i className="fas fa-arrow-left"></i> Back to all insights
              </button>
              <h2>{selectedInsight.title}</h2>
              <div className="insight-meta">
                {selectedInsight.tags?.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              {(
                selectedInsight.image || !selectedInsight.image
              ) && (
                <img
                  src={selectedInsight.image ? selectedInsight.image : getUnsplashImage(selectedInsight.title || selectedInsight.tags?.[0] || 'technology')}
                  alt={selectedInsight.title}
                  className="insight-image"
                  onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found'; }}
                />
              )}
              <p className="insight-content-text">{selectedInsight.content}</p>
            </div>
          ) : (
            <>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>

              {isLoading ? (
                <div className="loading-indicator">
                  <div className="spinner"></div>
                  <p>Loading insights...</p>
                </div>
              ) : filteredInsights.length > 0 ? (
                <div className="insight-grid">
                  {filteredInsights.map(insight => (
                    <div key={insight.id} className="insight-card" onClick={() => setSelectedInsight(insight)}>
                      <div className="card__body">
                        {(
                          insight.image || !insight.image
                        ) && (
                          <img
                            src={insight.image ? insight.image : getUnsplashImage(insight.title || insight.tags?.[0] || 'technology')}
                            alt={insight.title}
                            className="insight-card-image"
                            onError={e => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                              e.target.style.opacity = 0.5;
                              const parent = e.target.parentNode;
                              if (parent && !parent.querySelector('.image-error-msg')) {
                                const msg = document.createElement('div');
                                msg.className = 'image-error-msg';
                                msg.style = 'color: red; font-weight: bold; margin-top: -2.5rem; background: rgba(255,255,255,0.8); padding: 0.3rem 0.7rem; border-radius: 6px; position: absolute; left: 1rem; top: 1rem; z-index: 2;';
                                msg.innerText = 'Image failed to load!';
                                parent.style.position = 'relative';
                                parent.appendChild(msg);
                              }
                            }}
                          />
                        )}
                        <h4>{insight.title}</h4>
                        <p>{insight.summary}</p>
                        <div className="insight-tags">
                          {insight.tags?.map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                          ))}
                        </div>
                        {activeTab === 'quizzes' && (
                          <div className="quiz-status">
                            Current Score: <span className="score-text">{getQuizScore(insight.id)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : activeTab === 'quizzes' ? (
                <SimpleQuiz />
              ) : (
                null
              )}

              {activeTab === 'quizzes' && filteredInsights.length > 0 && (
                <div className="quizzes-section">
                  {filteredInsights.map(quiz => (
                    <div key={quiz.id} className="quiz-card">
                      <div className="card__body">
                        <h2>{quiz.title}</h2>
                        <p>{quiz.description}</p>
                        {!quizResults[quiz.id]?.submitted ? (
                          <form onSubmit={(e) => { e.preventDefault(); handleSubmitQuiz(quiz); }}>
                            {quiz.questions.map(q => (
                              <div key={q.id} className="quiz-question">
                                <h4>{q.question}</h4>
                                <div className="options-grid">
                                  {q.options.map(option => (
                                    <label key={option} className="option-label">
                                      <input
                                        type="radio"
                                        name={`question-${quiz.id}-${q.id}`}
                                        value={option}
                                        checked={quizResults[quiz.id]?.[q.id] === option}
                                        onChange={() => handleQuizChange(quiz.id, q.id, option)}
                                      />
                                      <span>{option}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <button type="submit" className="btn btn--primary" disabled={!Object.keys(quizResults[quiz.id] || {}).length}>
                              Submit Quiz
                            </button>
                          </form>
                        ) : (
                          <div className="quiz-result-summary">
                            <h3>Your Score: {quizResults[quiz.id].score} / {quizResults[quiz.id].total}</h3>
                            <div className="quiz-answers">
                              {quiz.questions.map(q => (
                                <div key={q.id} className="quiz-question-result">
                                  <h4>{q.question}</h4>
                                  <p>
                                    Your Answer: <span className={quizResults[quiz.id]?.[q.id] === q.correctAnswer ? 'correct-answer' : 'wrong-answer'}>
                                      {quizResults[quiz.id]?.[q.id] || 'Not answered'}
                                    </span>
                                  </p>
                                  {quizResults[quiz.id]?.[q.id] !== q.correctAnswer && (
                                    <p>Correct Answer: <span className="correct-answer">{q.correctAnswer}</span></p>
                                  )}
                                </div>
                              ))}
                            </div>
                            <button 
                              className="btn btn--secondary"
                              onClick={() => { setQuizResults(prev => { const newResults = { ...prev }; delete newResults[quiz.id]; return newResults; }); setQuizSubmitted(false); }}
                            >
                              Retake Quiz
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'quizGame' && (
            <QuizGameComponent quizzes={insightsData.quizzes} />
          )}

          {activeTab === 'game' && (
            <MiniQuizGame />
          )}
        </div>
      </div>
    </section>
  );
};

export default IndustryRealityCheckSection; 