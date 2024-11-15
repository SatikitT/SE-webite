import './footer.css';
import ig from '../../assets/footer/IG.png'

function Footer(){
    return (
        <footer>
            <div className='footer-top'>
                <div className='footer-top-container'>
                    <div className='footer-top-container-col' style={{padding:'50px 0'}}>
                        <a href='https://www.kmitl.ac.th/' target="_blank">
                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/KMITL_Sublogo.svg/320px-KMITL_Sublogo.svg.png'
                            alt="KMIT-pic" height={50}></img>
                        </a>
                        <b style={{fontSize: '12px'}}>Get in touch</b>
                        <div style={{display:'flex',flexDirection:'row'}}> 
                            <a href='https://www.instagram.com/' target="_blank">
                            <img src={ig}alt="IG" height={30}></img>
                            </a>
                            <a href='https://www.instagram.com/' target="_blank">
                                <img src={ig}alt="IG" height={30}></img>
                            </a>
                            <a href='https://www.instagram.com/' target="_blank">
                                <img src={ig}alt="IG" height={30}></img>
                            </a>
                        </div>
                    </div>
                    <div className='footer-top-container-col'>
                        <b style={{fontSize: '12px'}}>Contact us</b>
                        <div>
                            <input type='mail'></input>
                        </div>
                    </div>
                </div>
            </div>

            <div className='footer-bottom'>
                © 2024, 2nd year SE student
            </div>
        </footer>
    );
}

export default Footer;