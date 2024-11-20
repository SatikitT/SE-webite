import React from 'react';
import './GlassGlow.css';


const PageContainer = () => {
    return (
        <div className="page-wrapper">
            {/* Header Section */}

            {/* Main Content Section */}
            <div className="page-container-Glass">
                <div className="section-Glass">
                    {/* University Logo */}
                    <img
                        src="http://se.kmitl.ac.th/assets/logoglasgowuniversitysmall.png"
                        alt="University of Glasgow Logo"
                        className="glasgow-logo"
                    />

                    {/* Content Section */}
                    <div className="section-content">
                        <div className="content-container">
                            <h1>KMITL-Glasgow Double-Degree Program in Software Engineering</h1>
                            <p>
                                The KMITL-Glasgow Double-Degree Program in Software Engineering is a collaboration between KMITL and the University of Glasgow, UK. It offers an opportunity for qualified students who have completed Year 2 at KMITL to enter Years 3 and 4 at the University of Glasgow. Students will have the chance to study with world-renowned academics and work on projects with multi-national talents, gaining valuable academic and cultural experiences.
                            </p>

                            <h2>About the University of Glasgow</h2>
                            <p>
                                Founded in 1451, the University of Glasgow is one of the world's oldest and most prestigious universities. It has consistently been ranked among the top 100 universities globally and is known for its advanced research and teaching. The School of Computing Science at Glasgow is highly respected and consistently ranked among the UK's top 10 for computing programs.
                            </p>

                            <h2>Admission Requirements</h2>
                            <p>To join the double-degree program, students must:</p>
                            <ul>
                                <li>Complete Year 2 of the B.Eng. in Software Engineering program at KMITL with a GPA of 3.2 or higher.</li>
                                <li>Achieve an IELTS score of 6.5 or more, with no subtest score below 6.0.</li>
                            </ul>

                            <h2>Degrees Awarded</h2>
                            <p>Upon successful completion of Year 4, students will receive:</p>
                            <ul>
                                <li>BSc Honours degree in Software Engineering from the University of Glasgow.</li>
                                <li>B.Eng. degree in Software Engineering from KMITL.</li>
                            </ul>
                            <p>
                                Students maintaining good academic records during their studies at Glasgow may be eligible to transfer to a one-year Master’s program in Software Engineering, graduating with an MSc degree from the University of Glasgow after Year 5.
                            </p>

                            <h2>Tuition Fees</h2>
                            <p>
                                <strong>Years 1-2 at KMITL:</strong> THB 180,000 per year.
                                <br />
                                <strong>Years 3-4 at Glasgow:</strong> GBP 17,536 per year (with 20% scholarship for the double-degree program).
                            </p>

                            <h2>Application Procedure</h2>
                            <p>
                                Applications are made at the end of Year 2 through the UCAS system by June 30th of the intended year of entry. Students must submit their application, a personal statement, and a copy of their IELTS score report.
                            </p>

                            <h2>UK Visa Guidance</h2>
                            <p>
                                Students will need to apply for a General Student Visa (Tier 4) after receiving their final CAS statement from the University of Glasgow. It is essential to prepare supporting documents such as a valid passport, proof of sufficient funds, and a tuberculosis test certificate.
                            </p>

                            <p>If you have any questions, please contact Asst. Prof. Dr. Visit Hirankitti at visit.hi@kmitl.ac.th.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PageContainer;
