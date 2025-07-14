import React from 'react';
import appData from '../data.js';

const LeetPromptStats = () => {
  return (
    <div className="stat-card card">
      <div className="card__body">
        <h4>LeetPrompt Stats</h4>
        <div className="stat-values">
          <div className="stat-row">
            <span>Solved</span>
            <span id="leetprompt-solved">{appData.leetprompt_stats.solved}</span>
          </div>
          <div className="stat-row">
            <span>Attempted</span>
            <span id="leetprompt-attempted">{appData.leetprompt_stats.attempted}</span>
          </div>
          <div className="stat-row">
            <span>Accuracy</span>
            <span id="leetprompt-accuracy">{appData.leetprompt_stats.accuracy}%</span>
          </div>
        </div>
        <button className="btn btn--secondary btn--sm" id="solveMoreBtn">
          <i className="fas fa-code"></i>
          Solve More
        </button>
      </div>
    </div>
  );
};

export default LeetPromptStats; 