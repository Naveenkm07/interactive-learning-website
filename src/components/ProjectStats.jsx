import React from 'react';
import appData from '../data.js';

const ProjectStats = () => {
  return (
    <div className="stat-card card">
      <div className="card__body">
        <h4>Project Stats</h4>
        <div className="stat-values">
          <div className="stat-row">
            <span>Completed</span>
            <span id="project-completed">{appData.project_stats.completed}</span>
          </div>
          <div className="stat-row">
            <span>Avg Score</span>
            <span id="project-avg-score">{appData.project_stats.avg_score}</span>
          </div>
          <div className="stat-row">
            <span>Applied</span>
            <span id="project-applied">{appData.project_stats.applied}</span>
          </div>
        </div>
        <button className="btn btn--secondary btn--sm" id="browseProjectsBtn">
          <i className="fas fa-folder"></i>
          Browse Projects
        </button>
      </div>
    </div>
  );
};

export default ProjectStats; 