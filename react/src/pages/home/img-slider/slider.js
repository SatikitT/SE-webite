import React, { useEffect, useState, useRef } from 'react';
import './slider.css';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  const slides = [
    {
      imgSrc: 'https://techcrunch.com/wp-content/uploads/2024/11/techcrunch-disrupt-2024-open-source-panel.jpg?resize=1200,800',
      title: 'How to make open source software more secure',
      text: 'Earlier this year, a Microsoft developer realized that someone had inserted a backdoor into the code of open source utility XZ Utils, which is used in virtually all Linux operating systems.',
    },
    {
      imgSrc: 'https://analyticsindiamag.com/wp-content/uploads/2024/11/Using-AI-to-Build-AI-is-Questionable.jpg.webp',
      title: 'AI is Coding AI—Should Software Engineers Be Worried?',
      text: 'A recent GitHub survey found that 97% of developers use AI coding tools, and the use cases vary from project to project.',
    },
    {
      imgSrc: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/software_engineer_salaryus.jpg',
      title: 'Software Engineer Salaries in the US: An Ultimate Guide',
      text: 'Software engineering is a highly versatile job worldwide. It pays well, so it’s no wonder many people are pursuing this career. The demand for skilled and professional software engineers is still rising.',
    },
    {
      imgSrc: 'https://c.ndtvimg.com/2024-03/20jnau7g_google_625x300_14_March_24.jpg?im=FeatureCrop,algorithm=dnn,width=773,height=435',
      title: 'Google Software Engineering Internship For PhD Students: Check Eligibility, Duration, And More',
      text: 'This is a paid internship lasting 12-14 weeks, providing opportunities for personal growth, professional skill-building, talks from company leaders.',
    },
  ];

  useEffect(() => {
    // const startAutoSlide = () => {
    //   if (intervalRef.current) {
    //     clearInterval(intervalRef.current);
    //   }
    //   intervalRef.current = setInterval(() => {
    //     setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    //   }, 3000);
    // };

    //startAutoSlide();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [slides.length]);

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
      <div className="slider-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            <div className="slide-content">
              <div className="slide-title">{slide.title}</div>
              <div className="slide-text">{slide.text}</div>
              <div className="read-more">
                <span>READ MORE</span>
                <span className="arrow-icon"> &#8250; </span>
              </div>
            </div>
            <div className="slide-image">
              <img src={slide.imgSrc} alt={`Slide ${index + 1}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="arrows">
        <button className="arrow prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="arrow next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="dots">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => selectSlide(index)}
          />
        ))}
      </div>

      {/* View All News Button */}
      <div className="view-all-news">
        <a href="#">VIEW ALL NEWS</a>
      </div>
    </div>
  );
};

export default Slider;
