import React from 'react';
import './admission.css';
import Footer from '../../components/footer/Footer';

const Admission = () => {
  return (
    <>
      <div className="admission-container">
        <div style={{ marginTop: "7.5vh" }}></div>
        <section>
          <h1 className='yellow-line'>Software Engineering Admission - KMITL</h1>
          <p>
            Welcome to the School of Engineering, KMITL. Our Software Engineering program is designed to equip students with the technical skills and knowledge to excel in the software industry. Admission for the 2025 academic year is open. Below are the details for applying.
          </p>
        </section>

        {/* Application Requirements */}
        <section>
          <h2 className='yellow-line'>Application Requirements</h2>
          {/* Educational Background */}
          <h3>2.1 Educational Background (Required)</h3>
          <ul>
            <li>Graduated from or currently studying in Matthayom 6 (Thai Education System).</li>
            <li>Graduated with qualifications equivalent to Matthayom 6, recognized by the Ministry of Education.</li>
            <li>Graduated from or currently enrolled in an accredited higher education institution in Thailand or abroad.</li>
          </ul>
          <p><strong>Remark:</strong> Applicants must submit an official high school transcript, diploma, and/or certificate of completion prior to the commencement of the 2025 academic year.</p>

          {/* Standardized Test Results */}
          <h3>2.2 Standardized Test Results (Optional)</h3>
          <p>Submit one of the following standardized test results that meet the minimum requirements:</p>
          <ul>
            <li><strong>SAT/GSAT:</strong> 1020 or higher</li>
            <li><strong>ACT:</strong> 19 or higher</li>
            <li><strong>IB Diploma:</strong> 29 or higher</li>
            <li>National Higher Education Board Exam (such as A-Level, Gaokao, Suneung, etc.)</li>
          </ul>

          <h4>Additional Requirements for Software Engineering Applicants</h4>
          <ul>
            <li>SAT Math score of 600 or above</li>
            <li>ACT Math score of 23 or above</li>
            <li>IB Diploma Math score of 5 or above</li>
            <li>A-Level or AS-Level Math with grade B or above</li>
            <li>GPA of all high school Math subjects: 3 out of 4 (or equivalent)</li>
            <li>National Standardized Math score: 75% or above</li>
          </ul>

          {/* English Proficiency Test */}
          <h3>2.3 English Proficiency Test (Optional)</h3>
          <p>For non-native English speakers, submit one of the following test scores:</p>
          <ul>
            <li><strong>TOEFL (Paper-based):</strong> 550 or higher</li>
            <li><strong>TOEFL (Internet-based):</strong> 79 or higher</li>
            <li><strong>IELTS:</strong> 6.0 or higher</li>
            <li><strong>Pearson PTE:</strong> 55 or higher</li>
            <li><strong>Duolingo:</strong> 110 or higher</li>
          </ul>
          <p><strong>Remark:</strong> Test scores must not be older than two years. Applicants who do not meet the minimum English proficiency score may be conditionally admitted and required to take General Education English courses.</p>

          {/* Personal Statement */}
          <h3>2.4 Personal Statement (Optional)</h3>
          <p>Applicants may submit an essay (500 words or less) explaining their motivation for pursuing the degree, long-term goals, and commitment to the program.</p>

          {/* Recommendation Letters */}
          <h3>2.5 Recommendation Letters (Optional)</h3>
          <p>Provide two recommendation letters from high school academic advisors or teachers.</p>
        </section>

        {/* Application Submission */}
        <section>
          <h2 className='yellow-line'>Application Submission</h2>

          <p>Applicants must apply via the KMITL online application system.</p>
          <p><a href="https://new.reg.kmitl.ac.th/admission/" target="_blank" rel="noopener noreferrer" className="apply-link">Apply Here</a></p>

          <h3>Step 2: Pay the application fee</h3>
          <p>Pay the application fee (1,000 baht) via Kasikorn Bank or any mobile banking app. The fee is non-refundable. Eligibility for interviews will be informed after the review by the admission committee.</p>

          <h3>Step 3: Upload Documents</h3>
          <p>Upload the following documents in one PDF file (max 4MB):</p>
          <ul>
            <li>Application form (download from the system)</li>
            <li>Photocopy of national ID or passport</li>
            <li>Academic Records (e.g., High School Transcript, SAT, ACT, IB, etc.)</li>
            <li>English Proficiency Test score (optional)</li>
            <li>Two recommendation letters (optional)</li>
            <li>Personal Statement (optional)</li>
            <li>Portfolio (optional, max 10 pages)</li>
            <li>Placement test results (optional)</li>
            <li>Certificate from academic activities (optional)</li>
          </ul>

          <p><strong>File Naming:</strong> ProgramName_ApplicationID_FirstnameLastname.pdf</p>
        </section>

        {/* Tuition Fees */}
        <section>
          <h2 className='yellow-line'>Tuition Fees</h2>
          <p><strong>Software Engineering:</strong> 90,000 THB per semester</p>
        </section>

        {/* Scholarships */}
        <section>
          <h2 className='yellow-line'>Scholarships</h2>
          <h3>Academic Excellence Freshmen Scholarships</h3>
          <ul>
            <li>SAT General Test composite score of 1,300 or above</li>
            <li>TOEFL score of at least 550 (paper-based) or 79 (internet-based)</li>
            <li>IELTS score of at least 6.0</li>
          </ul>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className='yellow-line'>Contact Information</h2>
          <p><strong>For admissions:</strong></p>
          <p>
            Phone: +669 3474 7468 <br />
            Email: <a href="mailto:siie-admission@kmitl.ac.th">siie-admission@kmitl.ac.th</a> <br />
            Facebook: <a href="https://www.facebook.com/KMITL.SIIE" target="_blank" rel="noopener noreferrer">KMITL SIIE Official</a>
          </p>

          <p><strong>For Software Engineering program-specific inquiries:</strong></p>
          <p>
            Contact Person: Asst.Prof.Dr.Visit Hirankitti <br />
            Phone: +66 80 454 9990 <br />
            Email: <a href="mailto:visit.hi@kmitl.ac.th">visit.hi@kmitl.ac.th</a> <br />
            Website: <a href="http://www.se.kmitl.ac.th" target="_blank" rel="noopener noreferrer">Software Engineering KMITL</a>
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Admission;
