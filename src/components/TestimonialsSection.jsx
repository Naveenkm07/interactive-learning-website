import React from 'react';
import appData from '../data.js';

const TestimonialsSection = () => {
  return (
    <section className="testimonials-section card" id="testimonialsSection">
      <div className="card__body">
        <h2>Real Feedback From Real Learners</h2>
        <p>See what our community has to say about their HiDevs experience</p>
        
        <div className="testimonials-grid" id="testimonialsGrid">
          {appData.testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <p className="testimonial-content">“{testimonial.content}”</p>
              <div className="testimonial-author">
                <span className="author-avatar">{testimonial.avatar}</span>
                <div>
                  <h4 className="author-name">{testimonial.author}</h4>
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 