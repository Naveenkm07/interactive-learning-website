import React, { useState, useRef } from 'react';

const ResumeOptimizerSection = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [outreachEmail, setOutreachEmail] = useState('');
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);
  const [downloadingTemplate, setDownloadingTemplate] = useState(false);
  const fileInputRef = useRef(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const templates = [
    {
      name: 'Modern Professional',
      category: 'Professional',
      color: '#0984e3',
      description: 'Clean and modern design perfect for corporate roles',
      features: ['ATS-friendly', 'Professional layout', 'Easy customization'],
      preview: {
        header: { height: '20%', color: '#0984e3' },
        sections: [
          { type: 'summary', height: '15%', color: '#f8f9fa' },
          { type: 'experience', height: '25%', color: '#ffffff' },
          { type: 'skills', height: '15%', color: '#f8f9fa' },
          { type: 'education', height: '15%', color: '#ffffff' }
        ]
      }
    },
    {
      name: 'Creative Designer',
      category: 'Creative',
      color: '#6c5ce7',
      description: 'Bold and creative design for design and creative roles',
      features: ['Creative layout', 'Color accents', 'Visual hierarchy'],
      preview: {
        header: { height: '25%', color: '#6c5ce7' },
        sections: [
          { type: 'summary', height: '12%', color: '#f0f0ff' },
          { type: 'experience', height: '28%', color: '#ffffff' },
          { type: 'skills', height: '12%', color: '#f0f0ff' },
          { type: 'education', height: '13%', color: '#ffffff' }
        ]
      }
    },
    {
      name: 'Minimal Clean',
      category: 'Minimal',
      color: '#00b894',
      description: 'Minimalist design focusing on content and readability',
      features: ['Minimal design', 'High readability', 'Clean typography'],
      preview: {
        header: { height: '15%', color: '#00b894' },
        sections: [
          { type: 'summary', height: '18%', color: '#f8f9fa' },
          { type: 'experience', height: '30%', color: '#ffffff' },
          { type: 'skills', height: '18%', color: '#f8f9fa' },
          { type: 'education', height: '19%', color: '#ffffff' }
        ]
      }
    },
    {
      name: 'Executive',
      category: 'Executive',
      color: '#e17055',
      description: 'Sophisticated design for senior and executive positions',
      features: ['Executive style', 'Professional fonts', 'Strategic layout'],
      preview: {
        header: { height: '22%', color: '#e17055' },
        sections: [
          { type: 'summary', height: '13%', color: '#f8f9fa' },
          { type: 'experience', height: '32%', color: '#ffffff' },
          { type: 'skills', height: '13%', color: '#f8f9fa' },
          { type: 'education', height: '20%', color: '#ffffff' }
        ]
      }
    }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setActiveTab('analysis');
      setIsAnalyzing(true);
      
      // Simulate AI analysis
      setTimeout(() => {
        const results = {
          overallScore: Math.floor(Math.random() * 30) + 70, // 70-100
          sections: {
            summary: {
              score: Math.floor(Math.random() * 20) + 80,
              feedback: "Your summary effectively highlights key achievements but could be more specific with metrics."
            },
            experience: {
              score: Math.floor(Math.random() * 20) + 75,
              feedback: "Good experience descriptions, but consider adding more quantifiable results."
            },
            skills: {
              score: Math.floor(Math.random() * 20) + 85,
              feedback: "Strong technical skills section with good keyword optimization."
            },
            education: {
              score: Math.floor(Math.random() * 20) + 90,
              feedback: "Education section is well-formatted and complete."
            }
          },
          suggestions: [
            "Add more quantifiable achievements (e.g., 'Increased efficiency by 25%')",
            "Include relevant keywords for ATS optimization",
            "Consider adding a skills matrix or proficiency levels",
            "Update contact information and ensure consistency"
          ],
          keywords: ["React", "Node.js", "Python", "AWS", "Docker", "MongoDB", "REST API", "Git"]
        };
        setAnalysisResults(results);
        setIsAnalyzing(false);
      }, 3000);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('word'))) {
      setUploadedFile(file);
      setActiveTab('analysis');
      setIsAnalyzing(true);
      
      // Simulate AI analysis
      setTimeout(() => {
        const results = {
          overallScore: Math.floor(Math.random() * 30) + 70,
          sections: {
            summary: {
              score: Math.floor(Math.random() * 20) + 80,
              feedback: "Your summary effectively highlights key achievements but could be more specific with metrics."
            },
            experience: {
              score: Math.floor(Math.random() * 20) + 75,
              feedback: "Good experience descriptions, but consider adding more quantifiable results."
            },
            skills: {
              score: Math.floor(Math.random() * 20) + 85,
              feedback: "Strong technical skills section with good keyword optimization."
            },
            education: {
              score: Math.floor(Math.random() * 20) + 90,
              feedback: "Education section is well-formatted and complete."
            }
          },
          suggestions: [
            "Add more quantifiable achievements (e.g., 'Increased efficiency by 25%')",
            "Include relevant keywords for ATS optimization",
            "Consider adding a skills matrix or proficiency levels",
            "Update contact information and ensure consistency"
          ],
          keywords: ["React", "Node.js", "Python", "AWS", "Docker", "MongoDB", "REST API", "Git"]
        };
        setAnalysisResults(results);
        setIsAnalyzing(false);
      }, 3000);
    }
  };

  const generateOutreachEmail = () => {
    const templates = [
      `Subject: Experienced [Your Role] Excited About [Company] Opportunity

Dear [Hiring Manager's Name],

I hope this email finds you well. I came across the [Position] role at [Company] and was immediately drawn to your innovative approach to [specific aspect of their work].

With [X] years of experience in [relevant skills], I've successfully [specific achievement]. I'm particularly excited about [Company]'s work in [specific project/technology] and believe my background in [relevant experience] would be valuable to your team.

I've attached my resume and would love the opportunity to discuss how I can contribute to [Company]'s continued success.

Best regards,
[Your Name]`,

      `Subject: [Your Name] - [Your Role] Application for [Position]

Hi [Hiring Manager's Name],

I'm reaching out regarding the [Position] opportunity at [Company]. Your company's commitment to [specific value/mission] really resonates with me, and I'd love to be part of your team.

My experience includes [key achievement] and [another achievement], which I believe aligns well with what you're looking for. I'm particularly interested in [specific aspect of the role].

Would you be available for a brief conversation about this opportunity?

Thank you for your time,
[Your Name]`,

      `Subject: [Your Name] - [Your Role] | [Company] Application

Dear [Hiring Manager's Name],

I hope you're having a great day! I'm writing to express my interest in the [Position] role at [Company]. After researching your company and the role, I'm excited about the opportunity to contribute to your team.

My background in [relevant skills] has prepared me well for this position. I've [specific achievement] and [another achievement], which I believe would be valuable to [Company].

I'd appreciate the chance to discuss how my skills and enthusiasm can benefit your organization.

Best regards,
[Your Name]`
    ];
    
    setOutreachEmail(templates[Math.floor(Math.random() * templates.length)]);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return '#00b894';
    if (score >= 80) return '#fdcb6e';
    if (score >= 70) return '#e17055';
    return '#d63031';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    return 'Needs Improvement';
  };

  const downloadTemplate = (templateName) => {
    setDownloadingTemplate(true);
    
    // Simulate download process
    setTimeout(() => {
      // Create a dummy file download
      const content = `Resume Template: ${templateName}\n\nThis is a sample template file.\nIn a real application, this would contain the actual template.\n\nFeatures:\n- Professional design\n- ATS-friendly format\n- Easy customization\n\nDownloaded on: ${new Date().toLocaleDateString()}`;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${templateName.replace(/\s+/g, '_')}_Template.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setDownloadingTemplate(false);
      alert(`Template "${templateName}" downloaded successfully!`);
    }, 2000);
  };

  const previewTemplate = (template) => {
    setSelectedTemplate(template.name);
    setShowTemplatePreview(true);
  };

  const handleAIResumeAnalysis = async () => {
    setAiLoading(true);
    setAiAnalysis("");
    const analysis = await getGeminiResumeAnalysis(resumeText, jobDesc);
    setAiAnalysis(analysis);
    setAiLoading(false);
  };

  return (
    <section className="content-section card" id="resumeOptimizerSection">
      <div className="card__body">
        <div className="resume-optimizer-header">
          <h1>Resume Optimizer</h1>
          <p>AI-powered resume analysis and optimization to help you stand out to employers</p>
        </div>

        <div className="resume-tabs">
          <button
            className={`tab-button ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            <i className="fas fa-upload"></i>
            Upload Resume
          </button>
          <button
            className={`tab-button ${activeTab === 'analysis' ? 'active' : ''}`}
            onClick={() => setActiveTab('analysis')}
            disabled={!analysisResults}
          >
            <i className="fas fa-chart-line"></i>
            Analysis Results
          </button>
          <button
            className={`tab-button ${activeTab === 'templates' ? 'active' : ''}`}
            onClick={() => setActiveTab('templates')}
          >
            <i className="fas fa-file-alt"></i>
            Templates
          </button>
          <button
            className={`tab-button ${activeTab === 'outreach' ? 'active' : ''}`}
            onClick={() => setActiveTab('outreach')}
          >
            <i className="fas fa-envelope"></i>
            Outreach Emails
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'upload' && (
            <div className="upload-section">
              <div
                className="upload-area"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <i className="fas fa-cloud-upload-alt"></i>
                <h3>Upload Your Resume</h3>
                <p>Drag and drop your resume here or click to browse</p>
                <span className="file-types">Supports PDF, DOC, DOCX</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </div>
              
              {uploadedFile && (
                <div className="file-info">
                  <i className="fas fa-file-alt"></i>
                  <span>{uploadedFile.name}</span>
                  <span className="file-size">({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="analysis-section">
              {isAnalyzing ? (
                <div className="analyzing">
                  <div className="loading-spinner"></div>
                  <h3>Analyzing your resume...</h3>
                  <p>Our AI is reviewing your resume for optimization opportunities</p>
                </div>
              ) : analysisResults ? (
                <div className="analysis-results">
                  <div className="overall-score">
                    <div className="score-circle" style={{ borderColor: getScoreColor(analysisResults.overallScore) }}>
                      <span className="score-number">{analysisResults.overallScore}</span>
                      <span className="score-label">{getScoreLabel(analysisResults.overallScore)}</span>
                    </div>
                    <div className="score-details">
                      <h3>Overall Score</h3>
                      <p>Your resume is performing well! Here are some areas for improvement.</p>
                    </div>
                  </div>

                  <div className="section-scores">
                    <h3>Section Analysis</h3>
                    <div className="scores-grid">
                      {Object.entries(analysisResults.sections).map(([section, data]) => (
                        <div key={section} className="section-score">
                          <div className="section-header">
                            <h4>{section.charAt(0).toUpperCase() + section.slice(1)}</h4>
                            <span className="section-score-number" style={{ color: getScoreColor(data.score) }}>
                              {data.score}
                            </span>
                          </div>
                          <p>{data.feedback}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="suggestions">
                    <h3>Key Suggestions</h3>
                    <ul>
                      {analysisResults.suggestions.map((suggestion, index) => (
                        <li key={index}>
                          <i className="fas fa-lightbulb"></i>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="keywords">
                    <h3>Recommended Keywords</h3>
                    <div className="keyword-tags">
                      {analysisResults.keywords.map((keyword, index) => (
                        <span key={index} className="keyword-tag">{keyword}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-analysis">
                  <i className="fas fa-file-alt"></i>
                  <h3>Upload your resume first</h3>
                  <p>Please upload your resume to get started with the analysis</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="templates-section">
              <h3>Resume Templates</h3>
              <p>Choose from our professionally designed templates optimized for ATS systems</p>
              
              <div className="templates-grid">
                {templates.map((template, index) => (
                  <div
                    key={index}
                    className={`template-card ${selectedTemplate === template.name ? 'selected' : ''}`}
                  >
                    <div className="template-preview" style={{ backgroundColor: template.color }}>
                      <div className="template-layout">
                        <div 
                          className="template-header" 
                          style={{ 
                            height: template.preview.header.height,
                            backgroundColor: template.preview.header.color 
                          }}
                        >
                          <div className="header-content">
                            <div className="name-line"></div>
                            <div className="title-line short"></div>
                          </div>
                        </div>
                        {template.preview.sections.map((section, idx) => (
                          <div
                            key={idx}
                            className="template-section"
                            style={{
                              height: section.height,
                              backgroundColor: section.color
                            }}
                          >
                            <div className="section-content">
                              <div className="section-title"></div>
                              <div className="section-text short"></div>
                              <div className="section-text"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="template-info">
                      <h4>{template.name}</h4>
                      <span className="template-category">{template.category}</span>
                      <p className="template-description">{template.description}</p>
                      <div className="template-features">
                        {template.features.map((feature, idx) => (
                          <span key={idx} className="feature-tag">{feature}</span>
                        ))}
                      </div>
                    </div>
                    <div className="template-actions">
                      <button 
                        className="btn btn--primary btn--small"
                        onClick={() => downloadTemplate(template.name)}
                        disabled={downloadingTemplate}
                      >
                        {downloadingTemplate ? (
                          <>
                            <i className="fas fa-spinner fa-spin"></i>
                            Downloading...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-download"></i>
                            Download
                          </>
                        )}
                      </button>
                      <button 
                        className="btn btn--secondary btn--small"
                        onClick={() => previewTemplate(template)}
                      >
                        <i className="fas fa-eye"></i>
                        Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {showTemplatePreview && selectedTemplate && (
                <div className="template-preview-modal">
                  <div className="preview-content">
                    <div className="preview-header">
                      <h3>Template Preview: {selectedTemplate}</h3>
                      <button
                        className="close-preview"
                        onClick={() => setShowTemplatePreview(false)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <div className="preview-body">
                      <div className="preview-resume">
                        <div className="resume-header">
                          <h1>John Doe</h1>
                          <p>Senior Software Engineer</p>
                          <div className="contact-info">
                            <span>john.doe@email.com</span>
                            <span>+1 (555) 123-4567</span>
                            <span>linkedin.com/in/johndoe</span>
                          </div>
                        </div>
                        <div className="resume-section">
                          <h2>Professional Summary</h2>
                          <p>Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading development teams.</p>
                        </div>
                        <div className="resume-section">
                          <h2>Experience</h2>
                          <div className="experience-item">
                            <h3>Senior Software Engineer</h3>
                            <p className="company">Tech Company Inc. | 2021 - Present</p>
                            <ul>
                              <li>Led development of microservices architecture serving 1M+ users</li>
                              <li>Improved application performance by 40% through optimization</li>
                              <li>Mentored 3 junior developers and conducted code reviews</li>
                            </ul>
                          </div>
                        </div>
                        <div className="resume-section">
                          <h2>Skills</h2>
                          <div className="skills-grid">
                            <span className="skill-tag">React</span>
                            <span className="skill-tag">Node.js</span>
                            <span className="skill-tag">Python</span>
                            <span className="skill-tag">AWS</span>
                            <span className="skill-tag">Docker</span>
                            <span className="skill-tag">MongoDB</span>
                          </div>
                        </div>
                        <div className="resume-section">
                          <h2>Education</h2>
                          <h3>Bachelor of Science in Computer Science</h3>
                          <p>University of Technology | 2016 - 2020</p>
                        </div>
                      </div>
                    </div>
                    <div className="preview-footer">
                      <button 
                        className="btn btn--primary"
                        onClick={() => downloadTemplate(selectedTemplate)}
                        disabled={downloadingTemplate}
                      >
                        {downloadingTemplate ? (
                          <>
                            <i className="fas fa-spinner fa-spin"></i>
                            Downloading...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-download"></i>
                            Download Template
                          </>
                        )}
                      </button>
                      <button 
                        className="btn btn--secondary"
                        onClick={() => setShowTemplatePreview(false)}
                      >
                        Close Preview
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'outreach' && (
            <div className="outreach-section">
              <h3>Outreach Email Templates</h3>
              <p>Generate personalized outreach emails for your job applications</p>
              
              <div className="outreach-actions">
                <button className="btn btn--primary" onClick={generateOutreachEmail}>
                  <i className="fas fa-magic"></i>
                  Generate Email Template
                </button>
              </div>

              {outreachEmail && (
                <div className="email-template">
                  <div className="email-header">
                    <h4>Generated Email Template</h4>
                    <button
                      className="btn btn--small"
                      onClick={() => navigator.clipboard.writeText(outreachEmail)}
                    >
                      <i className="fas fa-copy"></i>
                      Copy
                    </button>
                  </div>
                  <div className="email-content">
                    <pre>{outreachEmail}</pre>
                  </div>
                </div>
              )}

              <div className="outreach-tips">
                <h4>Tips for Effective Outreach</h4>
                <ul>
                  <li>Personalize each email with specific company details</li>
                  <li>Keep it concise and focused on value you can provide</li>
                  <li>Include a clear call-to-action</li>
                  <li>Follow up within 3-5 days if no response</li>
                </ul>
              </div>
            </div>
          )}

          <div style={{ margin: '32px 0', padding: 24, background: '#f8f9fa', borderRadius: 10, border: '1px solid #e0e0e0' }}>
            <h2>AI Resume Analyzer</h2>
            <label style={{ fontWeight: 600 }}>Paste your resume text:</label>
            <textarea
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
              rows={8}
              style={{ width: '100%', marginBottom: 12, borderRadius: 6, border: '1px solid #ccc', padding: 8 }}
              placeholder="Paste your resume here..."
            />
            <label style={{ fontWeight: 600 }}>Paste job description (optional):</label>
            <textarea
              value={jobDesc}
              onChange={e => setJobDesc(e.target.value)}
              rows={4}
              style={{ width: '100%', marginBottom: 12, borderRadius: 6, border: '1px solid #ccc', padding: 8 }}
              placeholder="Paste the job description here (optional)..."
            />
            <button
              onClick={handleAIResumeAnalysis}
              disabled={aiLoading || !resumeText.trim()}
              style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 600, fontSize: 16 }}
            >{aiLoading ? 'Analyzing...' : 'Analyze with AI'}</button>
            {aiLoading && <div style={{ marginTop: 16, color: '#888', fontStyle: 'italic' }}>AI is analyzing your resume...</div>}
            {aiAnalysis && (
              <div style={{ marginTop: 24, background: '#fff', borderRadius: 8, padding: 16, border: '1px solid #e0e0e0' }}>
                <h3 style={{ marginTop: 0 }}>AI Resume Analysis</h3>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{aiAnalysis}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeOptimizerSection;

async function getGeminiResumeAnalysis(resume, jobDesc) {
  const apiKey = "AIzaSyAQ6F1gqBVM7n8Yai6bVGFnTsPadIHXKjQ";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  let prompt = `Analyze the following resume. Score it, suggest improvements, and generate bullet points for the following job description if provided.\n\nResume:\n${resume}`;
  if (jobDesc && jobDesc.trim()) {
    prompt += `\n\nJob Description:\n${jobDesc}`;
  }
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
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No analysis from Gemini.";
  } catch (error) {
    return "Error contacting Gemini API: " + error.message;
  }
} 