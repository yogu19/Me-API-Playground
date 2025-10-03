import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  User, 
  Code, 
  Briefcase, 
  Search, 
  Github, 
  Linkedin, 
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Filter,
  Heart,
  Activity
} from 'lucide-react';
import './App.css';

// Configure axios defaults
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://me-api-playground-scuu.onrender.com';
axios.defaults.baseURL = API_BASE_URL;

function App() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [skillFilter, setSkillFilter] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [profileRes, skillsRes, projectsRes] = await Promise.all([
        axios.get('/profile'),
        axios.get('/skills'),
        axios.get('/projects')
      ]);
      
      setProfile(profileRes.data);
      setSkills(skillsRes.data);
      setProjects(projectsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkillFilter = async (skill) => {
    try {
      const response = await axios.get(`/projects${skill ? `?skill=${encodeURIComponent(skill)}` : ''}`);
      setProjects(response.data);
      setSkillFilter(skill);
    } catch (error) {
      console.error('Error filtering projects:', error);
    }
  };

  const clearFilters = () => {
    setSkillFilter('');
    setSearchResults(null);
    fetchData();
  };

  if (loading) {
    return (
      <div className="loading">
        <Activity className="loading-icon" />
        <p>Loading your awesome profile...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>
            <Code className="logo" />
            Me-API Playground
          </h1>
        </div>
      </header>

      <nav className="nav">
        <div className="container">
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={20} />
              Profile
            </button>
            <button 
              className={`nav-tab ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              <Code size={20} />
              Skills
            </button>
            <button 
              className={`nav-tab ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <Briefcase size={20} />
              Projects
            </button>
            {searchResults && (
              <button 
                className={`nav-tab ${activeTab === 'search' ? 'active' : ''}`}
                onClick={() => setActiveTab('search')}
              >
                <Search size={20} />
                Search Results
              </button>
            )}
          </div>
          {(skillFilter || searchResults) && (
            <button className="clear-filters" onClick={clearFilters}>
              <Filter size={16} />
              Clear Filters
            </button>
          )}
        </div>
      </nav>

      <main className="main">
        <div className="container">
          {activeTab === 'profile' && profile && (
            <ProfileSection profile={profile} />
          )}
          
          {activeTab === 'skills' && (
            <SkillsSection skills={skills} onSkillClick={handleSkillFilter} />
          )}
          
          {activeTab === 'projects' && (
            <ProjectsSection 
              projects={projects} 
              skills={skills}
              onSkillFilter={handleSkillFilter}
              currentFilter={skillFilter}
            />
          )}
          
          {activeTab === 'search' && searchResults && (
            <SearchResults results={searchResults} />
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>Built with ❤️ using React, Node.js, Express, and MongoDB</p>
          <p>API Health: <HealthCheck /></p>
        </div>
      </footer>
    </div>
  );
}

const ProfileSection = ({ profile }) => (
  <div className="profile-section">
    <div className="profile-header">
      <div className="profile-avatar">
        <User size={64} />
      </div>
      <div className="profile-info">
        <h2>{profile.name}</h2>
        <p className="profile-bio">{profile.bio}</p>
        <div className="profile-contact">
          <div className="contact-item">
            <Mail size={16} />
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          {profile.phone && (
            <div className="contact-item">
              <Phone size={16} />
              <span>{profile.phone}</span>
            </div>
          )}
          {profile.location && (
            <div className="contact-item">
              <MapPin size={16} />
              <span>{profile.location}</span>
            </div>
          )}
        </div>
        <div className="profile-links">
          {profile.links.github && (
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
              <Github size={20} />
            </a>
          )}
          {profile.links.linkedin && (
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin size={20} />
            </a>
          )}
          {profile.links.portfolio && (
            <a href={profile.links.portfolio} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
    </div>

    <div className="profile-sections">
      {profile.education && profile.education.length > 0 && (
        <div className="profile-subsection">
          <h3>Education</h3>
          {profile.education.map((edu, index) => (
            <div key={index} className="education-item">
              <h4>{edu.degree}</h4>
              <p className="institution">{edu.institution}</p>
              <p className="year">
                <Calendar size={16} />
                {edu.year}
              </p>
              {edu.description && <p className="description">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {profile.experience && profile.experience.length > 0 && (
        <div className="profile-subsection">
          <h3>Experience</h3>
          {profile.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <h4>{exp.role}</h4>
              <p className="company">{exp.company}</p>
              <p className="duration">
                <Calendar size={16} />
                {exp.duration}
              </p>
              {exp.description && <p className="description">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const SkillsSection = ({ skills, onSkillClick }) => {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="skills-section">
      <h2>Skills & Technologies</h2>
      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <div key={category} className="skill-category">
          <h3>{category}</h3>
          <div className="skills-grid">
            {categorySkills.map((skill) => (
              <div 
                key={skill._id} 
                className={`skill-card ${skill.level.toLowerCase()}`}
                onClick={() => onSkillClick(skill.name)}
              >
                <h4>{skill.name}</h4>
                <span className="skill-level">{skill.level}</span>
                {skill.yearsOfExperience && (
                  <span className="skill-experience">
                    {skill.yearsOfExperience} years
                  </span>
                )}
                {skill.description && (
                  <p className="skill-description">{skill.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ProjectsSection = ({ projects, skills, onSkillFilter, currentFilter }) => (
  <div className="projects-section">
    <div className="projects-header">
      <h2>Projects</h2>
      {currentFilter && (
        <p className="filter-info">Filtered by: <strong>{currentFilter}</strong></p>
      )}
    </div>
    
    <div className="projects-grid">
      {projects.map((project) => (
        <div key={project._id} className={`project-card ${project.featured ? 'featured' : ''}`}>
          {project.featured && (
            <div className="featured-badge">
              <Heart size={16} />
              Featured
            </div>
          )}
          
          <div className="project-header">
            <h3>{project.name}</h3>
            <div className="project-status">
              <span className={`status ${project.status.toLowerCase().replace(' ', '-')}`}>
                {project.status}
              </span>
            </div>
          </div>
          
          <p className="project-description">{project.description}</p>
          
          <div className="project-tech">
            <h4>Technologies:</h4>
            <div className="tech-tags">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index} 
                  className="tech-tag"
                  onClick={() => onSkillFilter(tech)}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.skills && project.skills.length > 0 && (
            <div className="project-skills">
              <h4>Skills:</h4>
              <div className="skill-tags">
                {project.skills.map((skill) => (
                  <span 
                    key={skill._id} 
                    className={`skill-tag ${skill.level.toLowerCase()}`}
                    onClick={() => onSkillFilter(skill.name)}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="project-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github size={16} />
                Code
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} />
                Demo
              </a>
            )}
          </div>
          
          {project.startDate && (
            <div className="project-dates">
              <Calendar size={14} />
              <span>
                {new Date(project.startDate).toLocaleDateString()}
                {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString()}`}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const SearchResults = ({ results }) => (
  <div className="search-results">
    <h2>Search Results</h2>
    
    {results.profile && (
      <div className="search-section">
        <h3>Profile Match</h3>
        <div className="profile-match">
          <h4>{results.profile.name}</h4>
          <p>{results.profile.bio}</p>
        </div>
      </div>
    )}
    
    {results.skills && results.skills.length > 0 && (
      <div className="search-section">
        <h3>Skills ({results.skills.length})</h3>
        <div className="search-skills">
          {results.skills.map((skill) => (
            <div key={skill._id} className={`skill-match ${skill.level.toLowerCase()}`}>
              <h4>{skill.name}</h4>
              <span className="category">{skill.category}</span>
              <span className="level">{skill.level}</span>
            </div>
          ))}
        </div>
      </div>
    )}
    
    {results.projects && results.projects.length > 0 && (
      <div className="search-section">
        <h3>Projects ({results.projects.length})</h3>
        <div className="search-projects">
          {results.projects.map((project) => (
            <div key={project._id} className="project-match">
              <h4>{project.name}</h4>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
    
    {!results.profile && (!results.skills || results.skills.length === 0) && (!results.projects || results.projects.length === 0) && (
      <div className="no-results">
        <p>No results found. Try searching for different keywords.</p>
      </div>
    )}
  </div>
);

const HealthCheck = () => {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await axios.get('/health');
        setHealth(response.data);
      } catch (error) {
        setHealth({ status: 'error' });
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`health-status ${health?.status || 'loading'}`}>
      {health ? health.status : 'checking...'}
    </span>
  );
};

export default App;
