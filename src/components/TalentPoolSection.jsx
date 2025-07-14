import React, { useState } from 'react';

const TalentPoolSection = () => {
  const [filterRole, setFilterRole] = useState('all');
  const [filterTech, setFilterTech] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const talentData = {
    roles: [
      { id: 'all', name: 'All Roles' },
      { id: 'software-engineer', name: 'Software Engineer' },
      { id: 'data-analyst', name: 'Data Analyst' },
      { id: 'ui-ux-designer', name: 'UI/UX Designer' },
      { id: 'product-manager', name: 'Product Manager' },
    ],
    technologies: [
      { id: 'all', name: 'All Technologies' },
      { id: 'javascript', name: 'JavaScript' },
      { id: 'python', name: 'Python' },
      { id: 'react', name: 'React' },
      { id: 'nodejs', name: 'Node.js' },
      { id: 'sql', name: 'SQL' },
      { id: 'figma', name: 'Figma' },
      { id: 'aws', name: 'AWS' },
    ],
    candidates: [
      {
        id: 1,
        name: 'Alice Johnson',
        role: 'Software Engineer',
        experience: '5 Years',
        technologies: ['JavaScript', 'React', 'Node.js', 'AWS'],
        status: 'Open to Work',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        description: 'Experienced full-stack developer with a strong background in building scalable web applications.',
        linkedin: '#',
        github: '#',
      },
      {
        id: 2,
        name: 'Bob Williams',
        role: 'Data Analyst',
        experience: '3 Years',
        technologies: ['Python', 'SQL', 'Tableau'],
        status: 'Currently Employed',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        description: 'Analytical professional skilled in data visualization and statistical analysis.',
        linkedin: '#',
        github: '#',
      },
      {
        id: 3,
        name: 'Charlie Brown',
        role: 'UI/UX Designer',
        experience: '4 Years',
        technologies: ['Figma', 'Sketch', 'Adobe XD', 'HTML', 'CSS'],
        status: 'Open to Work',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        description: 'Creative designer focused on user-centered design and intuitive interfaces.',
        linkedin: '#',
        github: '#',
      },
      {
        id: 4,
        name: 'Diana Prince',
        role: 'Product Manager',
        experience: '7 Years',
        technologies: ['Agile', 'Scrum', 'Jira'],
        status: 'Looking for new opportunities',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        description: 'Results-driven product leader with a proven track record of launching successful products.',
        linkedin: '#',
        github: '#',
      },
      {
        id: 5,
        name: 'Eve Adams',
        role: 'Software Engineer',
        experience: '2 Years',
        technologies: ['Python', 'Django', 'SQL'],
        status: 'Open to Work',
        avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
        description: 'Passionate backend engineer with expertise in database design and API development.',
        linkedin: '#',
        github: '#',
      },
    ],
  };

  const filteredCandidates = talentData.candidates.filter((candidate) => {
    const matchesRole = filterRole === 'all' || candidate.role.toLowerCase().replace(/\s/g, '-') === filterRole;
    const matchesTech = filterTech === 'all' || candidate.technologies.some(tech => tech.toLowerCase() === filterTech);
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesRole && matchesTech && matchesSearch;
  });

  return (
    <section className="content-section card" id="talentPoolSection">
      <div className="card__body">
        <div className="talent-pool-header">
          <h1>Talent Pool</h1>
          <p>Discover top talent and connect with professionals. Showcase your profile and find job opportunities.</p>
        </div>

        <div className="talent-filters">
          <div className="filter-group">
            <label htmlFor="role-filter">Filter by Role:</label>
            <select
              id="role-filter"
              className="form-control"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              {talentData.roles.map((role) => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="tech-filter">Filter by Technology:</label>
            <select
              id="tech-filter"
              className="form-control"
              value={filterTech}
              onChange={(e) => setFilterTech(e.target.value)}
            >
              {talentData.technologies.map((tech) => (
                <option key={tech.id} value={tech.id}>{tech.name}</option>
              ))}
            </select>
          </div>

          <div className="search-group">
            <label htmlFor="talent-search">Search Candidates:</label>
            <div className="search-input-wrapper">
              <input
                type="text"
                id="talent-search"
                className="form-control"
                placeholder="Search by name, role, or tech..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search"></i>
            </div>
          </div>
        </div>

        <div className="talent-grid">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate) => (
              <div className="talent-card" key={candidate.id}>
                <div className="card__body">
                  <div className="talent-card-header">
                    <img src={candidate.avatar} alt={candidate.name} className="talent-avatar" />
                    <div className="talent-info">
                      <h3>{candidate.name}</h3>
                      <p className="talent-role">{candidate.role}</p>
                    </div>
                  </div>
                  <p className="talent-description">{candidate.description}</p>
                  <div className="talent-meta">
                    <span className="experience-badge"><i className="fas fa-briefcase"></i> {candidate.experience}</span>
                    <span className={`status-badge ${candidate.status.toLowerCase().replace(/\s/g, '-')}`}>{candidate.status}</span>
                  </div>
                  <div className="talent-technologies">
                    {candidate.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="talent-links">
                    <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn--sm btn--secondary">
                      <i className="fab fa-linkedin"></i> LinkedIn
                    </a>
                    <a href={candidate.github} target="_blank" rel="noopener noreferrer" className="btn btn--sm btn--secondary">
                      <i className="fab fa-github"></i> GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-talent-found">
              <i className="fas fa-frown"></i>
              <h3>No Talent Found</h3>
              <p>Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TalentPoolSection; 