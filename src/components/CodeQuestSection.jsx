import React, { useState } from 'react';

const CodeQuestSection = () => {
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [activeTab, setActiveTab] = useState('active');

  const questData = {
    categories: [
      { id: 'all', name: 'All Quests' },
      { id: 'data-structures', name: 'Data Structures' },
      { id: 'algorithms', name: 'Algorithms' },
      { id: 'system-design', name: 'System Design' },
      { id: 'frontend', name: 'Frontend' },
      { id: 'backend', name: 'Backend' },
    ],
    quests: [
      {
        id: 1,
        title: 'Data Structures Dungeon',
        category: 'data-structures',
        difficulty: 'medium',
        description: 'Master fundamental data structures through interactive challenges.',
        longDescription: 'Embark on an epic journey through the Data Structures Dungeon! Conquer arrays, linked lists, stacks, queues, trees, and graphs. Each level presents unique challenges that will test your understanding and implementation skills.',
        progress: 65,
        totalSteps: 8,
        completedSteps: 5,
        rewards: {
          xp: 500,
          badges: ['Data Master', 'Structure Builder'],
          coins: 250
        },
        steps: [
          { id: 1, title: 'Array Adventures', completed: true, xp: 50 },
          { id: 2, title: 'Linked List Labyrinth', completed: true, xp: 75 },
          { id: 3, title: 'Stack & Queue Quest', completed: true, xp: 60 },
          { id: 4, title: 'Tree Traversal Trials', completed: true, xp: 80 },
          { id: 5, title: 'Graph Graph Theory', completed: true, xp: 90 },
          { id: 6, title: 'Hash Table Hunt', completed: false, xp: 70 },
          { id: 7, title: 'Heap Hierarchy', completed: false, xp: 85 },
          { id: 8, title: 'Final Boss: Advanced DS', completed: false, xp: 120 }
        ],
        image: 'https://via.placeholder.com/400x250/4A90E2/FFFFFF?text=Data+Structures'
      },
      {
        id: 2,
        title: 'Algorithms Arena',
        category: 'algorithms',
        difficulty: 'hard',
        description: 'Battle through complex algorithmic challenges and optimization problems.',
        longDescription: 'Enter the Algorithms Arena where only the most efficient solutions survive! Face off against sorting algorithms, dynamic programming, greedy approaches, and advanced optimization techniques.',
        progress: 30,
        totalSteps: 10,
        completedSteps: 3,
        rewards: {
          xp: 800,
          badges: ['Algorithm Master', 'Optimization Expert'],
          coins: 400
        },
        steps: [
          { id: 1, title: 'Sorting Showdown', completed: true, xp: 60 },
          { id: 2, title: 'Search Strategies', completed: true, xp: 50 },
          { id: 3, title: 'Dynamic Programming', completed: true, xp: 100 },
          { id: 4, title: 'Greedy Algorithms', completed: false, xp: 80 },
          { id: 5, title: 'Graph Algorithms', completed: false, xp: 90 },
          { id: 6, title: 'String Algorithms', completed: false, xp: 70 },
          { id: 7, title: 'Advanced DP', completed: false, xp: 120 },
          { id: 8, title: 'Optimization Techniques', completed: false, xp: 110 },
          { id: 9, title: 'Competitive Programming', completed: false, xp: 150 },
          { id: 10, title: 'Final Challenge', completed: false, xp: 200 }
        ],
        image: 'https://via.placeholder.com/400x250/50C878/FFFFFF?text=Algorithms'
      },
      {
        id: 3,
        title: 'System Design Summit',
        category: 'system-design',
        difficulty: 'hard',
        description: 'Design scalable systems and architecture patterns.',
        longDescription: 'Climb the System Design Summit and become an architecture master! Learn to design scalable systems, understand distributed systems, and master the art of building robust, high-performance applications.',
        progress: 20,
        totalSteps: 6,
        completedSteps: 1,
        rewards: {
          xp: 600,
          badges: ['System Architect', 'Scalability Expert'],
          coins: 300
        },
        steps: [
          { id: 1, title: 'Basic Architecture', completed: true, xp: 80 },
          { id: 2, title: 'Scalability Patterns', completed: false, xp: 100 },
          { id: 3, title: 'Database Design', completed: false, xp: 90 },
          { id: 4, title: 'Caching Strategies', completed: false, xp: 70 },
          { id: 5, title: 'Load Balancing', completed: false, xp: 85 },
          { id: 6, title: 'Final Design Challenge', completed: false, xp: 150 }
        ],
        image: 'https://via.placeholder.com/400x250/FF6B35/FFFFFF?text=System+Design'
      },
      {
        id: 4,
        title: 'Frontend Fortress',
        category: 'frontend',
        difficulty: 'medium',
        description: 'Build modern, responsive user interfaces and interactive web applications.',
        longDescription: 'Defend the Frontend Fortress by mastering modern web technologies! Create beautiful, responsive interfaces using React, Vue, Angular, and advanced CSS techniques.',
        progress: 0,
        totalSteps: 7,
        completedSteps: 0,
        rewards: {
          xp: 400,
          badges: ['Frontend Warrior', 'UI/UX Master'],
          coins: 200
        },
        steps: [
          { id: 1, title: 'HTML & CSS Basics', completed: false, xp: 40 },
          { id: 2, title: 'JavaScript Fundamentals', completed: false, xp: 60 },
          { id: 3, title: 'React Revolution', completed: false, xp: 80 },
          { id: 4, title: 'State Management', completed: false, xp: 70 },
          { id: 5, title: 'Advanced CSS', completed: false, xp: 50 },
          { id: 6, title: 'Performance Optimization', completed: false, xp: 90 },
          { id: 7, title: 'Final Project', completed: false, xp: 100 }
        ],
        image: 'https://via.placeholder.com/400x250/9B59B6/FFFFFF?text=Frontend'
      }
    ]
  };

  const filteredQuests = questData.quests.filter(quest => {
    if (activeTab === 'active') return quest.progress > 0 && quest.progress < 100;
    if (activeTab === 'completed') return quest.progress === 100;
    if (activeTab === 'available') return quest.progress === 0;
    return true;
  });

  const handleQuestClick = (quest) => {
    setSelectedQuest(quest);
  };

  const handleBackToList = () => {
    setSelectedQuest(null);
  };

  const handleStepComplete = (stepId) => {
    if (selectedQuest) {
      const updatedQuest = { ...selectedQuest };
      const step = updatedQuest.steps.find(s => s.id === stepId);
      if (step && !step.completed) {
        step.completed = true;
        updatedQuest.completedSteps += 1;
        updatedQuest.progress = Math.round((updatedQuest.completedSteps / updatedQuest.totalSteps) * 100);
        setSelectedQuest(updatedQuest);
      }
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'info';
    }
  };

  return (
    <section className="content-section card" id="codeQuestSection">
      <div className="card__body codequest-container">
        <div className="codequest-header">
          <h1>CodeQuest Adventures</h1>
          <p>Gamified coding challenges with interactive quests, progress tracking, and rewards.</p>
        </div>

        {!selectedQuest ? (
          <div className="quest-list-view">
            <div className="quest-tabs">
              <button 
                className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Quests
              </button>
              <button 
                className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => setActiveTab('active')}
              >
                In Progress
              </button>
              <button 
                className={`tab-button ${activeTab === 'available' ? 'active' : ''}`}
                onClick={() => setActiveTab('available')}
              >
                Available
              </button>
              <button 
                className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
                onClick={() => setActiveTab('completed')}
              >
                Completed
              </button>
            </div>

            <div className="quest-grid">
              {filteredQuests.length > 0 ? (
                filteredQuests.map((quest) => (
                  <div className="quest-card" key={quest.id} onClick={() => handleQuestClick(quest)}>
                    <div className="card__body">
                      <img src={quest.image} alt={quest.title} className="quest-card-image" />
                      <div className="quest-card-content">
                        <h3>{quest.title}</h3>
                        <p className="quest-category">{questData.categories.find(c => c.id === quest.category)?.name}</p>
                        <p className={`quest-difficulty difficulty-badge ${getDifficultyColor(quest.difficulty)}`}>
                          {quest.difficulty}
                        </p>
                        <p className="quest-description">{quest.description}</p>
                        <div className="quest-progress">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${quest.progress}%` }}
                            ></div>
                          </div>
                          <span className="progress-text">{quest.progress}% Complete</span>
                        </div>
                        <div className="quest-rewards">
                          <span><i className="fas fa-star"></i> {quest.rewards.xp} XP</span>
                          <span><i className="fas fa-coins"></i> {quest.rewards.coins} Coins</span>
                        </div>
                        <button className="btn btn--primary view-quest-btn">
                          <i className="fas fa-play"></i> Continue Quest
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-quests-found">
                  <i className="fas fa-map"></i>
                  <h3>No Quests Found</h3>
                  <p>Try selecting a different tab or check back later for new quests.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="quest-detail-view">
            <button className="btn btn--outline back-button" onClick={handleBackToList}>
              <i className="fas fa-arrow-left"></i> Back to Quests
            </button>
            
            <div className="quest-detail-header">
              <img src={selectedQuest.image} alt={selectedQuest.title} className="quest-detail-image" />
              <div className="quest-detail-info">
                <h2>{selectedQuest.title}</h2>
                <p className="quest-detail-category">
                  {questData.categories.find(c => c.id === selectedQuest.category)?.name}
                </p>
                <p className={`quest-detail-difficulty difficulty-badge ${getDifficultyColor(selectedQuest.difficulty)}`}>
                  {selectedQuest.difficulty}
                </p>
                <div className="quest-detail-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${selectedQuest.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">
                    {selectedQuest.completedSteps} / {selectedQuest.totalSteps} Steps Complete
                  </span>
                </div>
              </div>
            </div>

            <div className="quest-detail-content">
              <h3>Quest Description</h3>
              <p>{selectedQuest.longDescription}</p>
              
              <h3>Quest Steps</h3>
              <div className="quest-steps">
                {selectedQuest.steps.map((step) => (
                  <div key={step.id} className={`quest-step ${step.completed ? 'completed' : ''}`}>
                    <div className="step-header">
                      <span className="step-number">{step.id}</span>
                      <h4>{step.title}</h4>
                      <span className="step-xp">{step.xp} XP</span>
                    </div>
                    <div className="step-status">
                      {step.completed ? (
                        <span className="step-completed">
                          <i className="fas fa-check-circle"></i> Completed
                        </span>
                      ) : (
                        <button 
                          className="btn btn--sm btn--primary"
                          onClick={() => handleStepComplete(step.id)}
                        >
                          <i className="fas fa-play"></i> Start Step
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <h3>Rewards</h3>
              <div className="quest-rewards-detail">
                <div className="reward-item">
                  <i className="fas fa-star"></i>
                  <span>{selectedQuest.rewards.xp} Experience Points</span>
                </div>
                <div className="reward-item">
                  <i className="fas fa-coins"></i>
                  <span>{selectedQuest.rewards.coins} Coins</span>
                </div>
                <div className="reward-badges">
                  <h4>Badges:</h4>
                  {selectedQuest.rewards.badges.map((badge, index) => (
                    <span key={index} className="badge">{badge}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CodeQuestSection; 