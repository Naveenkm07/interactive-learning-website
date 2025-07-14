import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ChatSidebar from './ChatSidebar';

const CodeEditorSection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(14);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [savedCode, setSavedCode] = useState({});
  const iframeRef = useRef(null);
  const [activeHtmlTab, setActiveHtmlTab] = useState('console'); // 'console' or 'preview'
  const [review, setReview] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [practiceProblem, setPracticeProblem] = useState("");
  const [practiceSolution, setPracticeSolution] = useState("");
  const [practiceLoading, setPracticeLoading] = useState(false);

  const languages = [
    { value: 'javascript', label: 'JavaScript', icon: 'fab fa-js-square' },
    { value: 'python', label: 'Python', icon: 'fab fa-python' },
    { value: 'java', label: 'Java', icon: 'fab fa-java' },
    { value: 'cpp', label: 'C++', icon: 'fas fa-code' },
    { value: 'c', label: 'C', icon: 'fas fa-code' },
    { value: 'html', label: 'HTML', icon: 'fab fa-html5' },
    { value: 'css', label: 'CSS', icon: 'fab fa-css3-alt' },
    { value: 'php', label: 'PHP', icon: 'fab fa-php' },
    { value: 'ruby', label: 'Ruby', icon: 'fas fa-gem' },
    { value: 'go', label: 'Go', icon: 'fas fa-code' },
    { value: 'rust', label: 'Rust', icon: 'fas fa-code' },
    { value: 'sql', label: 'SQL', icon: 'fas fa-database' }
  ];

  const defaultCodeSnippets = {
    javascript: `// JavaScript Example
console.log("Hello, World!");

// Function example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci of 10:", fibonacci(10));

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);
console.log("Doubled numbers:", doubled);`,
    
    python: `# Python Example
print("Hello, World!")

# Function example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(f"Fibonacci of 10: {fibonacci(10)}")

# List comprehension
numbers = [1, 2, 3, 4, 5]
doubled = [x * 2 for x in numbers]
print(f"Doubled numbers: {doubled}")`,
    
    java: `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Function example
        int result = fibonacci(10);
        System.out.println("Fibonacci of 10: " + result);
    }
    
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}`,
    
    cpp: `// C++ Example
#include <iostream>
#include <vector>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    cout << "Hello, World!" << endl;
    
    int result = fibonacci(10);
    cout << "Fibonacci of 10: " << result << endl;
    
    return 0;
}`,
    
    c: `// C Example
#include <stdio.h>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    printf("Hello, World!\\n");
    
    int result = fibonacci(10);
    printf("Fibonacci of 10: %d\\n", result);
    
    return 0;
}`,
    
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
        }
        button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello, World!</h1>
        <p>This is a simple HTML page.</p>
        <button onclick="showMessage()">Click me!</button>
        <div id="output"></div>
    </div>
    
    <script>
        function showMessage() {
            document.getElementById('output').innerHTML = 
                '<p style="color: green;">Button clicked! JavaScript is working!</p>';
        }
    </script>
</body>
</html>`,
    
    css: `/* CSS Example */
body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0;
    padding: 20px;
    min-height: 100vh;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    overflow: hidden;
}

.header {
    background: #2c3e50;
    color: white;
    padding: 20px;
    text-align: center;
}

.content {
    padding: 30px;
}

.button {
    display: inline-block;
    padding: 12px 24px;
    background: #3498db;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: all 0.3s ease;
}

.button:hover {
    background: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.card {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 20px;
    margin: 10px 0;
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}`,
    
    php: `<?php
// PHP Example
echo "Hello, World!\\n";

// Function example
function fibonacci($n) {
    if ($n <= 1) return $n;
    return fibonacci($n - 1) + fibonacci($n - 2);
}

$result = fibonacci(10);
echo "Fibonacci of 10: " . $result . "\\n";

// Array example
$numbers = [1, 2, 3, 4, 5];
$doubled = array_map(function($x) {
    return $x * 2;
}, $numbers);

echo "Doubled numbers: " . implode(", ", $doubled) . "\\n";

// Class example
class Calculator {
    public function add($a, $b) {
        return $a + $b;
    }
    
    public function multiply($a, $b) {
        return $a * $b;
    }
}

$calc = new Calculator();
echo "5 + 3 = " . $calc->add(5, 3) . "\\n";
echo "5 * 3 = " . $calc->multiply(5, 3) . "\\n";
?>`,
    
    ruby: `# Ruby Example
puts "Hello, World!"

# Function example
def fibonacci(n)
  return n if n <= 1
  fibonacci(n - 1) + fibonacci(n - 2)
end

result = fibonacci(10)
puts "Fibonacci of 10: #{result}"

# Array methods
numbers = [1, 2, 3, 4, 5]
doubled = numbers.map { |x| x * 2 }
puts "Doubled numbers: #{doubled}"

# Class example
class Calculator
  def add(a, b)
    a + b
  end
  
  def multiply(a, b)
    a * b
  end
end

calc = Calculator.new
puts "5 + 3 = #{calc.add(5, 3)}"
puts "5 * 3 = #{calc.multiply(5, 3)}"`,
    
    go: `package main

import "fmt"

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
    fmt.Println("Hello, World!")
    
    result := fibonacci(10)
    fmt.Printf("Fibonacci of 10: %d\\n", result)
    
    // Slice example
    numbers := []int{1, 2, 3, 4, 5}
    doubled := make([]int, len(numbers))
    for i, num := range numbers {
        doubled[i] = num * 2
    }
    fmt.Printf("Doubled numbers: %v\\n", doubled)
}`,
    
    rust: `// Rust Example
fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn main() {
    println!("Hello, World!");
    
    let result = fibonacci(10);
    println!("Fibonacci of 10: {}", result);
    
    // Vector example
    let numbers = vec![1, 2, 3, 4, 5];
    let doubled: Vec<i32> = numbers.iter().map(|x| x * 2).collect();
    println!("Doubled numbers: {:?}", doubled);
}`,
    
    sql: `-- SQL Example
-- Create a sample table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (name, email, age) VALUES
('John Doe', 'john@example.com', 30),
('Jane Smith', 'jane@example.com', 25),
('Bob Johnson', 'bob@example.com', 35),
('Alice Brown', 'alice@example.com', 28);

-- Select all users
SELECT * FROM users;

-- Select users older than 25
SELECT name, email, age 
FROM users 
WHERE age > 25 
ORDER BY age DESC;

-- Count users by age group
SELECT 
    CASE 
        WHEN age < 25 THEN 'Under 25'
        WHEN age BETWEEN 25 AND 30 THEN '25-30'
        ELSE 'Over 30'
    END as age_group,
    COUNT(*) as count
FROM users 
GROUP BY age_group;`
  };

  useEffect(() => {
    // Load saved code for current language
    const saved = savedCode[selectedLanguage] || defaultCodeSnippets[selectedLanguage] || '';
    setCode(saved);
  }, [selectedLanguage]);

  useEffect(() => {
    // Auto-save code
    if (autoSave && code) {
      setSavedCode(prev => ({
        ...prev,
        [selectedLanguage]: code
      }));
    }
  }, [code, autoSave, selectedLanguage]);

  useEffect(() => {
    if (selectedLanguage === 'html' && activeHtmlTab === 'preview' && iframeRef.current) {
      executeHTML();
    }
  }, [code, selectedLanguage, activeHtmlTab]);

  const executeCode = async () => {
    setIsRunning(true);
    setOutput('');
    if (selectedLanguage === 'javascript') {
      await executeJavaScript();
    } else if (selectedLanguage === 'html') {
      executeHTML();
    } else {
      await executeWithAPI();
    }
    setIsRunning(false);
  };

  const executeJavaScript = async () => {
    try {
      // Create a safe execution environment
      const originalConsole = console.log;
      let outputText = '';
      
      // Override console.log to capture output
      console.log = (...args) => {
        outputText += args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ') + '\n';
      };

      // Execute the code
      const result = eval(code);
      
      // Restore console.log
      console.log = originalConsole;
      
      // Add return value if any
      if (result !== undefined) {
        outputText += `Return value: ${result}\n`;
      }
      
      setOutput(outputText);
    } catch (error) {
      setOutput(`JavaScript Error: ${error.message}`);
    }
  };

  const executeHTML = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.document.open();
      iframeRef.current.contentWindow.document.write(code);
      iframeRef.current.contentWindow.document.close();
      setOutput('HTML rendered in preview tab.');
    }
  };

  // Gemini API simulation for Java output
  async function getGeminiJavaOutput(code) {
    const apiKey = "AIzaSyAQ6F1gqBVM7n8Yai6bVGFnTsPadIHXKjQ";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    const prompt = `What is the output of the following Java code?\n${code}`;

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
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No output from Gemini.";
    } catch (error) {
      return "Error contacting Gemini API: " + error.message;
    }
  }

  const executeWithAPI = async () => {
    if (selectedLanguage === 'java') {
      setOutput('Simulating output using Gemini AI...');
      const aiOutput = await getGeminiJavaOutput(code);
      setOutput(aiOutput);
    } else {
      setOutput(`Code execution for ${selectedLanguage} would be handled by a backend service.\n\nThis is a demonstration. In a real application, you would:\n1. Send code to a secure backend\n2. Execute in a sandboxed environment\n3. Return the results\n\nYour code:\n${code}`);
    }
  };

  const clearCode = () => {
    setCode('');
    setOutput('');
  };

  const clearOutput = () => {
    setOutput('');
    if (selectedLanguage === 'html' && iframeRef.current) {
      iframeRef.current.contentWindow.document.open();
      iframeRef.current.contentWindow.document.write('');
      iframeRef.current.contentWindow.document.close();
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  const downloadCode = () => {
    const extension = selectedLanguage === 'javascript' ? 'js' : 
                     selectedLanguage === 'python' ? 'py' :
                     selectedLanguage === 'java' ? 'java' :
                     selectedLanguage === 'cpp' ? 'cpp' :
                     selectedLanguage === 'c' ? 'c' :
                     selectedLanguage === 'html' ? 'html' :
                     selectedLanguage === 'css' ? 'css' :
                     selectedLanguage === 'php' ? 'php' :
                     selectedLanguage === 'ruby' ? 'rb' :
                     selectedLanguage === 'go' ? 'go' :
                     selectedLanguage === 'rust' ? 'rs' :
                     selectedLanguage === 'sql' ? 'sql' : 'txt';
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStyle = () => {
    return theme === 'dark' ? tomorrow : vs;
  };

  const handleCodeReview = async () => {
    setReviewLoading(true);
    setReview("");
    const aiReview = await getGeminiCodeReview(code, selectedLanguage);
    setReview(aiReview);
    setReviewLoading(false);
  };

  const handleGeneratePracticeProblem = async () => {
    const difficulty = prompt("Enter difficulty (easy, medium, hard):", "easy");
    if (!difficulty) return;
    const topic = prompt("Enter topic (or leave blank for any):", "");
    setPracticeLoading(true);
    setPracticeProblem("");
    setPracticeSolution("");
    const { problem, solution } = await getGeminiPracticeProblem(selectedLanguage, difficulty, topic);
    setPracticeProblem(problem);
    setPracticeSolution(solution);
    setPracticeLoading(false);
  };

  return (
    <div className="code-editor-section" style={{ display: 'flex', height: '100%' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="code-editor-header">
          <h2><i className="fas fa-code"></i> Code Editor</h2>
          <p>Write, edit, and execute code in multiple programming languages</p>
        </div>

        <div className="code-editor-container">
          {/* Language Selection and Controls */}
          <div className="editor-controls">
            <div className="language-selector">
              <label htmlFor="language-select">Language:</label>
              <select 
                id="language-select"
                value={selectedLanguage} 
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                {languages.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    <i className={lang.icon}></i> {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="editor-settings">
              <label>
                <input 
                  type="checkbox" 
                  checked={showLineNumbers} 
                  onChange={(e) => setShowLineNumbers(e.target.checked)}
                />
                Line Numbers
              </label>
              <label>
                <input 
                  type="checkbox" 
                  checked={autoSave} 
                  onChange={(e) => setAutoSave(e.target.checked)}
                />
                Auto Save
              </label>
              <select 
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="dark">Dark Theme</option>
                <option value="light">Light Theme</option>
              </select>
              <select 
                value={fontSize} 
                onChange={(e) => setFontSize(parseInt(e.target.value))}
              >
                <option value={12}>12px</option>
                <option value={14}>14px</option>
                <option value={16}>16px</option>
                <option value={18}>18px</option>
                <option value={20}>20px</option>
              </select>
            </div>
          </div>

          {/* Code Editor */}
          <div className="editor-main">
            <div className="code-editor">
              <div className="editor-toolbar">
                <button onClick={executeCode} disabled={isRunning}>
                  <i className="fas fa-play"></i> {isRunning ? 'Running...' : 'Run Code'}
                </button>
                <button onClick={clearCode}>
                  <i className="fas fa-trash"></i> Clear
                </button>
                <button onClick={copyCode}>
                  <i className="fas fa-copy"></i> Copy
                </button>
                <button onClick={downloadCode}>
                  <i className="fas fa-download"></i> Download
                </button>
                <button onClick={handleCodeReview} disabled={reviewLoading || !code.trim()} style={{ marginLeft: 8, background: '#43a047', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 600 }}>
                  {reviewLoading ? 'Reviewing...' : 'AI Code Review'}
                </button>
                <button onClick={handleGeneratePracticeProblem} disabled={practiceLoading} style={{ marginLeft: 8, background: '#ff9800', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 600 }}>
                  {practiceLoading ? 'Generating...' : 'Generate Practice Problem'}
                </button>
              </div>
              
              <div className="code-area">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={`Write your ${selectedLanguage} code here...`}
                  style={{ 
                    fontSize: `${fontSize}px`,
                    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
                  }}
                />
              </div>
            </div>

            {/* Output Panel */}
            <div className="output-panel">
              <div className="output-header">
                <h3>Output</h3>
                <div className="output-controls">
                  <button onClick={clearOutput}>
                    <i className="fas fa-trash"></i> Clear
                  </button>
                  <button onClick={copyOutput}>
                    <i className="fas fa-copy"></i> Copy
                  </button>
                </div>
              </div>
              
              <div className="output-content">
                {selectedLanguage === 'html' ? (
                  <div className="html-output">
                    <div className="output-tabs">
                      <button 
                        className={`tab-button ${activeHtmlTab === 'console' ? 'active' : ''}`}
                        onClick={() => setActiveHtmlTab('console')}
                      >
                        Console
                      </button>
                      <button 
                        className={`tab-button ${activeHtmlTab === 'preview' ? 'active' : ''}`}
                        onClick={() => setActiveHtmlTab('preview')}
                      >
                        Preview
                      </button>
                    </div>
                    <div className="output-text" style={{ display: activeHtmlTab === 'console' ? 'block' : 'none' }}>
                      <pre>{output || 'No output yet. Run your code to see results.'}</pre>
                    </div>
                    <div className="html-preview" style={{ display: activeHtmlTab === 'preview' ? 'block' : 'none' }}>
                      <iframe 
                        ref={iframeRef}
                        title="HTML Preview"
                        style={{ width: '100%', height: '300px', border: '1px solid #ddd' }}
                      />
                    </div>
                  </div>
                ) : (
                  <pre className="output-text">
                    {output || 'No output yet. Run your code to see results.'}
                  </pre>
                )}
              </div>
            </div>
          </div>

          {/* Syntax Highlighted Preview */}
          <div className="syntax-preview">
            <h3>Syntax Highlighted Preview</h3>
            <SyntaxHighlighter
              language={selectedLanguage}
              style={getStyle()}
              showLineNumbers={showLineNumbers}
              customStyle={{
                fontSize: `${fontSize}px`,
                margin: 0,
                borderRadius: '8px'
              }}
            >
              {code || `// Write your ${selectedLanguage} code here...`}
            </SyntaxHighlighter>
          </div>
        </div>

        {review && (
          <div style={{ marginTop: 24, background: '#f5f5f5', borderRadius: 8, padding: 16, border: '1px solid #e0e0e0' }}>
            <h3 style={{ marginTop: 0 }}>AI Code Review</h3>
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{review}</pre>
          </div>
        )}
        {reviewLoading && !review && (
          <div style={{ marginTop: 24, color: '#888', fontStyle: 'italic' }}>AI is reviewing your code...</div>
        )}
        {practiceProblem && (
          <div style={{ marginTop: 24, background: '#fffde7', borderRadius: 8, padding: 16, border: '1px solid #ffe082' }}>
            <h3 style={{ marginTop: 0 }}>AI Practice Problem</h3>
            <div style={{ fontWeight: 600 }}>{practiceProblem}</div>
            {practiceSolution && <>
              <h4 style={{ marginBottom: 4, marginTop: 16 }}>Solution</h4>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', background: '#f5f5f5', borderRadius: 6, padding: 8 }}>{practiceSolution}</pre>
            </>}
          </div>
        )}
        {practiceLoading && !practiceProblem && (
          <div style={{ marginTop: 24, color: '#888', fontStyle: 'italic' }}>AI is generating a practice problem...</div>
        )}
      </div>
      <ChatSidebar />
    </div>
  );
};

// Add AI code review function
async function getGeminiCodeReview(code, language) {
  const apiKey = "AIzaSyAQ6F1gqBVM7n8Yai6bVGFnTsPadIHXKjQ";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  const prompt = `Review the following ${language} code for bugs, style, and best practices. Suggest improvements and explain your reasoning.\n\nCode:\n${code}`;
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
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No review from Gemini.";
  } catch (error) {
    return "Error contacting Gemini API: " + error.message;
  }
}

// Add Gemini practice problem function
async function getGeminiPracticeProblem(language, difficulty, topic) {
  const apiKey = "AIzaSyAQ6F1gqBVM7n8Yai6bVGFnTsPadIHXKjQ";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  let prompt = `Generate a ${difficulty} ${language} coding problem`;
  if (topic) prompt += ` about ${topic}`;
  prompt += `. Also provide the solution. Format the response as:\nProblem: <problem>\nSolution: <solution>`;
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
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No problem from Gemini.";
    // Parse problem and solution
    const problemMatch = text.match(/Problem:(.*?)(Solution:|$)/s);
    const solutionMatch = text.match(/Solution:(.*)/s);
    return {
      problem: problemMatch ? problemMatch[1].trim() : text,
      solution: solutionMatch ? solutionMatch[1].trim() : ''
    };
  } catch (error) {
    return { problem: "Error contacting Gemini API: " + error.message, solution: "" };
  }
}

export default CodeEditorSection; 