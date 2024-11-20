import React, { useState, useEffect } from 'react';
import Modal from './model/model.js';
import './about-page.css'; // Normal CSS import

const teamData = {
  head: {
    name: "Dr. Someone",
    position: "Head of Software Engineering",
    email: "johndoe@example.com",
    img: "https://png.pngtree.com/png-vector/20200425/ourmid/pngtree-single-person-character-in-vector-png-image_2194492.jpg",
    description: "Someone has over 20 years of experience in software engineering. He specializes in software architecture and large-scale systems design."
  },
  lecturers: [
    { name: "Lecturer 1", position: "Lecturer", email: "lecturer1@example.com", img: "https://www.svgrepo.com/show/311063/person.svg", description: "Lecturer 1 is a specialist in machine learning and artificial intelligence." },
    { name: "Lecturer 2", position: "Lecturer", email: "lecturer2@example.com", img: "https://www.svgrepo.com/show/311063/person.svg", description: "Lecturer 2 focuses on software testing and quality assurance." },
    { name: "Lecturer 3", position: "Lecturer", email: "lecturer3@example.com", img: "https://www.svgrepo.com/show/311063/person.svg", description: "Lecturer 3's research involves cloud computing and distributed systems." },
    { name: "Lecturer 4", position: "Lecturer", email: "lecturer4@example.com", img: "https://www.svgrepo.com/show/311063/person.svg", description: "Lecturer 4 teaches software design and architecture." },
    { name: "Lecturer 5", position: "Lecturer", email: "lecturer5@example.com", img: "https://www.svgrepo.com/show/311063/person.svg", description: "Lecturer 5 is an expert in software engineering processes and methodologies." },
    { name: "Lecturer 6", position: "Lecturer", email: "lecturer6@example.com", img: "https://www.svgrepo.com/show/311063/person.svg", description: "Lecturer 6 has published multiple research papers on human-computer interaction." }
  ],
  staff: [
    { name: "Staff 1", position: "Staff", email: "staff1@example.com", img: "https://www.svgrepo.com/show/311063/person.svg", description: "Staff 1 is responsible for administrative tasks and student support." },
    { name: "Staff 2", position: "Staff", email: "staff2@example.com", img: "https://www.svgrepo.com/show/311063/person.svg", description: "Staff 2 manages technical support and departmental resources." }
  ]
};

const About = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  // Modal handlers
  const handleOpenModal = (member) => {
    setModalContent(member);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent({});
  };

  useEffect(() => {
    const handleScroll = () => {
      // Select all elements with the correct fade classes
      const elements = document.querySelectorAll(
        '.fadeLeft, .fadeRight, .fadeUp, .fadeDown'
      );
  
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
          el.classList.add('visible');
        } else {
          if (rect.top > window.innerHeight * 0.4) {
            el.classList.remove('visible');
          }
        }
      });
    };
  
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on initial load
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pageBackground">
      <div className="containerAbout">
        <div className="sectionAbout fadeLeft">
          <div className="titleFirst">What is Software Engineering?</div>
        </div>

        <div className="sectionAbout fadeRight description">
          <p>
            Software engineering (SE) is an engineering discipline concerning all aspects of software production, including software analysis, design, development, testing, and deployment. SE requires profound abstract and logical thinking and the application of mathematics, logic, and computer science to produce efficient and reliable software with the available resources.
          </p>
        </div>

        <div className="imgContainer">
          <div className="fadeDown">
            <img src="https://tu.ac.th/uploads/Study/TURangsit0056.jpg" alt="Industrial Team" />
          </div>
        </div>

        <div className="sectionAbout fadeLeft">
          <div className="titleRight">Why Study Software Engineering?</div>
        </div>

        <div className="sectionAbout fadeLeft descriptionLeft">
          <p>
            It is hard to overstate the ubiquity of software nowadays. Every computer system is governed by software. 
            Almost every human activity involves software in some form. Undoubtedly, the software industry is one of the largest and fastest-growing industries in the world.
          </p>
        </div>

        <div className="imgContainerRight fadeUp">
          <img src="https://tu.ac.th/uploads/Study/TURangsit0056.jpg" alt="Industrial Team" />
        </div>

        <div className="sectionAbout fadeRight">
          <div className="title">Careers in Software Engineering</div>
        </div>

        <div className="sectionAbout fadeRight description">
          <p>
            There are abundant career opportunities for graduates from the software engineering program. Software engineers, software architects, and software developers work on various platforms, including enterprise software, web applications, mobile applications, games, embedded applications, and more. Analysts and designers of IT systems, and IT consultants are also common roles for SE graduates.
          </p>
        </div>

        <div className="imgContainer fadeUp">
          <img src="https://tu.ac.th/uploads/Study/TURangsit0056.jpg" alt="Industrial Team" />
        </div>

        {/* Team Section */}
        <div className="sectionAbout fadeLeft">
          <div className="titleFirst">Our Staff and Professor</div>
        </div>

        <div className="teamContainer">
          <div className="leaderSection">
            <div className="leaderMember">
              <h3>Head of Software Engineering</h3>
              <img
                src={teamData.head.img}
                alt={teamData.head.name}
                onClick={() => handleOpenModal(teamData.head)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>

          <div className="lecturerSection">
            <h3>Lecturers</h3>
            <div className="lecturerMembers">
              {teamData.lecturers.map((lecturer, index) => (
                <div className="teamMember" key={index}>
                  <img
                    src={lecturer.img}
                    alt={lecturer.name}
                    onClick={() => handleOpenModal(lecturer)}
                    style={{ cursor: 'pointer' }}
                  />
                  <div className="overlayText">{lecturer.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="staffSection">
            <h3 style={{ textAlign: 'center' }}>Staff member</h3>            
            <div className="staffMembers">
              {teamData.staff.map((staff, index) => (
                <div className="teamMember" key={index}>
                  <img
                    src={staff.img}
                    alt={staff.name}
                    onClick={() => handleOpenModal(staff)}
                    style={{ cursor: 'pointer' }}
                  />
                  <div className="overlayText">{staff.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal show={showModal} handleClose={handleCloseModal} title={modalContent.name}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '4vh',
            alignItems: 'center',
            maxHeight: '70vh',
            overflowY: 'auto'
          }}
        >
          <img
            src={modalContent.img}
            alt={modalContent.name}
            style={{
              borderRadius: '10px',
              height: '20vh',
              width: '20vh',
              objectFit: 'cover',
              marginRight: '2vh'
            }}
          />
          <div>
            <h2>{modalContent.name}</h2>
            <h3>{modalContent.position}</h3>
            <p>
              <strong>Email:</strong> {modalContent.email}
            </p>
            <p>
              <strong>Description:</strong> {modalContent.description}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default About;
