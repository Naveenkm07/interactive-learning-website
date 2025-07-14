import React from 'react';
import appData from '../data.js';

const CommunitySection = () => {
  return (
    <section className="community-section card" id="communitySection">
      <div className="card__body">
        <h2>Top Gen AI Learners</h2>
        <p>Join our growing community of tech professionals</p>
        
        <div className="community-grid" id="communityGrid">
          {appData.community_members.map((member, index) => (
            <div className="community-member-card" key={index}>
              <div className="member-avatar">{member.avatar}</div>
              <h4 className="member-name">{member.name}</h4>
              <p className="member-role">{member.role}</p>
              <div className="member-score">Score: {member.score}</div>
              <div className={`member-status status--${member.status}`}>{member.status === 'looking' ? 'Looking for Job' : member.status === 'open' ? 'Open to Work' : 'Employed'}</div>
            </div>
          ))}
        </div>
        
        <div className="community-stats">
          <div className="community-stat">
            <span className="stat-number">500+</span>
            <span className="stat-label">Students Community</span>
          </div>
          <div className="community-stat">
            <span className="stat-number">800+</span>
            <span className="stat-label">Users on Platform</span>
          </div>
          <div className="community-stat">
            <span className="stat-number">60+</span>
            <span className="stat-label">Workshops & Webinars</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection; 