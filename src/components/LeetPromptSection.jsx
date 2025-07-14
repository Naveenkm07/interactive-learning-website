import React, { useState } from 'react';

const LeetPromptSection = () => {
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [code, setCode] = useState('');
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const challengeData = {
    difficulties: [
      { id: 'all', name: 'All Difficulties' },
      { id: 'easy', name: 'Easy' },
      { id: 'medium', name: 'Medium' },
      { id: 'hard', name: 'Hard' },
    ],
    languages: [
      { id: 'all', name: 'All Languages' },
      { id: 'javascript', name: 'JavaScript' },
      { id: 'python', name: 'Python' },
      { id: 'java', name: 'Java' },
      { id: 'cpp', name: 'C++' },
    ],
    challenges: [
      {
        id: 1,
        title: 'Two Sum',
        difficulty: 'easy',
        topics: ['Arrays', 'Hash Table'],
        description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
        examples: [
          { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
          { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].' },
        ],
        solution: 'A common approach is to use a hash map to store numbers and their indices. For each number, check if \`target - number\` exists in the hash map. If it does, you found your pair.',
      },
      {
        id: 2,
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'medium',
        topics: ['Strings', 'Sliding Window', 'Hash Map'],
        description: 'Given a string `s`, find the length of the longest substring without repeating characters.',
        examples: [
          { input: 's = \"abcabcbb\" ', output: '3', explanation: 'The answer is \"abc\", with the length of 3.' },
          { input: 's = \"bbbbb\" ', output: '1', explanation: 'The answer is \"b\", with the length of 1.' },
        ],
        solution: 'Use a sliding window approach with a hash set to keep track of characters in the current window. Expand the window if no repetition; shrink from the left if a repetition occurs.',
      },
      {
        id: 3,
        title: 'Merge K Sorted Lists',
        difficulty: 'hard',
        topics: ['Linked List', 'Divide and Conquer', 'Heap (Priority Queue)'],
        description: 'You are given an array of `k` linked-lists `lists`, each sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
        examples: [
          { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]', explanation: 'Merging the three sorted lists results in one combined sorted list.' },
        ],
        solution: 'A common approach is to use a min-heap (priority queue) to keep track of the smallest element from each list. Continuously extract the minimum, add it to the result list, and add the next element from that list to the heap.',
      },
    ],
  };

  const filteredChallenges = challengeData.challenges.filter((challenge) => {
    const matchesDifficulty = filterDifficulty === 'all' || challenge.difficulty === filterDifficulty;
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          challenge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          challenge.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDifficulty && matchesSearch;
  });

  const handleChallengeClick = (challenge) => {
    setSelectedChallenge(challenge);
    setCode('// Write your code here\n');
    setSubmissionResult(null);
  };

  const handleBackToList = () => {
    setSelectedChallenge(null);
  };

  const handleSubmitCode = () => {
    // Simulate code submission and evaluation
    setIsTyping(true); // Simulate processing
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5; // 50% chance of success
      setSubmissionResult({
        success: isSuccess,
        message: isSuccess ? 'Test cases passed! Great job!' : 'Some test cases failed. Keep trying!',
        details: isSuccess ? 'Your solution ran efficiently and correctly against all provided test cases.' : 'Review your logic, edge cases, and time/space complexity.',
      });
      setIsTyping(false);
    }, 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  return (
    <section className="content-section card" id="leetpromptSection">
      <div className="card__body leetprompt-container">
        <div className="leetprompt-header">
          <h1>LeetPrompt Challenges</h1>
          <p>Sharpen your problem-solving and coding skills with a variety of technical challenges.</p>
        </div>

        {!selectedChallenge ? (
          <div className="challenge-list-view">
            <div className="challenge-filters">
              <div className="filter-group">
                <label htmlFor="difficulty-filter">Difficulty:</label>
                <select
                  id="difficulty-filter"
                  className="form-control"
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                >
                  {challengeData.difficulties.map((diff) => (
                    <option key={diff.id} value={diff.id}>{diff.name}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="language-filter">Language (simulated):</label>
                <select
                  id="language-filter"
                  className="form-control"
                  value={filterLanguage}
                  onChange={(e) => setFilterLanguage(e.target.value)}
                >
                  {challengeData.languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                  ))}
                </select>
              </div>

              <div className="search-group">
                <label htmlFor="challenge-search">Search Challenges:</label>
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    id="challenge-search"
                    className="form-control"
                    placeholder="Search by title or topic..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>

            <div className="challenge-grid">
              {filteredChallenges.length > 0 ? (
                filteredChallenges.map((challenge) => (
                  <div className="challenge-card" key={challenge.id} onClick={() => handleChallengeClick(challenge)}>
                    <div className="card__body">
                      <h3>{challenge.title}</h3>
                      <p className={`difficulty-badge ${challenge.difficulty}`}>{challenge.difficulty}</p>
                      <div className="topics-tags">
                        {challenge.topics.map((topic) => (
                          <span key={topic} className="tag">{topic}</span>
                        ))}
                      </div>
                      <p className="challenge-description-short">{challenge.description.substring(0, 100)}...</p>
                      <button className="btn btn--sm btn--primary start-challenge-btn">
                        <i className="fas fa-play-circle"></i> Start Challenge
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-challenges-found">
                  <i className="fas fa-frown"></i>
                  <h3>No Challenges Found</h3>
                  <p>Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="challenge-detail-view">
            <button className="btn btn--outline back-button" onClick={handleBackToList}>
              <i className="fas fa-arrow-left"></i> Back to Challenges
            </button>
            <div className="detail-header">
              <h2>{selectedChallenge.title}</h2>
              <p className={`difficulty-badge ${selectedChallenge.difficulty}`}>{selectedChallenge.difficulty}</p>
              <div className="topics-tags">
                {selectedChallenge.topics.map((topic) => (
                  <span key={topic} className="tag">{topic}</span>
                ))}
              </div>
            </div>
            <div className="detail-content">
              <h3>Problem Description</h3>
              <p>{selectedChallenge.description}</p>
              <h3>Examples</h3>
              {selectedChallenge.examples.map((example, index) => (
                <div key={index} className="example-block">
                  <h4>Input:</h4>
                  <pre><code>{example.input}</code></pre>
                  <h4>Output:</h4>
                  <pre><code>{example.output}</code></pre>
                  {example.explanation && (
                    <><h4>Explanation:</h4><p>{example.explanation}</p></>
                  )}
                </div>
              ))}
              <h3>Your Code</h3>
              <textarea
                className="code-editor"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Write your solution here..."
                rows="15"
              ></textarea>
              <div className="code-actions">
                <button className="btn btn--secondary" onClick={handleCopyCode}>
                  <i className="fas fa-copy"></i> Copy Code
                </button>
                <button
                  className="btn btn--primary"
                  onClick={handleSubmitCode}
                  disabled={isTyping}
                >
                  <i className="fas fa-paper-plane"></i> {isTyping ? 'Running Tests...' : 'Submit Code'}
                </button>
              </div>
              {submissionResult && (
                <div className={`submission-result ${submissionResult.success ? 'success' : 'error'}`}>
                  <h4>{submissionResult.message}</h4>
                  <p>{submissionResult.details}</p>
                  {!submissionResult.success && selectedChallenge.solution && (
                    <div className="solution-hint">
                      <h4>Hint / Solution Approach:</h4>
                      <p>{selectedChallenge.solution}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LeetPromptSection; 