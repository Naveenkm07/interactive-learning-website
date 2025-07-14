import React, { useState, useEffect } from 'react';

const getInitialProgress = () => {
  try {
    return JSON.parse(localStorage.getItem('courseProgress')) || {};
  } catch {
    return {};
  }
};

const featuredTracks = [
  {
    id: 'fullstack',
    title: 'Full Stack Web Developer',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=400',
    rating: 4.7,
    ratingsCount: '44K',
    hours: 678,
    badge: 'Bestseller',
  },
  {
    id: 'digital-marketer',
    title: 'Digital Marketer',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&w=400',
    rating: 4.5,
    ratingsCount: '5.3K',
    hours: 288,
    badge: '',
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&w=400',
    rating: 4.6,
    ratingsCount: '27K',
    hours: 468,
    badge: '',
  },
];

const categoryChips = [
  { id: 'web-dev', name: 'Web Development', learners: '10M+' },
  { id: 'python', name: 'Python', learners: '4M+' },
  { id: 'ml', name: 'Machine Learning', learners: '2M+' },
  { id: 'ai', name: 'AI', learners: '1M+' },
  { id: 'data-science', name: 'Data Science', learners: '7M+' },
  { id: 'it-cert', name: 'IT Certifications', learners: '2M+' },
  { id: 'leadership', name: 'Leadership', learners: '1M+' },
  { id: 'comm', name: 'Communication', learners: '1M+' },
];

const sampleCourses = [
  // Web Development
  {
    id: 101,
    title: 'The Complete 2024 Web Development Bootcamp',
    image: 'https://img-c.udemycdn.com/course/480x270/1565838_e54e_16.jpg',
    instructor: 'Dr. Angela Yu',
    rating: 4.7,
    ratingsCount: 320000,
    price: 499,
    oldPrice: 3199,
    badge: 'Bestseller',
    premium: true,
    category: 'web-dev',
  },
  {
    id: 102,
    title: 'React - The Complete Guide 2024 (incl. React Router & Redux)',
    image: 'https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg',
    instructor: 'Maximilian Schwarzmüller',
    rating: 4.8,
    ratingsCount: 180000,
    price: 599,
    oldPrice: 3499,
    badge: 'Premium',
    premium: true,
    category: 'web-dev',
  },
  // Python
  {
    id: 201,
    title: 'Complete Python Developer in 2024: Zero to Mastery',
    image: 'https://img-c.udemycdn.com/course/480x270/2473048_c55b_4.jpg',
    instructor: 'Andrei Neagoie',
    rating: 4.8,
    ratingsCount: 120000,
    price: 699,
    oldPrice: 2999,
    badge: 'Bestseller',
    premium: true,
    category: 'python',
  },
  {
    id: 202,
    title: 'Automate the Boring Stuff with Python Programming',
    image: 'https://img-c.udemycdn.com/course/480x270/933100_8c52_8.jpg',
    instructor: 'Al Sweigart',
    rating: 4.7,
    ratingsCount: 90000,
    price: 399,
    oldPrice: 1999,
    badge: '',
    premium: false,
    category: 'python',
  },
  // Machine Learning
  {
    id: 301,
    title: 'Machine Learning A-Z™: AI, Python & R + ChatGPT Bonus [2024]',
    image: 'https://img-c.udemycdn.com/course/480x270/950390_270f_3.jpg',
    instructor: 'Kirill Eremenko, Hadelin de Ponteves',
    rating: 4.6,
    ratingsCount: 180000,
    price: 799,
    oldPrice: 3499,
    badge: 'Bestseller',
    premium: true,
    category: 'ml',
  },
  {
    id: 302,
    title: 'Deep Learning Specialization',
    image: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/6Qw6Qw6Qw6Qw6Qw6Qw6Qw6/6Qw6Qw6Qw6Qw6Qw6Qw6Qw6/DeepLearningAI_Logo.png',
    instructor: 'Andrew Ng, DeepLearning.AI',
    rating: 4.9,
    ratingsCount: 48000,
    price: 899,
    oldPrice: 3999,
    badge: 'Premium',
    premium: true,
    category: 'ml',
  },
  // AI
  {
    id: 401,
    title: 'AI For Everyone',
    image: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/6Qw6Qw6Qw6Qw6Qw6Qw6Qw6/6Qw6Qw6Qw6Qw6Qw6Qw6Qw6/DeepLearningAI_Logo.png',
    instructor: 'Andrew Ng',
    rating: 4.8,
    ratingsCount: 48000,
    price: 499,
    oldPrice: 2499,
    badge: '',
    premium: false,
    category: 'ai',
  },
  {
    id: 402,
    title: 'Artificial Intelligence A-Z™: Build an AI with LLM & ChatGPT',
    image: 'https://img-c.udemycdn.com/course/480x270/1219332_bdd7_4.jpg',
    instructor: 'Hadelin de Ponteves, Kirill Eremenko',
    rating: 4.7,
    ratingsCount: 65000,
    price: 799,
    oldPrice: 3499,
    badge: 'Bestseller',
    premium: true,
    category: 'ai',
  },
  // Data Science
  {
    id: 501,
    title: 'Data Science and Machine Learning Bootcamp with R',
    image: 'https://img-c.udemycdn.com/course/480x270/903744_8eb2_2.jpg',
    instructor: 'Jose Portilla',
    rating: 4.7,
    ratingsCount: 70000,
    price: 599,
    oldPrice: 2999,
    badge: '',
    premium: false,
    category: 'data-science',
  },
  {
    id: 502,
    title: 'The Data Science Course 2024: Complete Data Science Bootcamp',
    image: 'https://img-c.udemycdn.com/course/480x270/1754098_8bdf_6.jpg',
    instructor: '365 Careers',
    rating: 4.6,
    ratingsCount: 120000,
    price: 699,
    oldPrice: 2999,
    badge: 'Bestseller',
    premium: true,
    category: 'data-science',
  },
  // IT Certifications
  {
    id: 601,
    title: 'AWS Certified Solutions Architect – Associate 2024',
    image: 'https://img-c.udemycdn.com/course/480x270/2196488_8fc7_10.jpg',
    instructor: 'Stephane Maarek',
    rating: 4.7,
    ratingsCount: 180000,
    price: 899,
    oldPrice: 3999,
    badge: 'Bestseller',
    premium: true,
    category: 'it-cert',
  },
  {
    id: 602,
    title: 'CompTIA A+ Certification (220-1101 & 220-1102)',
    image: 'https://img-c.udemycdn.com/course/480x270/567828_67d0.jpg',
    instructor: 'Mike Meyers',
    rating: 4.6,
    ratingsCount: 120000,
    price: 799,
    oldPrice: 3499,
    badge: '',
    premium: false,
    category: 'it-cert',
  },
  // Leadership
  {
    id: 701,
    title: 'Leadership: Practical Leadership Skills',
    image: 'https://img-c.udemycdn.com/course/480x270/855012_9638_2.jpg',
    instructor: 'Chris Croft',
    rating: 4.5,
    ratingsCount: 65000,
    price: 499,
    oldPrice: 2499,
    badge: '',
    premium: false,
    category: 'leadership',
  },
  {
    id: 702,
    title: 'The Science of Leadership',
    image: 'https://img-c.udemycdn.com/course/480x270/1501104_967d_13.jpg',
    instructor: 'Gregory Caremans',
    rating: 4.6,
    ratingsCount: 32000,
    price: 599,
    oldPrice: 2999,
    badge: 'Premium',
    premium: true,
    category: 'leadership',
  },
  // Communication
  {
    id: 801,
    title: 'Communication Skills Mastery',
    image: 'https://img-c.udemycdn.com/course/480x270/637930_9a22_4.jpg',
    instructor: 'TJ Walker',
    rating: 4.6,
    ratingsCount: 90000,
    price: 399,
    oldPrice: 1999,
    badge: '',
    premium: false,
    category: 'comm',
  },
  {
    id: 802,
    title: 'Successful Negotiation: Master Your Negotiating Skills',
    image: 'https://img-c.udemycdn.com/course/480x270/637930_9a22_4.jpg',
    instructor: 'Chris Croft',
    rating: 4.7,
    ratingsCount: 65000,
    price: 499,
    oldPrice: 2499,
    badge: 'Premium',
    premium: true,
    category: 'comm',
  },
].map(course => ({ ...course, price: 0, oldPrice: 0 }));

const CoursesSection = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [progress, setProgress] = useState(getInitialProgress());
  const [activeCategory, setActiveCategory] = useState('data-science');

  const courseData = {
    categories: [
      { id: 'all', name: 'All Categories' },
      { id: 'ai-ml', name: 'AI & Machine Learning' },
      { id: 'web-development', name: 'Web Development' },
      { id: 'data-science', name: 'Data Science' },
      { id: 'cloud-devops', name: 'Cloud & DevOps' },
      { id: 'mobile-dev', name: 'Mobile Development' },
    ],
    difficulties: [
      { id: 'all', name: 'All Difficulties' },
      { id: 'beginner', name: 'Beginner' },
      { id: 'intermediate', name: 'Intermediate' },
      { id: 'advanced', name: 'Advanced' },
    ],
    courses: [
      {
        id: 1,
        title: 'Generative AI Fundamentals',
        category: 'ai-ml',
        difficulty: 'beginner',
        duration: '4 weeks',
        lessons: 20,
        description: 'An introductory course to the exciting world of Generative AI, covering basic concepts, models like GANs and Transformers, and practical applications.',
        details: 'This course covers neural networks, autoencoders, GANs (Generative Adversarial Networks), and an introduction to large language models (LLMs) and transformer architectures. Includes hands-on labs with Python and TensorFlow/PyTorch.',
        image: 'https://via.placeholder.com/400x250/21808D/FFFFFF?text=Generative+AI',
        lessonList: Array.from({ length: 20 }, (_, i) => `Lesson ${i + 1}: Topic ${(i + 1)}`),
      },
      {
        id: 2,
        title: 'Advanced Python for Data Science',
        category: 'data-science',
        difficulty: 'intermediate',
        duration: '6 weeks',
        lessons: 30,
        description: 'Deep dive into Python\'s capabilities for data manipulation, analysis, and visualization. Master libraries like Pandas, NumPy, and Matplotlib.',
        details: 'Learn advanced data cleaning with Pandas, efficient numerical computing with NumPy, and powerful data visualization with Matplotlib and Seaborn. Covers statistical analysis, time series data, and an introduction to machine learning prep.',
        image: 'https://via.placeholder.com/400x250/32B8C6/FFFFFF?text=Python+DS',
        lessonList: Array.from({ length: 30 }, (_, i) => `Lesson ${i + 1}: Topic ${(i + 1)}`),
      },
      {
        id: 3,
        title: 'React.js for Frontend Development',
        category: 'web-development',
        difficulty: 'beginner',
        duration: '5 weeks',
        lessons: 25,
        description: 'Build modern, interactive user interfaces with React.js. Learn component-based architecture, state management, and API integration.',
        details: 'Covers React fundamentals, JSX, props, state, hooks (useState, useEffect, useContext), routing with React Router, and fetching data from RESTful APIs. Project-based learning to build a complete web application.',
        image: 'https://via.placeholder.com/400x250/1F2121/FFFFFF?text=ReactJS',
        lessonList: Array.from({ length: 25 }, (_, i) => `Lesson ${i + 1}: Topic ${(i + 1)}`),
      },
      {
        id: 4,
        title: 'Cloud Native DevOps with Kubernetes',
        category: 'cloud-devops',
        difficulty: 'advanced',
        duration: '8 weeks',
        lessons: 40,
        description: 'Master container orchestration with Kubernetes, CI/CD pipelines, and cloud-native application deployment on AWS, Azure, or GCP.',
        details: 'This advanced course focuses on Docker, Kubernetes deployments, services, ingress, and persistent storage. Implement CI/CD with Jenkins/GitLab CI, monitor with Prometheus/Grafana, and explore serverless architectures. Hands-on labs with cloud platforms.',
        image: 'https://via.placeholder.com/400x250/626C71/FFFFFF?text=Kubernetes',
        lessonList: Array.from({ length: 40 }, (_, i) => `Lesson ${i + 1}: Topic ${(i + 1)}`),
      },
      {
        id: 5,
        title: 'Mobile App Development with Flutter',
        category: 'mobile-dev',
        difficulty: 'intermediate',
        duration: '7 weeks',
        lessons: 35,
        description: 'Develop beautiful, natively compiled applications for mobile, web, and desktop from a single codebase using Flutter and Dart.',
        details: 'Learn Dart programming, Flutter widgets, state management (Provider, Bloc), navigation, working with local databases, and consuming REST APIs. Build multiple real-world applications throughout the course.',
        image: 'https://via.placeholder.com/400x250/945240/FFFFFF?text=Flutter',
        lessonList: Array.from({ length: 35 }, (_, i) => `Lesson ${i + 1}: Topic ${(i + 1)}`),
      },
    ],
  };

  useEffect(() => {
    localStorage.setItem('courseProgress', JSON.stringify(progress));
  }, [progress]);

  const filteredCourses = courseData.courses.filter((course) => {
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    const matchesDifficulty = filterDifficulty === 'all' || course.difficulty === filterDifficulty;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleBackToList = () => {
    setSelectedCourse(null);
  };

  const handleEnroll = (courseId) => {
    setProgress(prev => ({
      ...prev,
      [courseId]: {
        enrolled: true,
        completedLessons: [],
      },
    }));
  };

  const handleCompleteLesson = (courseId, lessonIdx) => {
    setProgress(prev => {
      const courseProgress = prev[courseId] || { enrolled: true, completedLessons: [] };
      if (!courseProgress.completedLessons.includes(lessonIdx)) {
        return {
          ...prev,
          [courseId]: {
            ...courseProgress,
            completedLessons: [...courseProgress.completedLessons, lessonIdx],
          },
        };
      }
      return prev;
    });
  };

  const getCourseProgress = (courseId, totalLessons) => {
    const courseProgress = progress[courseId];
    if (!courseProgress) return 0;
    return Math.round((courseProgress.completedLessons.length / totalLessons) * 100);
  };

  return (
    <section className="content-section card udemy-courses-section" id="coursesSection">
      <div className="card__body">
        {/* Career Accelerator Hero Cards */}
        <div className="udemy-hero-row">
          <h2>Ready to reimagine your career?</h2>
          <p>Get the skills and real-world experience employers want with Career Accelerators.</p>
          <div className="udemy-hero-cards">
            {featuredTracks.map(track => (
              <div className="udemy-hero-card" key={track.id}>
                <img src={track.image} alt={track.title} />
                <div className="udemy-hero-card-content">
                  <h3>{track.title}</h3>
                  <div className="udemy-hero-meta">
                    <span className="udemy-hero-rating"><i className="fas fa-star"></i> {track.rating} <span className="udemy-hero-rating-count">({track.ratingsCount} ratings)</span></span>
                    <span className="udemy-hero-hours">{track.hours} total hours</span>
                  </div>
                  {track.badge && <span className="udemy-hero-badge">{track.badge}</span>}
                </div>
              </div>
            ))}
          </div>
          <button className="udemy-hero-all-btn">All Career Accelerators</button>
        </div>

        {/* Category Chips */}
        <div className="udemy-category-chips-row">
          {categoryChips.map(cat => (
            <button
              key={cat.id}
              className={`udemy-category-chip${activeCategory === cat.id ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name} <span className="udemy-chip-learners">{cat.learners} learners</span>
            </button>
          ))}
        </div>

        {/* Course Grid/Carousel */}
        <div className="udemy-course-grid">
          {sampleCourses.filter(c => c.category === activeCategory).map(course => (
            <div className="udemy-course-card" key={course.id}>
              <img src={course.image} alt={course.title} onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/260x120?text=Course+Image'; }} />
              <div className="udemy-course-card-content">
                <h4>{course.title}</h4>
                <div className="udemy-course-instructor">{course.instructor}</div>
                <div className="udemy-course-meta">
                  <span className="udemy-course-rating"><i className="fas fa-star"></i> {course.rating} <span className="udemy-course-rating-count">({course.ratingsCount})</span></span>
                </div>
                <span className="udemy-course-free">Free</span>
              </div>
            </div>
          ))}
        </div>
        <button className="udemy-showall-btn">Show all {categoryChips.find(c => c.id === activeCategory)?.name} courses</button>
      </div>
    </section>
  );
};

export default CoursesSection; 