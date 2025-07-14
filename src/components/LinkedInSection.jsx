import React, { useState, useEffect } from 'react';

const LinkedInSection = () => {
  // Initialize streak and last posted date from local storage or default
  const [currentStreak, setCurrentStreak] = useState(() => {
    const savedStreak = localStorage.getItem('linkedinStreak');
    return savedStreak ? parseInt(savedStreak, 10) : 0;
  });

  const [lastPostedDate, setLastPostedDate] = useState(() => {
    const savedDate = localStorage.getItem('lastPostedDate');
    return savedDate ? new Date(savedDate) : null;
  });

  const [calendarDays, setCalendarDays] = useState(() => {
    const savedCalendar = localStorage.getItem('linkedinCalendar');
    return savedCalendar ? JSON.parse(savedCalendar) : [];
  });

  // Function to generate calendar days for the current month
  const generateCalendarDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-indexed
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday...

    const newCalendar = [];
    // Add empty slots for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      newCalendar.push(null);
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      newCalendar.push(i);
    }
    setCalendarDays(newCalendar);
    localStorage.setItem('linkedinCalendar', JSON.stringify(newCalendar));
  };

  // Effect to generate calendar days on component mount
  useEffect(() => {
    if (calendarDays.length === 0) {
      generateCalendarDays();
    }
  }, []);

  // Effect to save streak and last posted date to local storage
  useEffect(() => {
    localStorage.setItem('linkedinStreak', currentStreak.toString());
    localStorage.setItem('lastPostedDate', lastPostedDate ? lastPostedDate.toISOString() : '');
  }, [currentStreak, lastPostedDate]);

  const isToday = (someDate) => {
    const today = new Date();
    return someDate && someDate.getDate() === today.getDate() &&
           someDate.getMonth() === today.getMonth() &&
           someDate.getFullYear() === today.getFullYear();
  };

  const isPostedDay = (day) => {
    if (!lastPostedDate) return false;
    const postedMonth = lastPostedDate.getMonth();
    const postedYear = lastPostedDate.getFullYear();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Only consider posted days within the currently displayed calendar month
    return (lastPostedDate.getDate() === day && postedMonth === currentMonth && postedYear === currentYear);
  };

  const handleCreatePost = () => {
    const today = new Date();
    if (!isToday(lastPostedDate)) {
      // Check if the last post was yesterday to continue streak
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      if (lastPostedDate && isToday(yesterday)) {
        setCurrentStreak(prevStreak => prevStreak + 1);
      } else {
        setCurrentStreak(1); // Start new streak
      }
      setLastPostedDate(today);
      // Re-render calendar to mark today as posted
      generateCalendarDays();
    } else {
      alert("You've already posted on LinkedIn today! Keep up the great work!");
    }
  };

  return (
    <section className="linkedin-section card">
      <div className="card__body">
        <div className="linkedin-header">
          <h3>LinkedIn Streak</h3>
          <p>Maintain your presence and grow your network.</p>
        </div>
        
        <div className="streak-counter">
          <span className="streak-number" id="linkedin-streak-counter">{currentStreak}</span>
          <span className="streak-label">days</span>
        </div>
        
        <div className="streak-calendar">
          <div className="calendar-header">
            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
          </div>
          <div className="calendar-days" id="calendarDays">
            {calendarDays.map((day, index) => (
              <div 
                key={index} 
                className={`calendar-day ${day === new Date().getDate() && day !== null && isToday(new Date()) ? 'today' : ''} ${isPostedDay(day) ? 'posted' : ''}`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
        
        <p>Start your streak by posting on LinkedIn today!</p>
        <button 
          className="btn btn--primary btn--sm"
          onClick={handleCreatePost}
          id="createPostBtn"
        >
          <i className="fas fa-plus"></i>
          Create Post
        </button>
      </div>
    </section>
  );
};

export default LinkedInSection; 