import './footer.css';
import ig from '../../assets/footer/IG.png';
import fb from '../../assets/footer/FB.png';
import x from '../../assets/footer/X.png';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-container">
                    {/* KMITL Logo and Socials */}
                    <div className="footer-col">
                        <a href="https://www.kmitl.ac.th/" target="_blank" rel="noopener noreferrer">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/KMITL_Sublogo.svg/320px-KMITL_Sublogo.svg.png" 
                                alt="KMITL Logo" 
                                className="footer-logo"
                            />
                        </a>
                        <p className="footer-heading">Get in Touch</p>
                        <div className="footer-socials">
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                <img src={ig} alt="Instagram" className="footer-social-icon" />
                            </a>
                            <a href="https://www.facebook.com/sekmitl" target="_blank" rel="noopener noreferrer">
                                <img src={fb} alt="Instagram" className="footer-social-icon" />
                            </a>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                <img src={x} alt="Instagram" className="footer-social-icon" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="footer-col">
                        <p className="footer-heading">Contact Information</p>
                        <ul className="footer-contact-list">
                            <li>
                                <strong>Email:</strong> 
                                <a href="mailto:info@kmitl.ac.th" className="footer-contact-link"> info@kmitl.ac.th</a>
                            </li>
                            <li>
                                <strong>Phone:</strong> 
                                <a href="tel:+6623298000" className="footer-contact-link"> +66 2 329 8000</a>
                            </li>
                            <li>
                                <strong>Address:</strong> 
                                1 Chalong Krung 1 Alley, Lat Krabang, Bangkok 10520, Thailand
                            </li>
                        </ul>
                    </div>

                    {/* Embedded Google Map */}
                    <div className="footer-col">
                        <p className="footer-heading">Our Location</p>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.0841741396215!2d100.77813521533305!3d13.728162490363372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e299d1ad000003%3A0x32b45082c401b6b4!2sKing%20Mongkut&#39;s%20Institute%20of%20Technology%20Ladkrabang%20(KMITL)!5e0!3m2!1sen!2sth!4v1690805217057!5m2!1sen!2sth"
                            width="100%"
                            height="200"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2024, 2nd Year SE Student</p>
            </div>
        </footer>
    );
}

export default Footer;