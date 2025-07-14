import React, { useState, useEffect } from 'react';

const HEADER_CARDS = [
  {
    title: "LeetCode's Interview Crash Course:",
    subtitle: 'System Design for Interviews and Beyond',
    cta: 'Start Learning',
    color: 'green',
  },
  {
    title: "LeetCode's Interview Crash Course:",
    subtitle: 'Data Structures and Algorithms',
    cta: 'Start Learning',
    color: 'blue',
  },
  {
    title: 'New & Trending Company Qs',
    subtitle: 'Latest Qs From Big Tech',
    cta: 'Claim Now',
    color: 'orange',
  },
  {
    title: 'Top Interview Questions',
    subtitle: '',
    cta: 'Get Started',
    color: 'sky',
  },
];

const TAGS = [
  { name: 'Array', count: 1934 },
  { name: 'String', count: 797 },
  { name: 'Hash Table', count: 707 },
  { name: 'Dynamic Programming', count: 597 },
  { name: 'Math', count: 588 },
  { name: 'Sorting', count: 457 },
  { name: 'Greedy', count: 419 },
  { name: 'Depth-First Search', count: 326 },
  { name: 'Binary Search', count: 300 },
  // ...
];

const TOPICS = [
  { name: 'Algorithms', icon: 'fa-code' },
  { name: 'Database', icon: 'fa-database' },
  { name: 'Shell', icon: 'fa-terminal' },
  { name: 'Concurrency', icon: 'fa-random' },
  { name: 'JavaScript', icon: 'fa-js' },
  { name: 'pandas', icon: 'fa-table' },
  // ...
];

const DIFFICULTY_LEVELS = ['All', 'Easy', 'Medium', 'Hard'];
const TABS = [
  { key: 'question', label: 'Question', icon: 'fa-question' },
  { key: 'hint', label: 'Hint', icon: 'fa-lightbulb' },
  { key: 'solution', label: 'Solution', icon: 'fa-check-circle' },
];

const InterviewQuestionsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState(null);
  const [activeTab, setActiveTab] = useState('question');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTag, setActiveTag] = useState('');
  const [activeTopic, setActiveTopic] = useState('All Topics');
  const [simRole, setSimRole] = useState('Software Engineer');
  const [simTopic, setSimTopic] = useState('Algorithms');
  const [simDifficulty, setSimDifficulty] = useState('Easy');
  const [simQuestion, setSimQuestion] = useState('');
  const [simAnswer, setSimAnswer] = useState('');
  const [simFeedback, setSimFeedback] = useState('');
  const [simLoading, setSimLoading] = useState(false);
  const [simStep, setSimStep] = useState('setup'); // setup, question, feedback

  const interviewData = {
    categories: [
      { id: 'all', name: 'All Questions', icon: 'th-list' },
      { id: 'behavioral', name: 'Behavioral', icon: 'user-friends' },
      { id: 'data-structures', name: 'Data Structures', icon: 'sitemap' },
      { id: 'algorithms', name: 'Algorithms', icon: 'code' },
      { id: 'system-design', name: 'System Design', icon: 'cloud' },
      { id: 'frontend', name: 'Frontend', icon: 'paint-brush' },
      { id: 'backend', name: 'Backend', icon: 'server' },
    ],
    questions: [
      {
        id: 1,
        category: 'behavioral',
        difficulty: 'Easy',
        title: "Tell me about yourself.",
        question: "This is often the first question in an interview. How do you summarize your professional journey and aspirations effectively?",
        hint: "Focus on your past, present, and future. Keep it concise and relevant to the job.",
        solution: "Start with your background and current role, then highlight key experiences relevant to the job, and finally, express your career goals and how they align with the position and company.",
        tags: ["Behavioral", "Introduction", "General"],
      },
      {
        id: 2,
        category: 'behavioral',
        difficulty: 'Medium',
        title: "Why do you want to work for us?",
        question: "What motivates you to join this specific company and team?",
        hint: "Research the company's mission, values, recent projects, and culture. Connect them to your aspirations.",
        solution: "Demonstrate your research about the company. Talk about specific projects, values, or culture aspects that appeal to you. Explain how your skills and career goals align with their mission.",
        tags: ["Behavioral", "Motivation", "Company Research"],
      },
      {
        id: 3,
        category: 'data-structures',
        difficulty: 'Medium',
        title: "Explain Hash Maps.",
        question: "What is a hash map, how does it work, and what are its time complexities for common operations?",
        hint: "Think about key-value pairs, hashing functions, and collision resolution.",
        solution: "A hash map (or hash table) stores key-value pairs. It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found. \n\nTime Complexities (Average Case):\n- Insertion: O(1)\n- Deletion: O(1)\n- Search: O(1)\n\nWorst Case (due to collisions): O(n)",
        tags: ["Data Structures", "Hash Map", "Theory"],
      },
      {
        id: 4,
        category: 'algorithms',
        difficulty: 'Hard',
        title: "Implement QuickSort.",
        question: "Write a function to implement the QuickSort algorithm. Analyze its time and space complexity.",
        hint: "Choose a pivot, partition the array, and recursively sort sub-arrays.",
        solution: `function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  const equal = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else if (arr[i] > pivot) {
      right.push(arr[i]);
    } else {
      equal.push(arr[i]);
    }
  }

  return [...quickSort(left), ...equal, ...quickSort(right)];
}

// Time Complexity: Average O(n log n), Worst O(n^2)
// Space Complexity: O(log n) (for recursion stack) on average, O(n) worst case`,
        tags: ["Algorithms", "Sorting", "Divide and Conquer"],
      },
      {
        id: 5,
        category: 'system-design',
        difficulty: 'Hard',
        title: "Design a URL Shortening Service.",
        question: "How would you design a service like Bitly or TinyURL? Consider scalability, availability, and reliability.",
        hint: "Think about core components: URL generation, storage, redirection, and handling collisions.",
        solution: "Key components include: 1. Hash Function (to generate short codes), 2. Database (to store mappings), 3. Redirect Service (for forwarding), 4. Custom URL Handling. Considerations: Collision resolution, custom URLs, analytics, high availability, scalability, API design. Use consistent hashing, sharding, and caching strategies.",
        tags: ["System Design", "Scalability", "Distributed Systems"],
      },
      {
        id: 6,
        category: 'frontend',
        difficulty: 'Medium',
        title: "Explain Virtual DOM.",
        question: "What is the Virtual DOM and how does React use it for performance optimization?",
        hint: "It's a lightweight copy of the actual DOM. Think about reconciliation.",
        solution: "The Virtual DOM is a lightweight, in-memory representation of the actual DOM. When state changes in a React component, React first updates its Virtual DOM. Then, it compares the current Virtual DOM with the previous one (a process called reconciliation) to identify only the minimal changes needed. Finally, it batches these changes and updates only the necessary parts of the real DOM, significantly improving performance by minimizing direct DOM manipulations, which are expensive.",
        tags: ["Frontend", "React", "Performance", "DOM"],
      },
      {
        id: 7,
        category: 'backend',
        difficulty: 'Medium',
        title: "REST vs. GraphQL",
        question: "Compare and contrast REST and GraphQL for API design.",
        hint: "Consider data fetching, endpoints, and client needs.",
        solution: "**REST (Representational State Transfer):** Resource-based, multiple endpoints (e.g., /users, /products), over-fetching/under-fetching data can be an issue. \n\n**GraphQL:** Query language for APIs, single endpoint, clients request only the data they need, reducing network payload. More complex server-side setup but offers flexibility to the client.",
        tags: ["Backend", "API", "REST", "GraphQL"],
      },
      {
        id: 8,
        category: 'behavioral',
        difficulty: 'Hard',
        title: "Describe a time you failed and how you handled it.",
        question: "Interviewers want to know how you deal with setbacks. Give an example of a failure and what you learned.",
        hint: "Be honest, focus on growth, and explain what you would do differently.",
        solution: "Describe the situation, your actions, the outcome, and what you learned. Emphasize how you improved or changed your approach afterward.",
        tags: ["Behavioral", "Failure", "Growth"],
      },
      {
        id: 9,
        category: 'data-structures',
        difficulty: 'Easy',
        title: "What is a Stack?",
        question: "Explain the stack data structure and its main operations.",
        hint: "Think LIFO (Last In, First Out).",
        solution: "A stack is a linear data structure that follows the LIFO principle. Main operations: push (add), pop (remove), and peek (view top element).",
        tags: ["Data Structures", "Stack", "LIFO"],
      },
      {
        id: 10,
        category: 'algorithms',
        difficulty: 'Easy',
        title: "What is Binary Search?",
        question: "Describe the binary search algorithm and its time complexity.",
        hint: "Requires a sorted array. Divide and conquer.",
        solution: "Binary search repeatedly divides a sorted array in half, comparing the target value to the middle element. Time complexity: O(log n).",
        tags: ["Algorithms", "Search", "Binary Search"],
      },
      {
        id: 11,
        category: 'system-design',
        difficulty: 'Medium',
        title: "Design a Rate Limiter.",
        question: "How would you design a rate limiter for an API?",
        hint: "Consider token bucket, leaky bucket, or fixed window algorithms.",
        solution: "A rate limiter restricts the number of requests a user can make in a given time. Common algorithms: token bucket, leaky bucket, fixed window. Store counters per user and reset after a time window.",
        tags: ["System Design", "API", "Rate Limiting"],
      },
      {
        id: 12,
        category: 'frontend',
        difficulty: 'Hard',
        title: "Explain Server-Side Rendering (SSR) in React.",
        question: "What is SSR and what are its benefits and drawbacks in React apps?",
        hint: "Think about SEO, initial load time, and complexity.",
        solution: "SSR renders React components on the server and sends HTML to the client. Benefits: better SEO, faster initial load. Drawbacks: more complex setup, potential for slower server response.",
        tags: ["Frontend", "React", "SSR"],
      },
      {
        id: 13,
        category: 'backend',
        difficulty: 'Hard',
        title: "Explain CAP Theorem.",
        question: "What is the CAP theorem in distributed systems?",
        hint: "Consistency, Availability, Partition Tolerance.",
        solution: "CAP theorem states that a distributed system can only guarantee two out of three: Consistency, Availability, Partition Tolerance. Systems must make trade-offs based on requirements.",
        tags: ["Backend", "Distributed Systems", "CAP Theorem"],
      },
      {
        id: 14,
        category: 'frontend',
        difficulty: 'Easy',
        title: "What is CSS Flexbox?",
        question: "Explain the purpose of Flexbox in CSS and a common use case.",
        hint: "Layout, alignment, and distribution of space.",
        solution: "Flexbox is a CSS layout model for arranging elements in a row or column, distributing space, and aligning items. Common use: responsive navigation bars.",
        tags: ["Frontend", "CSS", "Flexbox"],
      },
      {
        id: 15,
        category: 'backend',
        difficulty: 'Easy',
        title: "What is an API?",
        question: "Define API and give an example.",
        hint: "Application Programming Interface.",
        solution: "An API is a set of rules that allows different software entities to communicate. Example: REST API for accessing user data.",
        tags: ["Backend", "API", "Basics"],
      },
      {
        id: 16,
        category: 'system-design',
        difficulty: 'Easy',
        title: "What is Load Balancing?",
        question: "Explain load balancing and why it is important.",
        hint: "Distribute traffic, improve reliability.",
        solution: "Load balancing distributes incoming network traffic across multiple servers to ensure no single server becomes overwhelmed, improving reliability and performance.",
        tags: ["System Design", "Load Balancing", "Scalability"],
      },
      {
        id: 17,
        category: 'data-structures',
        difficulty: 'Hard',
        title: "Explain Red-Black Trees.",
        question: "What is a Red-Black Tree and what are its properties?",
        hint: "Self-balancing binary search tree.",
        solution: "A Red-Black Tree is a self-balancing binary search tree with properties: every node is red or black, root is black, red nodes can't have red children, every path from a node to descendant leaves has the same number of black nodes. Ensures O(log n) operations.",
        tags: ["Data Structures", "Red-Black Tree", "BST"],
      },
      {
        id: 18,
        category: 'algorithms',
        difficulty: 'Easy',
        title: 'Find the Maximum Element in an Array',
        question: 'Write a function to find the maximum element in an array of integers.',
        hint: 'Iterate through the array and keep track of the largest value.',
        solution: 'function findMax(arr) {\n  return Math.max(...arr);\n}',
        tags: ['Algorithms', 'Array', 'Max'],
      },
      {
        id: 19,
        category: 'algorithms',
        difficulty: 'Medium',
        title: 'Two Sum',
        question: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
        hint: 'Use a hash map to store visited numbers.',
        solution: 'function twoSum(nums, target) {\n  const map = {};\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map[complement] !== undefined) {\n      return [map[complement], i];\n    }\n    map[nums[i]] = i;\n  }\n}',
        tags: ['Algorithms', 'Array', 'Hash Map'],
      },
      {
        id: 20,
        category: 'data-structures',
        difficulty: 'Easy',
        title: 'Queue Implementation',
        question: 'Implement a queue using two stacks.',
        hint: 'Use two stacks to reverse the order of elements.',
        solution: 'class Queue {\n  constructor() {\n    this.inStack = [];\n    this.outStack = [];\n  }\n  enqueue(val) {\n    this.inStack.push(val);\n  }\n  dequeue() {\n    if (!this.outStack.length) {\n      while (this.inStack.length) {\n        this.outStack.push(this.inStack.pop());\n      }\n    }\n    return this.outStack.pop();\n  }\n}',
        tags: ['Data Structures', 'Queue', 'Stack'],
      },
      {
        id: 21,
        category: 'algorithms',
        difficulty: 'Medium',
        title: 'Longest Substring Without Repeating Characters',
        question: 'Given a string, find the length of the longest substring without repeating characters.',
        hint: 'Use a sliding window and a hash set to track characters.',
        solution: 'function lengthOfLongestSubstring(s) {\n  let set = new Set();\n  let max = 0, left = 0;\n  for (let right = 0; right < s.length; right++) {\n    while (set.has(s[right])) {\n      set.delete(s[left++]);\n    }\n    set.add(s[right]);\n    max = Math.max(max, right - left + 1);\n  }\n  return max;\n}',
        tags: ['Algorithms', 'String', 'Sliding Window'],
      },
      {
        id: 22,
        category: 'algorithms',
        difficulty: 'Hard',
        title: 'Median of Two Sorted Arrays',
        question: 'Given two sorted arrays, find the median of the two sorted arrays.',
        hint: 'Use binary search to partition the arrays.',
        solution: 'function findMedianSortedArrays(nums1, nums2) {\n  // Binary search approach\n}',
        tags: ['Algorithms', 'Array', 'Binary Search'],
      },
      {
        id: 23,
        category: 'data-structures',
        difficulty: 'Medium',
        title: 'Implement a Min Heap',
        question: 'Design and implement a min heap data structure.',
        hint: 'Use an array to represent the heap and implement bubble up/down.',
        solution: 'class MinHeap {\n  constructor() { this.heap = []; }\n  // Implement insert, extractMin, and heapify methods\n}',
        tags: ['Data Structures', 'Heap', 'Min Heap'],
      },
      {
        id: 24,
        category: 'system-design',
        difficulty: 'Medium',
        title: 'Design a Chat Application',
        question: 'How would you design a scalable chat application like WhatsApp?',
        hint: 'Consider message delivery, real-time updates, and storage.',
        solution: 'Use WebSockets for real-time, a message queue for delivery, and a database for storage.',
        tags: ['System Design', 'Chat', 'Scalability'],
      },
      {
        id: 25,
        category: 'frontend',
        difficulty: 'Medium',
        title: 'Debounce vs Throttle',
        question: 'Explain the difference between debounce and throttle in JavaScript.',
        hint: 'Both control function execution rate, but in different ways.',
        solution: 'Debounce delays execution until a pause; throttle limits execution to once per interval.',
        tags: ['Frontend', 'JavaScript', 'Performance'],
      },
      {
        id: 26,
        category: 'backend',
        difficulty: 'Medium',
        title: 'JWT Authentication',
        question: 'How does JWT authentication work in web applications?',
        hint: 'Tokens, stateless, signed payload.',
        solution: 'JWTs are signed tokens containing user info, sent with requests for stateless authentication.',
        tags: ['Backend', 'Authentication', 'JWT'],
      },
      {
        id: 27,
        category: 'behavioral',
        difficulty: 'Easy',
        title: 'Describe a Time You Worked in a Team',
        question: 'Share an experience where you collaborated with others to achieve a goal.',
        hint: 'Use the STAR method: Situation, Task, Action, Result.',
        solution: 'Describe the context, your role, actions, and the outcome.',
        tags: ['Behavioral', 'Teamwork'],
      },
      {
        id: 28,
        category: 'algorithms',
        difficulty: 'Easy',
        title: 'Reverse a String',
        question: 'Write a function to reverse a string.',
        hint: 'Use split, reverse, and join methods.',
        solution: 'function reverseString(s) {\n  return s.split(\'\').reverse().join(\'\');\n}',
        tags: ['Algorithms', 'String'],
      },
      {
        id: 29,
        category: 'algorithms',
        difficulty: 'Easy',
        title: 'Pair with the Given Sum',
        question: 'Given an array and a sum, find if there is a pair with the given sum.',
        hint: 'Use a hash set to check for complement.',
        solution: 'function hasPairWithSum(arr, sum) {\n  const set = new Set();\n  for (let num of arr) {\n    if (set.has(sum - num)) return true;\n    set.add(num);\n  }\n  return false;\n}',
        tags: ['Algorithms', 'Array', 'Hash Set'],
      },
      {
        id: 30,
        category: 'algorithms',
        difficulty: 'Medium',
        title: 'Best Time to Buy and Sell Stock',
        question: 'Given prices of a stock for n days, find the maximum profit you can achieve.',
        hint: 'Track the minimum price and max profit as you iterate.',
        solution: 'function maxProfit(prices) {\n  let min = Infinity, profit = 0;\n  for (let price of prices) {\n    min = Math.min(min, price);\n    profit = Math.max(profit, price - min);\n  }\n  return profit;\n}',
        tags: ['Algorithms', 'Array', 'Greedy'],
      },
      {
        id: 31,
        category: 'algorithms',
        difficulty: 'Medium',
        title: 'Find Duplicates',
        question: 'Find all duplicate numbers in an array.',
        hint: 'Use a hash map to count occurrences.',
        solution: 'function findDuplicates(nums) {\n  const map = {};\n  const res = [];\n  for (let n of nums) {\n    map[n] = (map[n] || 0) + 1;\n    if (map[n] === 2) res.push(n);\n  }\n  return res;\n}',
        tags: ['Algorithms', 'Array', 'Hash Map'],
      },
      {
        id: 32,
        category: 'algorithms',
        difficulty: 'Medium',
        title: 'Product of Array Except Self',
        question: 'Given an array, return an array where each element is the product of all other elements.',
        hint: 'Use prefix and suffix products.',
        solution: 'function productExceptSelf(nums) {\n  const n = nums.length;\n  const res = Array(n).fill(1);\n  let left = 1, right = 1;\n  for (let i = 0; i < n; i++) {\n    res[i] *= left;\n    left *= nums[i];\n  }\n  for (let i = n - 1; i >= 0; i--) {\n    res[i] *= right;\n    right *= nums[i];\n  }\n  return res;\n}',
        tags: ['Algorithms', 'Array', 'Prefix Suffix'],
      },
      {
        id: 33,
        category: 'algorithms',
        difficulty: 'Medium',
        title: 'Maximum Subarray',
        question: 'Find the contiguous subarray with the largest sum.',
        hint: 'Use Kadane\'s algorithm.',
        solution: 'function maxSubArray(nums) {\n  let max = nums[0], curr = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    curr = Math.max(nums[i], curr + nums[i]);\n    max = Math.max(max, curr);\n  }\n  return max;\n}',
        tags: ['Algorithms', 'Array', 'Kadane'],
      },
      {
        id: 34,
        category: 'algorithms',
        difficulty: 'Medium',
        title: 'Trapping Rain Water',
        question: 'Given n non-negative integers representing elevation, compute how much water it can trap.',
        hint: 'Use two pointers and track left/right max.',
        solution: 'function trap(height) {\n  let left = 0, right = height.length - 1, lmax = 0, rmax = 0, res = 0;\n  while (left < right) {\n    if (height[left] < height[right]) {\n      lmax = Math.max(lmax, height[left]);\n      res += lmax - height[left++];\n    } else {\n      rmax = Math.max(rmax, height[right]);\n      res += rmax - height[right--];\n    }\n  }\n  return res;\n}',
        tags: ['Algorithms', 'Array', 'Two Pointers'],
      },
      {
        id: 35,
        category: 'algorithms',
        difficulty: 'Medium',
        title: '3 Sum',
        question: 'Find all unique triplets in the array which gives the sum of zero.',
        hint: 'Sort the array and use two pointers.',
        solution: 'function threeSum(nums) {\n  nums.sort((a,b)=>a-b);\n  const res = [];\n  for (let i = 0; i < nums.length-2; i++) {\n    if (i > 0 && nums[i] === nums[i-1]) continue;\n    let l = i+1, r = nums.length-1;\n    while (l < r) {\n      const sum = nums[i]+nums[l]+nums[r];\n      if (sum === 0) {\n        res.push([nums[i], nums[l], nums[r]]);\n        while (nums[l] === nums[l+1]) l++;\n        while (nums[r] === nums[r-1]) r--;\n        l++; r--;\n      } else if (sum < 0) l++;\n      else r--;\n    }\n  }\n  return res;\n}',
        tags: ['Algorithms', 'Array', 'Two Pointers'],
      },
    ],
  };

  const filteredQuestions = interviewData.questions.filter((q) => {
    const matchesCategory = activeCategory === 'all' || q.category === activeCategory;
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
    const matchesTag = !activeTag || q.tags.includes(activeTag);
    const matchesTopic = activeTopic === 'All Topics' || q.tags.includes(activeTopic);
    return matchesCategory && matchesSearch && matchesDifficulty && matchesTag && matchesTopic;
  });

  const handleQuestionClick = (idx) => {
    setSelectedQuestionIdx(idx);
    setActiveTab('question');
  };

  const handleNext = () => {
    if (selectedQuestionIdx !== null && selectedQuestionIdx < filteredQuestions.length - 1) {
      setSelectedQuestionIdx(selectedQuestionIdx + 1);
      setActiveTab('question');
    }
  };
  const handlePrev = () => {
    if (selectedQuestionIdx !== null && selectedQuestionIdx > 0) {
      setSelectedQuestionIdx(selectedQuestionIdx - 1);
      setActiveTab('question');
    }
  };

  // For category counts
  const getCategoryCount = (catId) =>
    catId === 'all'
      ? interviewData.questions.length
      : interviewData.questions.filter(q => q.category === catId).length;

  // Responsive sidebar toggle
  const handleSidebarToggle = () => setSidebarOpen((open) => !open);

  const handleStartInterview = async () => {
    setSimLoading(true);
    setSimQuestion('');
    setSimAnswer('');
    setSimFeedback('');
    setSimStep('question');
    const q = await getGeminiInterviewQuestion(simRole, simTopic, simDifficulty);
    setSimQuestion(q);
    setSimLoading(false);
  };

  const handleEvaluateAnswer = async () => {
    setSimLoading(true);
    setSimFeedback('');
    const feedback = await getGeminiInterviewFeedback(simQuestion, simAnswer, simRole, simTopic, simDifficulty);
    setSimFeedback(feedback);
    setSimLoading(false);
    setSimStep('feedback');
  };

  const handleNextSimQuestion = async () => {
    setSimLoading(true);
    setSimQuestion('');
    setSimAnswer('');
    setSimFeedback('');
    setSimStep('question');
    const q = await getGeminiInterviewQuestion(simRole, simTopic, simDifficulty);
    setSimQuestion(q);
    setSimLoading(false);
  };

  return (
    <section className="content-section card interview-modern interview-leetcode-style" id="interviewQuestionsSection">
      <div className="card__body interview-modern__body">
        {/* Header Cards */}
        <div className="leetcode-header-cards">
          {HEADER_CARDS.map((card, idx) => (
            <div key={idx} className={`leetcode-header-card card-${card.color}`}>
              <div className="header-card-title">{card.title}</div>
              <div className="header-card-subtitle">{card.subtitle}</div>
              <button className="header-card-cta">{card.cta}</button>
            </div>
          ))}
        </div>
        {/* Tag Filters */}
        <div className="leetcode-tags-row">
          <div className="leetcode-tags-scroll">
            {TAGS.map(tag => (
              <button
                key={tag.name}
                className={`leetcode-tag${activeTag === tag.name ? ' selected' : ''}`}
                onClick={() => setActiveTag(tag.name === activeTag ? '' : tag.name)}
              >
                {tag.name} <span className="tag-count">{tag.count}</span>
              </button>
            ))}
            <button className="expand-tags">Expand <i className="fas fa-chevron-down"></i></button>
          </div>
        </div>
        {/* Topic Filters */}
        <div className="leetcode-topics-row">
          <button
            className={`leetcode-topic-pill${activeTopic === 'All Topics' ? ' selected' : ''}`}
            onClick={() => setActiveTopic('All Topics')}
          >
            <i className="fas fa-layer-group"></i> All Topics
          </button>
          {TOPICS.map(topic => (
                  <button
              key={topic.name}
              className={`leetcode-topic-pill${activeTopic === topic.name ? ' selected' : ''}`}
              onClick={() => setActiveTopic(topic.name)}
                  >
              <i className={`fas ${topic.icon}`}></i> {topic.name}
                  </button>
                ))}
              </div>
        {/* Search, Sort, and Filter Row */}
        <div className="leetcode-search-row">
          <div className="leetcode-search-box">
              <input
                type="text"
              placeholder="Search questions"
                value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search"></i>
            </div>
          <button className="leetcode-sort-btn" title="Sort">
            <i className="fas fa-sort-amount-down"></i>
          </button>
          <button className="leetcode-filter-btn" title="Filter">
            <i className="fas fa-filter"></i>
          </button>
        </div>
        {/* AI Interview Simulator Panel */}
        <div style={{ margin: '32px 0', padding: 24, background: '#f8f9fa', borderRadius: 10, border: '1px solid #e0e0e0' }}>
          <h2>AI Interview Simulator</h2>
          {simStep === 'setup' && (
            <>
              <label style={{ fontWeight: 600 }}>Role:</label>
              <input value={simRole} onChange={e => setSimRole(e.target.value)} style={{ marginBottom: 8, width: 240, borderRadius: 6, border: '1px solid #ccc', padding: 8 }} />
              <label style={{ fontWeight: 600, marginLeft: 16 }}>Topic:</label>
              <input value={simTopic} onChange={e => setSimTopic(e.target.value)} style={{ marginBottom: 8, width: 180, borderRadius: 6, border: '1px solid #ccc', padding: 8 }} />
              <label style={{ fontWeight: 600, marginLeft: 16 }}>Difficulty:</label>
              <select value={simDifficulty} onChange={e => setSimDifficulty(e.target.value)} style={{ marginBottom: 8, borderRadius: 6, border: '1px solid #ccc', padding: 8 }}>
                <option>Easy</option><option>Medium</option><option>Hard</option>
              </select>
              <br />
              <button onClick={handleStartInterview} disabled={simLoading} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 600, fontSize: 16, marginTop: 8 }}>
                {simLoading ? 'Loading...' : 'Start Interview'}
              </button>
            </>
          )}
          {simStep === 'question' && (
            <>
              <div style={{ marginBottom: 12, fontWeight: 600 }}>Question:</div>
              <div style={{ marginBottom: 16, background: '#fff', borderRadius: 8, padding: 12, border: '1px solid #e0e0e0' }}>{simQuestion || (simLoading ? 'Loading question...' : '')}</div>
              <label style={{ fontWeight: 600 }}>Your Answer:</label>
              <textarea
                value={simAnswer}
                onChange={e => setSimAnswer(e.target.value)}
                rows={4}
                style={{ width: '100%', marginBottom: 12, borderRadius: 6, border: '1px solid #ccc', padding: 8 }}
                placeholder="Type your answer here..."
                disabled={simLoading}
              />
              <button onClick={handleEvaluateAnswer} disabled={simLoading || !simAnswer.trim()} style={{ background: '#43a047', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 600, fontSize: 16 }}>
                {simLoading ? 'Evaluating...' : 'Submit Answer'}
              </button>
            </>
          )}
          {simStep === 'feedback' && (
            <>
              <div style={{ marginBottom: 12, fontWeight: 600 }}>Question:</div>
              <div style={{ marginBottom: 16, background: '#fff', borderRadius: 8, padding: 12, border: '1px solid #e0e0e0' }}>{simQuestion}</div>
              <div style={{ marginBottom: 12, fontWeight: 600 }}>Your Answer:</div>
              <div style={{ marginBottom: 16, background: '#fff', borderRadius: 8, padding: 12, border: '1px solid #e0e0e0' }}>{simAnswer}</div>
              <div style={{ marginBottom: 12, fontWeight: 600 }}>AI Feedback:</div>
              <div style={{ marginBottom: 16, background: '#e8f5e9', borderRadius: 8, padding: 12, border: '1px solid #a5d6a7' }}>{simFeedback || (simLoading ? 'Evaluating...' : '')}</div>
              <button onClick={handleNextSimQuestion} disabled={simLoading} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 600, fontSize: 16, marginRight: 8 }}>
                {simLoading ? 'Loading...' : 'Next Question'}
              </button>
              <button onClick={() => { setSimStep('setup'); setSimQuestion(''); setSimAnswer(''); setSimFeedback(''); }} disabled={simLoading} style={{ background: '#bdbdbd', color: '#222', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 600, fontSize: 16 }}>
                End Interview
              </button>
            </>
          )}
        </div>
        {/* Question List */}
        <div className="leetcode-question-list">
              {filteredQuestions.length > 0 ? (
                <ul>
              {filteredQuestions.map((question, idx) => (
                    <li
                      key={question.id}
                  className={`leetcode-question-row${selectedQuestionIdx === idx ? ' active' : ''}`}
                  onClick={() => setSelectedQuestionIdx(idx)}
                >
                  <div className="leetcode-question-title">
                    <span className="leetcode-question-id">{question.id}.</span> {question.title}
                  </div>
                  <div className="leetcode-question-tags">
                    {question.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="leetcode-tag-badge">{tag}</span>
                    ))}
                  </div>
                  <div className="leetcode-question-stats">
                    <span className="leetcode-question-solved">{Math.floor(Math.random()*100)}%</span>
                    <span className={`leetcode-difficulty-badge ${question.difficulty.toLowerCase()}`}>{question.difficulty}</span>
                  </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-questions">
                  <i className="fas fa-frown"></i>
                  <p>No questions found in this category or matching your search.</p>
                </div>
              )}
            </div>
        {/* Main Content: Show selected question details below the list */}
        {selectedQuestionIdx !== null && filteredQuestions[selectedQuestionIdx] && (
          <div className="leetcode-question-detail-card">
            <div className="leetcode-question-detail-header">
              <h2>{filteredQuestions[selectedQuestionIdx].title}</h2>
              <span className={`leetcode-difficulty-badge ${filteredQuestions[selectedQuestionIdx].difficulty.toLowerCase()}`}>{filteredQuestions[selectedQuestionIdx].difficulty}</span>
              <div className="leetcode-question-tags">
                {filteredQuestions[selectedQuestionIdx].tags.map(tag => (
                  <span key={tag} className="leetcode-tag-badge">{tag}</span>
                ))}
          </div>
                </div>
            <div className="leetcode-question-detail-tabs">
              {TABS.map(tab => (
                  <button 
                  key={tab.key}
                  className={`leetcode-tab-btn${activeTab === tab.key ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                  >
                  <i className={`fas ${tab.icon}`}></i> {tab.label}
                  </button>
              ))}
            </div>
            <div className="leetcode-question-detail-content">
              {activeTab === 'question' && (
                <div className="tab-content">
                  <p>{filteredQuestions[selectedQuestionIdx].question}</p>
                  </div>
                )}
              {activeTab === 'hint' && (
                <div className="tab-content hint">
                  <h3>Hint</h3>
                  <p>{filteredQuestions[selectedQuestionIdx].hint}</p>
                </div>
              )}
              {activeTab === 'solution' && (
                <div className="tab-content solution">
                  <h3>Solution</h3>
                  <pre>{filteredQuestions[selectedQuestionIdx].solution}</pre>
                </div>
              )}
              </div>
            <div className="leetcode-question-detail-actions">
              <button className="btn btn--secondary" onClick={() => setSelectedQuestionIdx(idx => idx > 0 ? idx - 1 : idx)} disabled={selectedQuestionIdx === 0}>
                <i className="fas fa-arrow-left"></i> Previous
              </button>
              <button className="btn btn--secondary" onClick={() => setSelectedQuestionIdx(idx => idx < filteredQuestions.length - 1 ? idx + 1 : idx)} disabled={selectedQuestionIdx === filteredQuestions.length - 1}>
                Next <i className="fas fa-arrow-right"></i>
              </button>
              <button className="btn btn--tertiary" onClick={() => navigator.clipboard.writeText(filteredQuestions[selectedQuestionIdx].question)}>
                <i className="fas fa-copy"></i> Copy Question
              </button>
              </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Gemini interview question and feedback functions
async function getGeminiInterviewQuestion(role, topic, difficulty) {
  const apiKey = "AIzaSyAQ6F1gqBVM7n8Yai6bVGFnTsPadIHXKjQ";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  const prompt = `You are an interviewer for a ${role} position. Ask a ${difficulty} interview question about ${topic}. Only provide the question.`;
  const body = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No question from Gemini.";
  } catch (error) {
    return "Error contacting Gemini API: " + error.message;
  }
}

async function getGeminiInterviewFeedback(question, answer, role, topic, difficulty) {
  const apiKey = "AIzaSyAQ6F1gqBVM7n8Yai6bVGFnTsPadIHXKjQ";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  const prompt = `You are an expert interviewer for a ${role} position. Here is the question: ${question}\nHere is the candidate's answer: ${answer}\nPlease provide detailed feedback, including strengths, weaknesses, and suggestions for improvement. Also rate the answer out of 10.`;
  const body = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No feedback from Gemini.";
  } catch (error) {
    return "Error contacting Gemini API: " + error.message;
  }
}

export default InterviewQuestionsSection; 