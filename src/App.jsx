import "./App.css";

const projects = [
  {
    name: "Project One",
    description: "A short description of what this project does and why you built it.",
    tech: "React, Node.js",
    link: "https://github.com/your-username/project-one",
  },
  {
    name: "Project Two",
    description: "A short description of what this project does and why you built it.",
    tech: "Python",
    link: "https://github.com/your-username/project-two",
  },
  {
    name: "Project Three",
    description: "A short description of what this project does and why you built it.",
    tech: "JavaScript",
    link: "https://github.com/your-username/project-three",
  },
];

function App() {
  return (
    <div className="page">
      <header className="hero">
        <h1>Neha Patil</h1>
        <p className="tagline">Software developer building things with code.</p>
      </header>

      <section id="projects" className="section">
        <h2>Projects</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <a
              key={project.name}
              className="project-card"
              href={project.link}
              target="_blank"
              rel="noreferrer"
            >
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <span className="tech">{project.tech}</span>
            </a>
          ))}
        </div>
      </section>

      <section id="about" className="section">
        <h2>About</h2>
        <p>
          Write a couple sentences here about who you are, what you're interested in,
          and what you're currently working on or learning.
        </p>
      </section>

      <section id="contact" className="section">
        <h2>Contact</h2>
        <ul className="contact-list">
          <li>
            <a href="mailto:you@example.com">you@example.com</a>
          </li>
          <li>
            <a href="https://github.com/your-username" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/your-username" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Neha Patil</p>
      </footer>
    </div>
  );
}

export default App;
