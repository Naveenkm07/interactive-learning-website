import React, { useState } from 'react';

const LearningPathSection = () => {
  const [currentLevel, setCurrentLevel] = useState(1); // Start at Level 1
  const [personalizedAdvice, setPersonalizedAdvice] = useState("");
  const [personalizeLoading, setPersonalizeLoading] = useState(false);

  const learningPathData = {
    levels: [
      {
        id: 1,
        title: 'Level 1: Foundations',
        description: 'Establish a strong foundation in core programming concepts and basic web technologies.',
        recommendedResources: [
          { type: 'course', name: 'Introduction to Programming', link: '#coursesSection', icon: 'fas fa-book-open' },
          { type: 'project', name: 'Simple Portfolio Website', link: '#projectsSection', icon: 'fas fa-folder-open' },
          { type: 'challenge', name: 'Basic Array Manipulation', link: '#leetpromptSection', icon: 'fas fa-code' },
        ],
        milestone: 'Complete basic syntax and build a static webpage.',
      },
      {
        id: 2,
        title: 'Level 2: Core Development',
        description: 'Dive deeper into a specific technology stack and begin building interactive applications.',
        recommendedResources: [
          { type: 'course', name: 'React.js Fundamentals', link: '#coursesSection', icon: 'fas fa-book-open' },
          { type: 'project', name: 'Interactive To-Do App', link: '#projectsSection', icon: 'fas fa-folder-open' },
          { type: 'challenge', name: 'Dynamic Programming Basics', link: '#leetpromptSection', icon: 'fas fa-code' },
        ],
        milestone: 'Develop a responsive web application with a chosen framework.',
      },
      {
        id: 3,
        title: 'Level 3: Advanced Concepts',
        description: 'Explore advanced topics like state management, backend integration, and data handling.',
        recommendedResources: [
          { type: 'course', name: 'Node.js and Express API', link: '#coursesSection', icon: 'fas fa-book-open' },
          { type: 'project', name: 'RESTful Blog API', link: '#projectsSection', icon: 'fas fa-folder-open' },
          { type: 'challenge', name: 'Graph Traversal Problems', link: '#leetpromptSection', icon: 'fas fa-code' },
        ],
        milestone: 'Build a full-stack application with database integration.',
      },
      {
        id: 4,
        title: 'Level 4: Specialization & Optimization',
        description: 'Focus on a specialized area, optimize performance, and understand deployment strategies.',
        recommendedResources: [
          { type: 'course', name: 'Cloud Computing Fundamentals (AWS/Azure/GCP)', link: '#coursesSection', icon: 'fas fa-book-open' },
          { type: 'project', name: 'Serverless Microservice', link: '#projectsSection', icon: 'fas fa-folder-open' },
          { type: 'challenge', name: 'System Design Interview Prep', link: '#leetpromptSection', icon: 'fas fa-code' },
        ],
        milestone: 'Deploy a production-ready application and optimize its performance.',
      },
      {
        id: 5,
        title: 'Level 5: Career Readiness',
        description: 'Refine your resume, prepare for interviews, and build a strong online presence.',
        recommendedResources: [
          { type: 'course', name: 'Effective Interview Techniques', link: '#coursesSection', icon: 'fas fa-book-open' },
          { type: 'project', name: 'Personal Branding Website', link: '#projectsSection', icon: 'fas fa-folder-open' },
          { type: 'challenge', name: 'Mock Interview Simulation', link: '#interviewQuestionsSection', icon: 'fas fa-code' },
        ],
        milestone: 'Secure your first developer job or advance in your current role.',
      },
    ],
  };

  const currentLevelData = learningPathData.levels[currentLevel - 1];

  const handleAdvanceLevel = () => {
    if (currentLevel < learningPathData.levels.length) {
      setCurrentLevel(prevLevel => prevLevel + 1);
    }
  };

  const handleStartInterview = () => {
    // This would typically navigate to the Interview Questions section
    // For now, we'll simulate an action or alert.
    alert('Starting your personalized interview preparation!');
    window.location.hash = '#interviewQuestionsSection'; // Navigate to the Interview Questions section
  };

  const handlePersonalizePath = async () => {
    setPersonalizeLoading(true);
    setPersonalizedAdvice("");
    const advice = await getGeminiPersonalizedPath(currentLevel, currentLevelData, learningPathData.levels.length);
    setPersonalizedAdvice(advice);
    setPersonalizeLoading(false);
  };

  return (
    <section className="learning-path card" id="learningPathSection">
      <div className="card__body">
        <div className="learning-path-header">
          <h2>Begin Your Learning Journey</h2>
          <p>Start with interview preparation and build your skills progressively through our structured learning path.</p>
        </div>
        
        <div className="progress-container">
          <div className="progress-levels">
            {learningPathData.levels.map((level) => (
              <div 
                key={level.id} 
                className={`level-item ${currentLevel >= level.id ? 'active' : ''}`}
                onClick={() => setCurrentLevel(level.id)}
              >
                <div className="level-circle">{level.id}</div>
                <span>Level {level.id}</span>
              </div>
            ))}
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentLevel / learningPathData.levels.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="current-level-details">
          <h3>{currentLevelData.title}</h3>
          <p className="level-description">{currentLevelData.description}</p>
          <p className="level-milestone">**Milestone:** {currentLevelData.milestone}</p>

          <h4>Recommended Resources for Level {currentLevel}:</h4>
          <ul className="recommended-resources-list">
            {currentLevelData.recommendedResources.map((resource, index) => (
              <li key={index}>
                <a href={resource.link} className="resource-item">
                  <i className={resource.icon}></i> {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}: {resource.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="level-actions">
            {currentLevel < learningPathData.levels.length && (
              <button className="btn btn--primary" onClick={handleAdvanceLevel}>
                <i className="fas fa-forward"></i> Mark Level {currentLevel} Complete & Advance to Level {currentLevel + 1}
              </button>
            )}
            {currentLevel === learningPathData.levels.length && (
              <p className="all-levels-complete">Congratulations! You've completed all levels of your learning journey!</p>
            )}
            <button className="btn btn--secondary" onClick={handleStartInterview}>
              <i className="fas fa-play"></i> Start with Interview
            </button>
            <button className="btn btn--tertiary" onClick={handlePersonalizePath} disabled={personalizeLoading} style={{ marginLeft: 8 }}>
              <i className="fas fa-magic"></i> {personalizeLoading ? 'Personalizing...' : 'Personalize My Path'}
            </button>
          </div>
          {personalizeLoading && <div style={{ marginTop: 16, color: '#888', fontStyle: 'italic' }}>AI is personalizing your learning path...</div>}
          {personalizedAdvice && (
            <div style={{ marginTop: 24, background: '#e3f2fd', borderRadius: 8, padding: 16, border: '1px solid #90caf9' }}>
              <h3 style={{ marginTop: 0 }}>AI Personalized Recommendations</h3>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{personalizedAdvice}</pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LearningPathSection;

// Gemini personalized path function
async function getGeminiPersonalizedPath(currentLevel, currentLevelData, totalLevels) {
  const apiKey = "AIzaSyAQ6F1gqBVM7n8Yai6bVGFnTsPadIHXKjQ";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  const prompt = `A user is on level ${currentLevel} out of ${totalLevels} in a learning path. Here is the current level's info: ${JSON.stringify(currentLevelData)}. Based on this, recommend the next best learning steps, resources, and tips personalized for the user. Be specific and actionable.`;
  const body = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No advice from Gemini.";
  } catch (error) {
    return "Error contacting Gemini API: " + error.message;
  }
} 