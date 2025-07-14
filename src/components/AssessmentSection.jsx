import React from 'react';

const AssessmentSection = () => {
  return (
    <section className="assessment-section card" id="assessmentSection">
      <div className="card__body">
        <div className="assessment-header">
          <h2>The Gen AI Upskilling Engine</h2>
          <p>For Tomorrow's Workforce</p>
        </div>
        
        <div className="assessment-flow">
          <div className="flow-step active" data-step="1">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Assess Yourself</h3>
              <p>Undergo a short, dynamic AI-powered assessment designed to understand your current skill level, learning style, and career goals.</p>
            </div>
          </div>
          
          <div className="flow-step" data-step="2">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>100% Personalized Roadmap</h3>
              <p>Every learner gets their own custom-built roadmap, tailored entirely to their goals, skill level, and learning style.</p>
            </div>
          </div>
          
          <div className="flow-step" data-step="3">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Upskill Yourself</h3>
              <p>Learn the right skills, apply them in industry-level real life projects, and grow continuously with AI-guided support.</p>
            </div>
          </div>
        </div>
        
        <div className="assessment-actions">
          <button className="btn btn--primary" id="startAssessmentBtn">
            <i className="fas fa-play"></i>
            Start Assessment
          </button>
          <button className="btn btn--outline" id="viewRoadmapBtn">
            <i className="fas fa-map"></i>
            View My Roadmap
          </button>
        </div>
      </div>
    </section>
  );
};

export default AssessmentSection; 