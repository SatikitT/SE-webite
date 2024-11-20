import React from 'react';
import './Queenland.css';


const PageContainer = () => {
    return (
        <div className="page-wrapper">


            {/* Main Content Section */}
            <div className="page-container-Queen">
                <div className="section-Queen">
                    {/* University Logo */}
                    <img
                        src="https://includeability.gov.au/sites/default/files/2021-08/UQlogo-Purple-rgb_800.jpg"
                        alt="University of Queensland Logo"
                        className="uq-logo"
                    />

                    {/* Content Section */}
                    <div className="section-content">
                        <div className="content-container">
                            <h1>The University of Queensland (UQ)</h1>
                            <p>
                                UQ is a premier public research university located in Brisbane, Australia. Established in 1909, it has a rich heritage of fostering innovation and has consistently been ranked among the top 50 universities worldwide. The main campus in St Lucia offers a picturesque and tranquil environment, with comprehensive infrastructure, world-class research facilities, and on-campus accommodations.
                            </p>

                            <h2>Bachelor of Engineering (Software Engineering)</h2>
                            <p>
                                UQ’s Bachelor of Engineering in Software Engineering is internationally recognized and accredited by Engineers Australia. The program features a flexible curriculum emphasizing hands-on learning through real-world projects, preparing students for diverse career opportunities.
                            </p>

                            <h2>Admissions</h2>
                            <p>Requirements for the double-degree program:</p>
                            <ul>
                                <li>Completion of Year 2 in the B.Eng. Software Engineering program with a GPA of 3.2 or more.</li>
                                <li>IELTS score of 6.5 or higher, with no subtest below 6.0.</li>
                            </ul>

                            <h2>Degrees Awarded</h2>
                            <p>Upon completing Year 4, students will receive:</p>
                            <ul>
                                <li>BEng (Hons) in Software Engineering from the University of Queensland.</li>
                                <li>B.Eng. in Software Engineering from KMITL.</li>
                            </ul>

                            <h2>Tuition Fees</h2>
                            <p>
                                <strong>Years 1-2:</strong> Students pay the KMITL standard tuition fee of 90,000 Baht per semester.
                                <br />
                                <strong>Years 3-4:</strong> Students pay UQ’s tuition fees and are eligible for special scholarships from UQ, which partially cover the fees.
                            </p>

                            <h2>Application Process</h2>
                            <p>
                                Students apply to join the double-degree program in their 2nd year of the B.Eng. Software Engineering program at KMITL. Further details on the application process will be posted soon.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PageContainer;
