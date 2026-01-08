import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './ProjectsPage.css';
import logo from '../assets/merath_logo_transparent.png';

const ProjectsPage: React.FC = () => {
  const projects = [
    { id: 1, number: '1' },
    { id: 2, number: '2' },
    { id: 3, number: '3' },
    { id: 4, number: '4' },
    { id: 5, number: '5' },
    { id: 6, number: '6' },
  ];

  return (
    <div className="projects-page">
      <NavBar />
      
      <img src={logo} alt="Merath Logo" className="projects-logo" />
      
      <div className="project-tile">
        <div className="project-tile-image"></div>
        <div className="project-tile-text">
          We work with the remains of a region in motion a collective method for thinking and making through how art, memory, and relation move across borders and histories.
        </div>
      </div>
      
      <div className="project-tile">
        <div className="project-tile-image"></div>
        <div className="project-tile-text">
          We work with the remains of a region in motion a collective method for thinking and making through how art, memory, and relation move across borders and histories.
        </div>
      </div>
      
      <div className="project-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-grid-tile">
            <div className="project-number">{project.number}</div>
            <div className="project-grid-image"></div>
            <div className="project-grid-text">
              We work with the remains of a region in motion a collective method for thinking and making through how art, memory, and relation move across borders and histories.
            </div>
          </div>
        ))}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProjectsPage;
