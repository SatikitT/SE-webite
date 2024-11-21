import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './model/model.js'; // Correct capitalization of Modal
import aboutstyle from './about-page.module.css';
import Footer from '../../components/footer/Footer.js';
import { API_BASE_URL } from '../../api';
import EditableMedia from '../../components/editableimage/EditableImage.js';

const App = () => {
  const [teamData, setTeamData] = useState({
    head: null,
    lecturers: [],
    staff: []
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const fetchTeamData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/staff/`); // Assuming `/staff/` returns all staff
      const data = response.data;

      // Organize staff by type
      const head = data.find(member => member.role === 'Head') || null;
      const lecturers = data.filter(member => member.role === 'Lecturer');
      const staff = data.filter(member => member.role === 'Staff');

      setTeamData({
        head,
        lecturers,
        staff
      });
    } catch (error) {
      console.error('Error fetching staff:', error.response?.data || error);
      alert('Failed to fetch staff.');
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  // Modal handlers
  const handleOpenModal = (member) => {
    setModalContent(member);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent({});
  };

  // Scroll effect logic
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(`.${aboutstyle.fadeLeft}, .${aboutstyle.fadeRight}, .${aboutstyle.fadeUp}, .${aboutstyle.fadeDown}`);
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
          el.classList.add(aboutstyle.visible);
        } else {
          if (rect.top > window.innerHeight * 0.4) {
            el.classList.remove(aboutstyle.visible);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on initial load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={aboutstyle.pageBackground}>
      <div className={aboutstyle.containerAbout}>
        <div className={`${aboutstyle.sectionAbout} ${aboutstyle.fadeLeft}`}>
          <div className={aboutstyle.titleFirst}>What is Software Engineering?</div>
        </div>

        <div className={`${aboutstyle.sectionAbout} ${aboutstyle.fadeRight} ${aboutstyle.description}`}>
          <p>
            Software engineering (SE) is an engineering discipline concerning all aspects of software production, including software analysis, design, development, testing, and deployment. SE requires profound abstract and logical thinking and the application of mathematics, logic, and computer science to produce efficient and reliable software with the available resources.
          </p>
        </div>

        <div className={aboutstyle.imgContainer}>
          <div className={aboutstyle.fadeLeft}>
            <img src="https://eng.rmutsv.ac.th/engineeri/sites/default/files/images/computer/Capture6.PNG" alt="Industrial Team" />
          </div>
        </div>

        <div className={`${aboutstyle.sectionAbout} ${aboutstyle.fadeLeft}`}>
          <div className={aboutstyle.titleRight}>Why Study Software Engineering?</div>
        </div>

        <div className={`${aboutstyle.sectionAbout} ${aboutstyle.fadeLeft} ${aboutstyle.descriptionLeft}`}>
          <p>
            It is hard to overstate the ubiquity of software nowadays. Every computer system is governed by software.
            Almost every human activity involves software in some form. Undoubtedly, the software industry is one of the largest and fastest-growing industries in the world.
          </p>
        </div>

        <div className={`${aboutstyle.imgContainerRight} ${aboutstyle.fadeRight}`}>
          <img src="https://cite.dpu.ac.th/upload/content/images/CE.jpeg" alt="Industrial Team" />
        </div>

        <div className={`${aboutstyle.sectionAbout} ${aboutstyle.fadeRight}`}>
          <div className={aboutstyle.title}>Careers in Software Engineering</div>
        </div>

        <div className={`${aboutstyle.sectionAbout} ${aboutstyle.fadeRight} ${aboutstyle.description}`}>
          <p>
            There are abundant career opportunities for graduates from the software engineering program. Software engineers, software architects, and software developers work on various platforms, including enterprise software, web applications, mobile applications, games, embedded applications, and more. Analysts and designers of IT systems, and IT consultants are also common roles for SE graduates.
          </p>
        </div>

        <div className={`${aboutstyle.imgContainer} ${aboutstyle.fadeLeft}`}>
          <img src="https://tu.ac.th/uploads/Study/TURangsit0056.jpg" alt="Industrial Team" />
        </div>

        <div className={`${aboutstyle.sectionAbout} ${aboutstyle.fadeLeft}`}>
          <div className={aboutstyle.titleFirst}>Our Staff and Professor</div>
        </div>

        <div className={aboutstyle.teamContainer}>
          <div className={aboutstyle.fadeDown}>
            {teamData.head && (
              <div className={aboutstyle.leaderSection}>
                <div className={aboutstyle.leaderMember} onClick={() => handleOpenModal(teamData.head)}>
                  <h3>Head of Software Engineering</h3>
                  <EditableMedia
                      mediaTag={teamData.head.name}
                      mediaStyle={{
                        borderRadius: '10px',
                        height: '20vh',
                        width: '20vh',
                        objectFit: 'cover',
                        marginRight: '2vh'
                      }}
                    />
                </div>
              </div>
            )}
          </div>
          <div className={aboutstyle.fadeDown}>
            <div className={aboutstyle.lecturerSection}>
              <h3>Lecturers</h3>
              <div className={aboutstyle.lecturerMembers}>
                {teamData.lecturers.map((lecturer, index) => (
                  <div className={aboutstyle.teamMember} key={index} onClick={() => handleOpenModal(lecturer)}>
                    <EditableMedia
                      mediaTag={lecturer.name}
                      mediaStyle={{
                        borderRadius: '10px',
                        height: '20vh',
                        width: '20vh',
                        objectFit: 'cover',
                        marginRight: '2vh'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={aboutstyle.fadeDown}>
            <div className={aboutstyle.staffSection}>
              <h3 style={{ textAlign: 'center' }}>Staff Members</h3>
              <div className={aboutstyle.staffMembers}>
                {teamData.staff.map((staff, index) => (
                  <div className={aboutstyle.teamMember} key={index} onClick={() => handleOpenModal(staff)}>
                    <EditableMedia
                      mediaTag={staff.name}
                      mediaStyle={{
                        borderRadius: '10px',
                        height: '20vh',
                        width: '20vh',
                        objectFit: 'cover',
                        marginRight: '2vh'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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
          <EditableMedia
            mediaTag={modalContent.name}
            mediaStyle={{
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
      <Footer />
    </div>
  );
};

export default App;
