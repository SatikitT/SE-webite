import React from 'react';
import { Link } from 'react-router-dom';
import './program.css';
import GUni from './asset/university-of-glasgow.jpg'
import QUni from './asset/queenlanduni.jpg'
import KUni from './asset/kmitl.jpg'

const Program = () => {
  return (
    <div className="program-page-container">
      <h2 className="program-title">Programs</h2>
      <div className="card-grid">
        {/* Card 1 */}
        <div className="card-container">
          <div className="card-image">
            <img
              src={KUni}
              alt="Study Room"
            />
          </div>
          <div className="card-content"> 
            <h3>Software-Engineering-2024</h3>
            <Link to="/program/software" className="card-link">
              Find out more <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card-container">
          <div className="card-image">
            <img
              src={GUni}
              alt="Study Room"
            />
          </div>
          <div className="card-content">
            <h3>KMITL-Glasgow</h3>
            <Link to="/program/glasgow" className="card-link">
              Find out more <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card-container">
          <div className="card-image">
            <img
              src={QUni}
              alt="Study Room"
            />
          </div>
          <div className="card-content">
            <h3>KMITL-Queensland</h3>
            <Link to="/program/queensland" className="card-link">
              Find out more <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Program;
