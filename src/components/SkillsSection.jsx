import React, { useState } from 'react';

const SkillsSection = () => {
  const [skills, setSkills] = useState([
    { id: 1, name: 'JavaScript', proficiency: 90, category: 'Frontend' },
    { id: 2, name: 'React', proficiency: 85, category: 'Frontend' },
    { id: 3, name: 'Node.js', proficiency: 80, category: 'Backend' },
    { id: 4, name: 'Python', proficiency: 75, category: 'Backend' },
    { id: 5, name: 'SQL', proficiency: 70, category: 'Database' },
    { id: 6, name: 'AWS', proficiency: 60, category: 'Cloud' },
  ]);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProficiency, setNewSkillProficiency] = useState(50);
  const [newSkillCategory, setNewSkillCategory] = useState('Other');

  const handleAddSkill = () => {
    if (newSkillName.trim() === '') return;
    const newSkill = {
      id: skills.length + 1,
      name: newSkillName.trim(),
      proficiency: parseInt(newSkillProficiency),
      category: newSkillCategory,
    };
    setSkills([...skills, newSkill]);
    setNewSkillName('');
    setNewSkillProficiency(50);
    setNewSkillCategory('Other');
  };

  const handleDeleteSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const getProficiencyColor = (proficiency) => {
    if (proficiency < 50) return '#dc3545'; // Red
    if (proficiency < 75) return '#ffc107'; // Yellow
    return '#28a745'; // Green
  };

  return (
    <section className="skills-section card">
      <div className="card__body">
        <div className="skills-header">
          <h3>Your Skills</h3>
          <p>Track your technical proficiency and identify areas for growth.</p>
        </div>

        <div className="skills-content-wrapper">
          <div className="current-skills">
            <h4>Current Skills ({skills.length})</h4>
            {skills.length > 0 ? (
              <ul className="skills-list">
                {skills.map(skill => (
                  <li key={skill.id} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-category tag">{skill.category}</span>
                    </div>
                    <div className="skill-proficiency">
                      <div className="proficiency-bar">
                        <div 
                          className="proficiency-fill"
                          style={{
                            width: `${skill.proficiency}%`,
                            backgroundColor: getProficiencyColor(skill.proficiency)
                          }}
                        ></div>
                      </div>
                      <span className="proficiency-percentage">{skill.proficiency}%</span>
                    </div>
                    <button 
                      className="btn btn--sm btn--outline delete-skill-btn"
                      onClick={() => handleDeleteSkill(skill.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-skills">
                <i className="fas fa-wrench"></i>
                <p>No skills added yet. Start by adding your first skill!</p>
              </div>
            )}
          </div>

          <div className="add-skill-form">
            <h4>Add New Skill</h4>
            <div className="form-group">
              <label htmlFor="skillName">Skill Name</label>
              <input 
                type="text" 
                id="skillName" 
                className="form-control"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="e.g., Data Structures, Cloud Computing"
              />
            </div>
            <div className="form-group">
              <label htmlFor="skillProficiency">Proficiency (1-100)</label>
              <input 
                type="range" 
                id="skillProficiency" 
                min="0" 
                max="100" 
                className="form-control-range"
                value={newSkillProficiency}
                onChange={(e) => setNewSkillProficiency(e.target.value)}
              />
              <span className="range-value">{newSkillProficiency}%</span>
            </div>
            <div className="form-group">
              <label htmlFor="skillCategory">Category</label>
              <select 
                id="skillCategory" 
                className="form-control"
                value={newSkillCategory}
                onChange={(e) => setNewSkillCategory(e.target.value)}
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="Cloud">Cloud</option>
                <option value="DevOps">DevOps</option>
                <option value="Mobile">Mobile</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button 
              className="btn btn--primary btn--full-width"
              onClick={handleAddSkill}
            >
              <i className="fas fa-plus-circle"></i> Add Skill
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 