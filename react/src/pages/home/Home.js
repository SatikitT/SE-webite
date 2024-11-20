import React from 'react';
import './home.css';
import './img-slider/slider.js'

import Footer from '../../components/footer/Footer.js';
import News from './img-slider/NewSPage.js'
import Slider from './img-slider/slider.js';
import EditableMedia from '../../components/editableimage/EditableImage.js';
import { Link } from 'react-router-dom';

const Home = ({isAdmin}) => {

    const imgStyles = {
        height: '100vh'
    };

    return (
        <>
            <div className="page-container">
                <EditableMedia mediaTag={"mainpage"} mediaStyle={imgStyles}/>
                <div className='gradient'></div>
                <div className="text-over1">
                    <div>
                        SOFTWARE<br></br>ENGINEERING
                    </div>
                    <div style={{ fontSize: '2vh' }}>
                        "Producing graduates who are knowledgeable and practice-oriented, grounded in engineering thought,
                        <br></br>practices,and processes, while integrating multidisciplinary fields to compete in industry and apply their
                        <br></br>knowledge increating innovation."
                    </div>
                </div>

        
                <div className='section' style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
                    <Slider />
                </div>

                <div className='section' style={{ background: 'white' }}>
                    <News />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
