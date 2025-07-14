// Application data with enhanced interactivity
const appData = {
  "user": {
    "name": "Developer",
    "hidevs_score": 0,
    "current_level": "Beginner",
    "leetprompt_count": 0,
    "projects_count": 0,
    "linkedin_streak": 0
  },
  "learning_progress": {
    "current_level": 1,
    "max_level": 5,
    "progress_percentage": 20
  },
  "activity_contributions": {
    "months": ["Feb", "Mar", "Apr", "May", "Jun"],
    "data": [
      [0,0,0,0,0,0,0],
      [0,0,1,0,0,2,0],
      [0,1,1,0,1,0,0],
      [0,0,0,1,0,0,1],
      [0,0,0,0,0,0,0]
    ]
  },
  "linkedin_streak": {
    "current_streak": 0,
    "calendar_days": [24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13]
  },
  "leetprompt_stats": {
    "solved": 0,
    "attempted": 0,
    "accuracy": 0
  },
  "project_stats": {
    "completed": 0,
    "avg_score": 0,
    "applied": 0
  },
  "project_of_week": {
    "title": "Personalized MCQ Generator for Diagnostic Tests",
    "description": "Develop an AI-driven system that generates adaptive MCQs from educational content with performance-based difficulty adjustments",
    "difficulty": "Beginner",
    "time_estimate": "20 hours",
    "technologies": ["Transformers", "spaCy", "FastAPI"],
    "additional_tech_count": 2
  },
  "navigation_items": [
    {"name": "Dashboard", "icon": "home", "active": true, "sectionId": "dashboardSection"},
    {"name": "Personalized Roadmap", "icon": "map", "active": false, "sectionId": "learningPathSection"},
    {"name": "Projects", "icon": "folder", "active": false, "sectionId": "projectsSection"},
    {"name": "LeetPrompt", "icon": "code", "active": false, "sectionId": "leetpromptSection"},
    {"name": "Code Editor", "icon": "edit", "active": false, "sectionId": "codeEditorSection"},
    {"name": "AI Flow Builder", "icon": "sitemap", "active": false, "sectionId": "aiFlowBuilderSection"},
    {"name": "CodeQuest", "icon": "trophy", "active": false, "sectionId": "codeQuestSection"},
    {"name": "nhce", "icon": "university", "active": false, "sectionId": "nhceSection"},
    {"name": "AI Hub", "icon": "robot", "active": false, "sectionId": "aiHubSection"}
  ],
  "additional_nav_items": [
    {"name": "Courses", "icon": "book", "sectionId": "coursesSection"},
    {"name": "Mentorship", "icon": "users", "sectionId": "mentorshipSection"},
    {"name": "Talent Pool", "icon": "network-wired", "sectionId": "talentPoolSection"},
    {"name": "Interview Questions", "icon": "question-circle", "sectionId": "interviewQuestionsSection"},
    {"name": "Industry Reality Check", "icon": "industry", "sectionId": "industryRealityCheckSection"},
    {"name": "Resume Optimizer", "icon": "file-text", "sectionId": "resumeOptimizerSection"}
  ],
  "community_members": [
    {
      "name": "John Doe",
      "role": "UI/UX Designer",
      "score": 290,
      "status": "looking",
      "avatar": "JD"
    },
    {
      "name": "Priya Sharma",
      "role": "Frontend Developer",
      "score": 250,
      "status": "open",
      "avatar": "PS"
    },
    {
      "name": "Carlos Rivera",
      "role": "Data Scientist",
      "score": 130,
      "status": "employed",
      "avatar": "CR"
    },
    {
      "name": "Emily Chen",
      "role": "Product Manager",
      "score": 300,
      "status": "looking",
      "avatar": "EC"
    },
    {
      "name": "Fatima Al-Farsi",
      "role": "Backend Engineer",
      "score": 200,
      "status": "open",
      "avatar": "FA"
    },
    {
      "name": "Liam O'Connor",
      "role": "AI Researcher",
      "score": 300,
      "status": "employed",
      "avatar": "LO"
    },
    {
      "name": "Sofia Rossi",
      "role": "DevOps Specialist",
      "score": 190,
      "status": "looking",
      "avatar": "SR"
    },
    {
      "name": "Alex",
      "role": "Full Stack Developer",
      "score": 160,
      "status": "open",
      "avatar": "A"
    }
  ],
  "testimonials": [
    {
      "content": "HiDevs gave me the skills and confidence to excel in my career. The real-world projects and tailored feedback were exactly what I needed to land my dream tech job!",
      "author": "Tanmay Shetty",
      "role": "Data Scientist",
      "avatar": "TS"
    },
    {
      "content": "HiDevs transformed my tech journey with its structured roadmap and industry-relevant projects. The guidance I received helped me crack interviews effortlessly!",
      "author": "Rishabh Jeppu",
      "role": "Data Scientist",
      "avatar": "RJ"
    },
    {
      "content": "HiDev's unique learning platform help me gain real-world experience and ace my interviews. The entire process was seamless and highly effective in preparing me for the industry.",
      "author": "Kushal Jain",
      "role": "Data Scientist",
      "avatar": "KJ"
    },
    {
      "content": "The personalized learning approach at HiDevs made all the difference for me. Each project and feedback session helped me grow, and now I'm proud to be working in my dream role.",
      "author": "Gayathri",
      "role": "Data Scientist",
      "avatar": "G"
    },
    {
      "content": "Joining HiDevs was a turning point for me. Their focus on practical learning and resume-building truly set me apart, and I'm now working in a role I always aspired to.",
      "author": "Dhwani Nambiar",
      "role": "Data Scientist",
      "avatar": "DN"
    },
    {
      "content": "HiDevs was exactly what I needed to kickstart my tech career. The combinations of personalized roadmaps, real-world projects, and interview prep gave me the tools to succeed and secure my dream job!",
      "author": "Akshat Agarwal",
      "role": "Data Scientist",
      "avatar": "AA"
    }
  ]
};

export default appData; 