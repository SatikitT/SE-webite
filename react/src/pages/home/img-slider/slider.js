import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../api';
import EditableMedia from '../../../components/editableimage/EditableImage';
import './slider.css';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]); // State to hold the filtered awards
  const intervalRef = useRef(null);

  const fetchAwards = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/items/`); // Replace with the actual endpoint
      const awards = response.data
        .filter((award) => award.type === 'award') // Filter for award type
        .slice(-4) // Get the last 4 awards
        .reverse(); // Reverse to display the most recent first
      setSlides(awards);
    } catch (error) {
      console.error('Error fetching awards:', error);
    }
  };

  useEffect(() => {
    fetchAwards();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const resetSlideInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    resetSlideInterval();
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : slides.length - 1));
    resetSlideInterval();
  };

  const selectSlide = (index) => {
    setCurrentSlide(index);
    resetSlideInterval();
  };

  return (
    <div className="slider">
      {slides.length > 0 ? (
        <>
          <div className="slider-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <div className="slide" key={index}>
                <div className="slide-content">
                  <div className="slide-title">{slide.title}</div>
                  <div className="slide-text">{slide.detail}</div>
                </div>
                <div className="slide-image">
                  <EditableMedia mediaTag={slide.title} mediaStyle={{ width: '80%', height: 'auto', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
                </div>
              </div>
            ))}
          </div>

          <div className="arrows">
            <button className="arrow prev" onClick={prevSlide}>
              &#10094;
            </button>
            <button className="arrow next" onClick={nextSlide}>
              &#10095;
            </button>
          </div>

          <div className="dots">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => selectSlide(index)}
              />
            ))}
          </div>
        </>
      ) : (
        <p>Loading awards...</p>
      )}
    </div>
  );
};

export default Slider;
