import React, { useState, useEffect } from 'react';

const NHCESection = () => {
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/nhce-news')
      .then(res => res.json())
      .then(data => {
        setNews(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load news');
        setLoading(false);
      });
  }, []);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      setFeedbackList([...feedbackList, feedback]);
      setFeedback('');
    }
  };

  return (
    <section className="content-section card" id="nhceSection">
      <h1>NHCE Central Hub</h1>
      {/* Announcements & Events */}
      <div className="nhce-card">
        <h2>📢 Announcements & Events</h2>
        {loading && <div>Loading latest news...</div>}
        {error && <div style={{color: 'red'}}>{error}</div>}
        {!loading && !error && news.length > 0 && (
          <ul>
            {news.map((item, idx) => (
              <li key={idx}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
              </li>
            ))}
          </ul>
        )}
        <ul>
          <li>
            <a href="https://newhorizoncollegeofengineering.in/news/" target="_blank" rel="noopener noreferrer">
              More News & Announcements
            </a>
          </li>
          <li>
            <a href="https://newhorizoncollegeofengineering.in/events/" target="_blank" rel="noopener noreferrer">
              Upcoming Events & Workshops
            </a>
          </li>
          <li>
            <a href="https://newhorizoncollegeofengineering.in/calendar-of-events/" target="_blank" rel="noopener noreferrer">
              Academic Calendar
            </a>
          </li>
        </ul>
      </div>
      {/* Campus Resources */}
      <div className="nhce-card">
        <h2>🏫 Campus Resources</h2>
        <ul>
          <li><a href="https://newhorizoncollegeofengineering.in/library/" target="_blank" rel="noopener noreferrer">Library Portal</a></li>
          <li><a href="https://newhorizoncollegeofengineering.in/placements/" target="_blank" rel="noopener noreferrer">Placement Cell</a></li>
          <li><a href="https://newhorizoncollegeofengineering.in/student-service-centre/" target="_blank" rel="noopener noreferrer">Student Service Centre</a></li>
          <li><a href="https://newhorizoncollegeofengineering.in/faculty-directory/" target="_blank" rel="noopener noreferrer">Faculty Directory</a></li>
          <li><a href="https://newhorizoncollegeofengineering.in/e-resources/" target="_blank" rel="noopener noreferrer">E-Resources</a></li>
        </ul>
      </div>
      {/* Student Community */}
      <div className="nhce-card">
        <h2>👥 Student Community</h2>
        <ul>
          <li><a href="https://newhorizoncollegeofengineering.in/student-clubs/" target="_blank" rel="noopener noreferrer">Student Clubs & Activities</a></li>
          <li><a href="https://newhorizoncollegeofengineering.in/experience-with-a-twist/" target="_blank" rel="noopener noreferrer">Campus Life & Achievements</a></li>
          <li>Forum: Coming soon</li>
        </ul>
      </div>
      {/* Placement & Internship Opportunities */}
      <div className="nhce-card">
        <h2>💼 Placement & Internship Opportunities</h2>
        <ul>
          <li><a href="https://newhorizoncollegeofengineering.in/placements/" target="_blank" rel="noopener noreferrer">Placement Opportunities</a></li>
          <li><a href="https://newhorizoncollegeofengineering.in/careersnh/" target="_blank" rel="noopener noreferrer">Careers @ NHCE</a></li>
          <li>Placement Tips: <a href="https://newhorizoncollegeofengineering.in/placements/" target="_blank" rel="noopener noreferrer">See Placement Cell</a></li>
        </ul>
      </div>
      {/* NHCE News Feed */}
      <div className="nhce-card">
        <h2>📰 NHCE News Feed</h2>
        <ul>
          <li><a href="https://newhorizoncollegeofengineering.in/news/" target="_blank" rel="noopener noreferrer">Latest News</a></li>
          <li><a href="https://newhorizoncollegeofengineering.in/achievements/" target="_blank" rel="noopener noreferrer">Achievements</a></li>
        </ul>
      </div>
      {/* Alumni Network */}
      <div className="nhce-card">
        <h2>🎓 Alumni Network</h2>
        <ul>
          <li><a href="https://newhorizoncollegeofengineering.in/alumni-association/" target="_blank" rel="noopener noreferrer">Alumni Association</a></li>
          <li><a href="https://www.linkedin.com/school/new-horizon-college-of-engineering/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a></li>
        </ul>
      </div>
      {/* Feedback & Suggestions */}
      <div className="nhce-card">
        <h2>💬 Feedback & Suggestions</h2>
        <form onSubmit={handleFeedbackSubmit} style={{ marginBottom: '1em' }}>
          <input
            type="text"
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            placeholder="Your feedback..."
            style={{ width: '70%', marginRight: '8px' }}
          />
          <button type="submit">Submit</button>
        </form>
        <ul>
          {feedbackList.map((fb, idx) => (
            <li key={idx}>{fb}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default NHCESection; 