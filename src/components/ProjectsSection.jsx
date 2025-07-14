import React, { useState } from 'react';

const ProjectsSection = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const projectData = {
    categories: [
      { id: 'all', name: 'All Categories' },
      { id: 'web-development', name: 'Web Development' },
      { id: 'mobile-development', name: 'Mobile Development' },
      { id: 'machine-learning', name: 'Machine Learning' },
      { id: 'data-science', name: 'Data Science' },
      { id: 'cloud-devops', name: 'Cloud & DevOps' },
    ],
    projects: [
      {
        id: 1,
        title: 'E-commerce Platform Backend',
        category: 'web-development',
        difficulty: 'Hard',
        technologies: ['Node.js', 'Express', 'MongoDB', 'REST API'],
        description: 'Develop a robust backend for an e-commerce platform, handling user authentication, product management, order processing, and payment integration. Focus on scalability and security.',
        details: 'This project requires building a complete API with user authentication (JWT), product CRUD operations, shopping cart and order management, and integrating with a simulated payment gateway. Knowledge of Mongoose for MongoDB and Express middleware is essential.',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      },
      {
        id: 2,
        title: 'Personal Portfolio Website',
        category: 'web-development',
        difficulty: 'Easy',
        technologies: ['React', 'HTML', 'CSS', 'JavaScript'],
        description: 'Create a modern, responsive personal portfolio website to showcase your projects and skills. Implement smooth animations and a clean UI/UX.',
        details: 'Design and develop a single-page application using React. Include sections for About, Projects, Skills, and Contact. Pay attention to responsive design principles and accessibility. Deployment to a static hosting service is a plus.',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      },
      {
        id: 3,
        title: 'Image Recognition CNN',
        category: 'machine-learning',
        difficulty: 'Medium',
        technologies: ['Python', 'TensorFlow', 'Keras', 'Jupyter Notebook'],
        description: 'Build and train a Convolutional Neural Network (CNN) to classify images from a given dataset. Experiment with different architectures and optimization techniques.',
        details: 'Implement a CNN from scratch or use pre-trained models (transfer learning) with TensorFlow/Keras. Work with image datasets like CIFAR-10 or Fashion MNIST. Focus on data preprocessing, model training, evaluation metrics, and hyperparameter tuning.',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      },
      {
        id: 4,
        title: 'Mobile To-Do App',
        category: 'mobile-development',
        difficulty: 'Medium',
        technologies: ['React Native', 'Expo', 'Redux (optional)'],
        description: 'Develop a cross-platform mobile to-do list application with features like task creation, marking as complete, and push notifications.',
        details: 'Use React Native and Expo to build a native-feeling mobile app for both iOS and Android. Implement local storage for tasks. Consider adding Redux for state management for more complex features.',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      },
      {
        id: 5,
        title: 'Predictive Analytics Dashboard',
        category: 'data-science',
        difficulty: 'Hard',
        technologies: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Dash/Streamlit'],
        description: 'Create an interactive dashboard that visualizes data and provides predictive insights using machine learning models. Use real-world or simulated datasets.',
        details: 'Clean and preprocess a dataset. Build and train a regression or classification model. Develop a web-based dashboard using libraries like Dash or Streamlit to display predictions, model performance, and key data visualizations. Focus on data storytelling.',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      },
      {
        id: 6,
        title: 'Cloud Deployment Pipeline',
        category: 'cloud-devops',
        difficulty: 'Medium',
        technologies: ['AWS/Azure/GCP', 'Docker', 'Kubernetes', 'Jenkins/GitLab CI'],
        description: 'Set up an automated CI/CD pipeline for deploying a simple web application to a cloud platform. Focus on containerization and orchestration.',
        details: 'Choose a cloud provider (AWS, Azure, or GCP). Containerize a sample web application using Docker. Set up a CI/CD pipeline using Jenkins, GitLab CI, or similar, to build, test, and deploy the application to a Kubernetes cluster or a serverless environment.',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      },
    ],
  };

  const filteredProjects = projectData.projects.filter((project) => {
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleBackToList = () => {
    setSelectedProject(null);
  };

  return (
    <section className="content-section card" id="projectsSection">
      <div className="card__body">
        <div className="projects-header">
          <h1>Projects Overview</h1>
          <p>Explore a variety of real-world projects to apply and enhance your skills. Each project comes with a detailed description and suggested technologies.</p>
        </div>

        {!selectedProject ? (
          <div className="project-list-view">
            <div className="project-filters">
              <div className="filter-group">
                <label htmlFor="category-filter">Filter by Category:</label>
                <select
                  id="category-filter"
                  className="form-control"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  {projectData.categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div className="search-group">
                <label htmlFor="project-search">Search Projects:</label>
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    id="project-search"
                    className="form-control"
                    placeholder="Search by title, technology, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>

            <div className="project-grid">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <div className="project-card" key={project.id} onClick={() => handleProjectClick(project)}>
                    <div className="card__body">
                      <img src={project.image} alt={project.title} className="project-card-image" />
                      <div className="project-card-content">
                        <h3>{project.title}</h3>
                        <p className="project-category">Category: {projectData.categories.find(c => c.id === project.category)?.name}</p>
                        <div className="project-tags">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="tag">{tech}</span>
                          ))}
                        </div>
                        <p className="project-difficulty difficulty-badge {project.difficulty.toLowerCase()}">{project.difficulty}</p>
                        <button className="btn btn--sm btn--primary view-project-btn">
                          <i className="fas fa-external-link-alt"></i> View Project
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-projects-found">
                  <i className="fas fa-folder-open"></i>
                  <h3>No Projects Found</h3>
                  <p>Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="project-detail-view">
            <button className="btn btn--outline back-button" onClick={handleBackToList}>
              <i className="fas fa-arrow-left"></i> Back to Projects
            </button>
            <div className="detail-header">
              <img src={selectedProject.image} alt={selectedProject.title} className="project-detail-image" />
              <div className="project-detail-info">
                <h2>{selectedProject.title}</h2>
                <p className="project-detail-category">Category: {projectData.categories.find(c => c.id === selectedProject.category)?.name}</p>
                <p className="project-detail-difficulty difficulty-badge {selectedProject.difficulty.toLowerCase()}">{selectedProject.difficulty}</p>
              </div>
            </div>
            <div className="project-detail-content">
              <h3>Description</h3>
              <p>{selectedProject.description}</p>
              <h3>Key Details & Technologies</h3>
              <p>{selectedProject.details}</p>
              <div className="project-tags">
                {selectedProject.technologies.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
              <div className="project-actions">
                <button className="btn btn--primary btn--lg">
                  <i className="fas fa-play-circle"></i> Start Project
                </button>
                <button className="btn btn--secondary btn--lg">
                  <i className="fas fa-share-alt"></i> Share Project
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection; 