import React, { useState, useEffect } from 'react';
import Modal from './model/model.js'; // Correct capitalization of Modal
import aboutstyle from './about-page.module.css';
import Footer from '../../components/footer/Footer.js';

const teamData = {
  head: {
    name: "Dr. Someone",
    position: "Head of Software Engineering",
    email: "johndoe@example.com",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdAKajl852Eo3K0K6q-pZtA7Dy8vGJdaip5w&s",
    description: "Someone has over 20 years of experience in software engineering. He specializes in software architecture and large-scale systems design."
  },
  lecturers: [
    { name: "Lecturer 1", position: "Lecturer", email: "lecturer1@example.com", img: "https://images.javatpoint.com/top10-technologies/images/top-10-hollywood-actors9.png", description: "Lecturer 1 is a specialist in machine learning and artificial intelligence." },
    { name: "Lecturer 2", position: "Lecturer", email: "lecturer2@example.com", img: "https://e0.pxfuel.com/wallpapers/456/64/desktop-wallpaper-ryan-reynolds-hollywood-handsome-actor-thumbnail.jpg", description: "Lecturer 2 focuses on software testing and quality assurance." },
    { name: "Lecturer 3", position: "Lecturer", email: "lecturer3@example.com", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaUm7ZiNC6meeuBChMoOs3Fs1cnBzvG7B4ZA&s", description: "Lecturer 3's research involves cloud computing and distributed systems." },
    { name: "Lecturer 4", position: "Lecturer", email: "lecturer4@example.com", img: "https://m.media-amazon.com/images/M/MV5BMjA2ODY1MDA5MV5BMl5BanBnXkFtZTcwNjU1MzIyOA@@._V1_FMjpg_UX1000_.jpg", description: "Lecturer 4 teaches software design and architecture." },
    { name: "Lecturer 5", position: "Lecturer", email: "lecturer5@example.com", img: "https://cdn.britannica.com/58/222658-050-6D713DFB/American-singer-songwriter-dancer-Michael-Jackson-1979.jpg", description: "Lecturer 5 is an expert in software engineering processes and methodologies." },
    { name: "Lecturer 6", position: "Lecturer", email: "lecturer6@example.com", img: "https://i.guim.co.uk/img/media/51d065103948208e35132ca541ca95b84f10043b/0_129_3000_1800/master/3000.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=483912c2611fd243fb81b631c82272be", description: "Lecturer 6 has published multiple research papers on human-computer interaction." }
  ],
  staff: [
    { name: "Staff 1", position: "Staff", email: "staff1@example.com", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm55gLJyU6NJDghS-NwBVSc_mec47F9GFhmQ&s", description: "Staff 1 is responsible for administrative tasks and student support." },
    { name: "Staff 2", position: "Staff", email: "staff2@example.com", img: "https://media.istockphoto.com/id/1080176010/photo/professional-cleaners-during-the-work-indoors.jpg?s=612x612&w=0&k=20&c=989dJfostrhjevvm6uoSb4FruvbBH5g54l3xbnntf9I=", description: "Staff 2 manages technical support and departmental resources." }
  ]
};

const App = () => {
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
            <div className={aboutstyle.leaderSection}>
              <div className={aboutstyle.leaderMember}>
                <h3>Head of Software Engineering</h3>
                <img
                  src={teamData.head.img}
                  alt={teamData.head.name}
                  onClick={() => handleOpenModal(teamData.head)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
          <div className={aboutstyle.fadeDown}>
            <div className={aboutstyle.lecturerSection}>
              <h3>Lecturers</h3>
              <div className={aboutstyle.lecturerMembers}>
                {teamData.lecturers.map((lecturer, index) => (
                  <div className={aboutstyle.teamMember} key={index}>
                    <img
                      src={lecturer.img}
                      alt={lecturer.name}
                      onClick={() => handleOpenModal(lecturer)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={aboutstyle.fadeDown}>
            <div className={aboutstyle.staffSection}>
              <h3 style={{ textAlign: 'center' }}>Staff member</h3>
              <div className={aboutstyle.staffMembers}>
                {teamData.staff.map((staff, index) => (
                  <div className={aboutstyle.teamMember} key={index}>
                    <img
                      src={staff.img}
                      alt={staff.name}
                      onClick={() => handleOpenModal(staff)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                ))}
              </div>
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
      <Footer />
    </div>
  );
};

export default App;
