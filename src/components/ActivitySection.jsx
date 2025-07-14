import React, { useState, useEffect } from 'react';

const ActivitySection = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activityData, setActivityData] = useState({}); // Stores activity level for each day
  const [selectedDay, setSelectedDay] = useState(null);
  const [activityDetails, setActivityDetails] = useState([]);

  // Helper to generate activity level for a given day (simulate)
  const generateActivityLevel = (date) => {
    const dayOfMonth = date.getDate();
    if (dayOfMonth % 7 === 0) return 4; // High activity every 7th day
    if (dayOfMonth % 5 === 0) return 3; // Medium-high every 5th day
    if (dayOfMonth % 3 === 0) return 2; // Medium every 3rd day
    if (Math.random() > 0.6) return 1; // Low randomly
    return 0; // No activity
  };

  // Helper to generate mock activity details for a day
  const getMockActivityDetails = (date) => {
    const details = [];
    const numActivities = Math.floor(Math.random() * 4); // 0 to 3 activities
    const activityTypes = [
      'Completed a LeetPrompt Challenge',
      'Reviewed a Peer\'s Project',
      'Attended a Mentorship Session',
      'Updated Resume Optimizer Score',
      'Completed a Course Lesson',
      'Made a LinkedIn Post',
      'Explored Industry Reality Check',
      'Used AI Flow Builder',
    ];

    for (let i = 0; i < numActivities; i++) {
      const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      const time = `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`;
      details.push({ type, time });
    }
    return details;
  };

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const newActivityData = {};
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      newActivityData[date.toDateString()] = generateActivityLevel(date);
    }
    setActivityData(newActivityData);
  }, [currentDate]);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday...
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    // Add leading empty days for alignment
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i);
      const level = activityData[dayDate.toDateString()] || 0;
      const isSelected = selectedDay && selectedDay.toDateString() === dayDate.toDateString();

      days.push(
        <div
          key={`day-${i}`}
          className={`calendar-day level-${level} ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDayClick(dayDate)}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  const handleDayClick = (date) => {
    setSelectedDay(date);
    setActivityDetails(getMockActivityDetails(date));
  };

  const handleMonthChange = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
    setSelectedDay(null);
    setActivityDetails([]);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <section className="activity-section card" id="activitySection">
      <div className="card__body">
        <div className="activity-header">
          <h1>Activity Contributions</h1>
          <p>Track your daily progress and contributions across all features.</p>
        </div>

        <div className="activity-overview">
          <div className="activity-calendar-wrapper">
            <div className="calendar-nav">
              <button className="btn btn--sm btn--outline" onClick={() => handleMonthChange(-1)}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
              <button className="btn btn--sm btn--outline" onClick={() => handleMonthChange(1)}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
            <div className="calendar-weekdays">
              {dayNames.map(day => <span key={day}>{day}</span>)}
            </div>
            <div className="calendar-grid">
              {renderCalendarDays()}
            </div>
            <div className="chart-legend">
              <span>Less</span>
              <div className="legend-squares">
                <div className="legend-square level-0"></div>
                <div className="legend-square level-1"></div>
                <div className="legend-square level-2"></div>
                <div className="legend-square level-3"></div>
                <div className="legend-square level-4"></div>
              </div>
              <span>More</span>
            </div>
          </div>

          <div className="activity-details-panel">
            <h3>Activity Details for {selectedDay ? selectedDay.toLocaleDateString() : 'Selected Day'}</h3>
            {selectedDay ? (
              activityDetails.length > 0 ? (
                <ul className="activity-list">
                  {activityDetails.map((activity, index) => (
                    <li key={index} className="activity-item">
                      <i className="fas fa-check-circle activity-icon"></i>
                      <div className="activity-info">
                        <span className="activity-type">{activity.type}</span>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-activity-message">
                  <i className="fas fa-calendar-check"></i>
                  <p>No recorded activities for this day.</p>
                </div>
              )
            ) : (
              <div className="no-activity-message">
                <i className="fas fa-hand-pointer"></i>
                <p>Click on a calendar day to view its activities.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivitySection; 