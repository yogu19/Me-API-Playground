const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI , {
});
console.log("MONGODB_URI:", process.env.MONGODB_URI);


// Import models (same as in server.js)
const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  bio: { type: String },
  education: [{
    institution: String,
    degree: String,
    year: String,
    description: String
  }],
  experience: [{
    company: String,
    role: String,
    duration: String,
    description: String
  }],
  links: {
    github: String,
    linkedin: String,
    portfolio: String,
    resume: String,
    twitter: String
  },
  location: String,
  phone: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Intermediate' },
  description: String,
  yearsOfExperience: Number,
  createdAt: { type: Date, default: Date.now }
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  github: String,
  demo: String,
  image: String,
  status: { type: String, enum: ['In Progress', 'Completed', 'Maintenance'], default: 'Completed' },
  startDate: Date,
  endDate: Date,
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Profile = mongoose.model('Profile', profileSchema);
const Skill = mongoose.model('Skill', skillSchema);
const Project = mongoose.model('Project', projectSchema);

async function seedDatabase() {
  try {
    // Clear existing data
    await Profile.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});

    console.log('Cleared existing data');

    // Create profile
    const profile = await Profile.create({
      name: 'Bhishmesh Dhabhai',
      email: 'bhishmeshdhabhai19@gmail.com',
      bio: 'Full-stack developer passionate about creating innovative solutions and learning new technologies.',
      education: [
        {
          institution: 'Poddar international Collage',
          degree: 'Bachelor of Computer Science',
          year: '2023-2026',
          description: 'Focused on software engineering, algorithms, and web development'
        }
      ],
      experience: [
        {
          company: '.',
          role: '',
          duration: '',
          description: ''
        }
      ],
      links: {
        github: 'https://github.com/yogu19',
        linkedin: 'https://www.linkedin.com/in/bhishmesh-6aab712a6/',
        portfolio: 'https://yourportfolio.com',
        resume: 'https://yourresume',
        twitter: 'https://twitter.com'
      },
      location: 'jaipur, India',
      phone: '+91 7878208770'
    });

    console.log(profile);

    console.log('Created profile');

    // Create skills
    const skills = await Skill.insertMany([
      {
        name: 'JavaScript',
        category: 'Programming Languages',
        level: 'Advanced',
        description: 'Modern ES6+ JavaScript, async/await, functional programming',
        yearsOfExperience: 1
      },
      {
        name: 'React',
        category: 'Frontend Frameworks',
        level: 'Advanced',
        description: 'Hooks, Context API, React Router, state management',
        yearsOfExperience: 1
      },
      {
        name: 'Node.js',
        category: 'Backend Technologies',
        level: 'Intermediate',
        description: 'Express.js, RESTful APIs, middleware, authentication',
        yearsOfExperience: 1
      },
      {
        name: 'MongoDB',
        category: 'Databases',
        level: 'Intermediate',
        description: 'NoSQL database design, Mongoose ODM, aggregation',
        yearsOfExperience: 0.6
      },
      {
        name: 'C++',
        category: 'Programming Languages',
        level: 'Intermediate',
        description: '',
        yearsOfExperience: 1
      },
      {
        name: 'Git',
        category: 'Tools',
        level: 'Advanced',
        description: 'Version control, branching strategies, collaboration',
        yearsOfExperience: 3
      },
      {
        name: 'Docker',
        category: 'DevOps',
        level: 'Beginner',
        description: 'Containerization, basic orchestration',
        yearsOfExperience: 0
      },
      {
        name: 'HTML/CSS',
        category: 'Frontend Technologies',
        level: 'Advanced',
        description: 'Semantic HTML, responsive design, CSS Grid/Flexbox',
        yearsOfExperience: 4
      }
    ]);

    console.log('Created skills');
    console.log(skills);

    // Get skill IDs for projects
    const reactSkill = skills.find(s => s.name === 'React');
    const nodeSkill = skills.find(s => s.name === 'Node.js');
    const mongoSkill = skills.find(s => s.name === 'MongoDB');
    const pythonSkill = skills.find(s => s.name === 'Python');
    const jsSkill = skills.find(s => s.name === 'JavaScript');

    // Create projects
    await Project.insertMany([
      {
        name: 'Airbnb Clone',
        description: 'Full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment integration.',
        technologies: ['Node.js', 'Express', 'MongoDB', 'Stripe API'],
        skills: [reactSkill._id, nodeSkill._id, mongoSkill._id, jsSkill._id],
        github: 'https://github.com/yogu19/majorproject',
        demo: 'http://bhishmesh.onrender.com/listings',
        status: 'Completed',
        featured: true,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-03-15')
      },
      {
        name: 'Task Management App',
        description: 'React-based task management application with drag-and-drop functionality, due dates, and team collaboration features.',
        technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
        skills: [reactSkill._id, nodeSkill._id, jsSkill._id],
        github: 'https://github.com/yourusername/task-manager',
        demo: 'https://your-task-manager.netlify.app',
        status: 'Completed',
        featured: true,
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-05-30')
      },
      {
        name: 'Simon-game',
        description: 'Interactive weather dashboard displaying current conditions, forecasts, and historical data with beautiful visualizations.',
        technologies: ['JavaScript', 'HTML', 'CSS'],
        skills: [jsSkill._id],
        github: 'https://github.com/yogu19/Simon-game',
        demo: 'https://github.com/yogu19/Simon-game',
        status: 'Completed',
        featured: false,
        startDate: new Date('2023-11-01'),
        endDate: new Date('2023-12-15')
      },
      {
        name: 'simple-project',
        description: 'clone of spotify web page frontend',
        technologies: ['HTML', 'CSS'],
        skills: [jsSkill._id],
        github: 'https://github.com/yogu19/simple-project-',
        status: 'Completed',
        featured: false,
        startDate: new Date('2024-06-01')
      },
      {
        name: 'Me-API Playground',
        description: 'Personal API playground showcasing skills, projects, and profile information with a clean React frontend.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Vercel', 'Railway'],
        skills: [reactSkill._id, nodeSkill._id, mongoSkill._id, jsSkill._id],
        github: 'https://github.com/yourusername/me-api-playground',
        demo: 'https://your-me-api.vercel.app',
        status: 'Completed',
        featured: true,
        startDate: new Date('2024-09-01'),
        endDate: new Date('2024-09-26')
      }
    ]);

    console.log('Created projects');
    console.log(Project);
    console.log('Database seeded successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();