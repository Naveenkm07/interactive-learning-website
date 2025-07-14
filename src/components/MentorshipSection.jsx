import React, { useState } from 'react';

const MentorshipSection = () => {
  const [filterExpertise, setFilterExpertise] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMentor, setSelectedMentor] = useState(null);

  const mentorData = {
    expertiseAreas: [
      { id: 'all', name: 'All Expertise' },
      { id: 'ai-ml', name: 'AI/ML' },
      { id: 'web-development', name: 'Web Development' },
      { id: 'data-science', name: 'Data Science' },
      { id: 'product-management', name: 'Product Management' },
      { id: 'devops', name: 'DevOps' },
      { id: 'cloud-computing', name: 'Cloud Computing' },
    ],
    mentors: [
      {
        id: 1,
        name: 'Dr. Anya Sharma',
        role: 'AI/ML Lead',
        company: 'InnovateX',
        expertise: ['AI/ML', 'Deep Learning', 'Natural Language Processing'],
        description: 'Dr. Anya Sharma is a leading expert in AI and machine learning with over 10 years of experience in developing cutting-edge algorithms and deploying scalable AI solutions. She specializes in NLP and computer vision.',
        avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
        availability: 'Mon, Wed, Fri',
        rating: 4.9,
        sessionsCompleted: 120,
        linkedin: '#',
      },
      {
        id: 2,
        name: 'Mr. David Lee',
        role: 'Senior Full Stack Developer',
        company: 'TechSolutions',
        expertise: ['Web Development', 'React', 'Node.js', 'AWS', 'Microservices'],
        description: 'David Lee is a seasoned full-stack developer with extensive experience in building robust web applications using React and Node.js. He enjoys mentoring aspiring developers in best practices and scalable architecture.',
        avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
        availability: 'Tue, Thu',
        rating: 4.8,
        sessionsCompleted: 95,
        linkedin: '#',
      },
      {
        id: 3,
        name: 'Ms. Sarah Chen',
        role: 'Principal Product Manager',
        company: 'Global Products Inc.',
        expertise: ['Product Management', 'Agile', 'User Experience', 'Market Research'],
        description: 'Sarah Chen has a proven track record of bringing successful products to market. She offers insights into product strategy, roadmap development, and cross-functional team leadership.',
        avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
        availability: 'Wed, Fri',
        rating: 5.0,
        sessionsCompleted: 150,
        linkedin: '#',
      },
      {
        id: 4,
        name: 'Dr. Ben Carter',
        role: 'Lead Data Scientist',
        company: 'DataGenius',
        expertise: ['Data Science', 'Python', 'Machine Learning', 'Statistical Analysis', 'Big Data'],
        description: 'Dr. Ben Carter is passionate about extracting actionable insights from complex datasets. He guides mentees through data analysis techniques, model building, and data storytelling.',
        avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
        availability: 'Mon, Tue, Thu',
        rating: 4.7,
        sessionsCompleted: 80,
        linkedin: '#',
      },
      {
        id: 5,
        name: 'Aisha Khan',
        role: 'DevOps Engineer',
        company: 'CloudBridge',
        expertise: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'Cloud Computing'],
        description: 'Aisha Khan helps engineers build robust and automated deployment pipelines. She provides hands-on guidance in infrastructure as code, containerization, and cloud best practices.',
        avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
        availability: 'Tue, Thu, Fri',
        rating: 4.9,
        sessionsCompleted: 110,
        linkedin: '#',
      },
    ],
  };

  const filteredMentors = mentorData.mentors.filter((mentor) => {
    const matchesExpertise = filterExpertise === 'all' || mentor.expertise.some(e => e.toLowerCase().replace(/\s/g, '-') === filterExpertise);
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          mentor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          mentor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          mentor.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesExpertise && matchesSearch;
  });

  const handleMentorClick = (mentor) => {
    setSelectedMentor(mentor);
  };

  const handleBackToList = () => {
    setSelectedMentor(null);
  };

  return (
    <section className="content-section card" id="mentorshipSection">
      <div className="card__body">
        <div className="mentorship-header">
          <h1>Mentorship Program</h1>
          <p>Connect with experienced industry professionals who can guide you through your career journey.</p>
        </div>

        {!selectedMentor ? (
          <div className="mentor-list-view">
            <div className="mentor-filters">
              <div className="filter-group">
                <label htmlFor="expertise-filter">Filter by Expertise:</label>
                <select
                  id="expertise-filter"
                  className="form-control"
                  value={filterExpertise}
                  onChange={(e) => setFilterExpertise(e.target.value)}
                >
                  {mentorData.expertiseAreas.map((area) => (
                    <option key={area.id} value={area.id}>{area.name}</option>
                  ))}
                </select>
              </div>

              <div className="search-group">
                <label htmlFor="mentor-search">Search Mentors:</label>
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    id="mentor-search"
                    className="form-control"
                    placeholder="Search by name, role, or expertise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>

            <div className="mentor-grid">
              {filteredMentors.length > 0 ? (
                filteredMentors.map((mentor) => (
                  <div className="mentor-card" key={mentor.id} onClick={() => handleMentorClick(mentor)}>
                    <div className="card__body">
                      <img src={mentor.avatar} alt={mentor.name} className="mentor-avatar" />
                      <h3>{mentor.name}</h3>
                      <p className="mentor-role">{mentor.role} at {mentor.company}</p>
                      <div className="mentor-expertise-tags">
                        {mentor.expertise.map((exp) => (
                          <span key={exp} className="tag">{exp}</span>
                        ))}
                      </div>
                      <button className="btn btn--sm btn--primary view-profile-btn">
                        <i className="fas fa-eye"></i> View Profile
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-mentors-found">
                  <i className="fas fa-sad-tear"></i>
                  <h3>No Mentors Found</h3>
                  <p>Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mentor-detail-view">
            <button className="btn btn--outline back-button" onClick={handleBackToList}>
              <i className="fas fa-arrow-left"></i> Back to Mentors
            </button>
            <div className="detail-header">
              <img src={selectedMentor.avatar} alt={selectedMentor.name} className="mentor-detail-avatar" />
              <div className="mentor-detail-info">
                <h2>{selectedMentor.name}</h2>
                <p className="mentor-detail-role">{selectedMentor.role} at {selectedMentor.company}</p>
                <div className="mentor-detail-meta">
                  <span><i className="fas fa-star"></i> {selectedMentor.rating} Rating</span>
                  <span><i className="fas fa-clipboard-check"></i> {selectedMentor.sessionsCompleted} Sessions</span>
                  <span><i className="fas fa-calendar-alt"></i> Available: {selectedMentor.availability}</span>
                </div>
              </div>
            </div>
            <div className="mentor-detail-content">
              <h3>About {selectedMentor.name}</h3>
              <p>{selectedMentor.description}</p>
              <h3>Areas of Expertise</h3>
              <div className="mentor-expertise-tags">
                {selectedMentor.expertise.map((exp) => (
                  <span key={exp} className="tag">{exp}</span>
                ))}
              </div>
              <a href={selectedMentor.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg connect-button">
                <i className="fab fa-linkedin"></i> Connect on LinkedIn
              </a>
              <button className="btn btn--secondary btn--lg schedule-button">
                <i className="fas fa-calendar-plus"></i> Schedule Session
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MentorshipSection; 