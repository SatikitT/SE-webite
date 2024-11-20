import React from "react";

const About = () => {
    return (
        <>
            <div style={{ height: "5em" }}></div>

            <div style={{ textAlign: "center", padding: "20px", width: "50%", margin: "auto"}}>
                <h2>About Software Engineering at KMITL</h2>
                <p>
                    The Software Engineering program at King Mongkut's Institute of Technology Ladkrabang (KMITL) is
                    designed to equip students with the skills needed to excel in the dynamic field of software
                    development. The program emphasizes both theoretical foundations and hands-on experience in areas
                    such as software design, algorithms, data structures, cloud computing, mobile applications, and
                    more. 
                </p>
                <p>
                    KMITL's Software Engineering program is committed to producing graduates who can innovate and adapt
                    to the fast-paced evolution of technology. With strong industry ties and a focus on real-world
                    applications, the program prepares students for careers as software engineers, data scientists, 
                    web developers, and beyond.
                </p>
            </div>
            
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <iframe
                    title="KMITL Map"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3875.8053091780007!2d100.77858!3d13.730234!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d664988a1bedf%3A0xcc678f180e221cd0!2sKing%20Mongkut's%20Institute%20of%20Technology%20Ladkrabang!5e0!3m2!1sen!2sus!4v1630665355908!5m2!1sen!2sus"                    width="600"
                    height="450"
                    style={{ border: "0" }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </>
    );
};

export default About;
