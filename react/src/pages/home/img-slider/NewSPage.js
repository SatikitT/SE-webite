import React, { useEffect, useState } from 'react';
import './NewsPage.css';

const newsItems = [
    {   
        title: "EVOLVING VOLUMES",
        date: "20 SEP 2024",
        description: "DISCOVER MORE",
        imgUrl: "https://s1.significados.com/foto/software-og.jpg",
        link: "#", // Placeholder link
    },
    {
        title: "YOUNG AND FAST",
        date: "20 SEP 2024",
        description: "DISCOVER MORE",
        imgUrl: "https://s1.significados.com/foto/software-og.jpg",
        link: "#", // Placeholder link
    },
    {
        title: "IMOLA, 15 - 21 OCTOBER",
        date: "20 SEP 2024",
        description: "DISCOVER MORE",
        imgUrl: "https://s1.significados.com/foto/software-og.jpg",
        link: "#", // Placeholder link
    },
    {
        title: "PRE-OWNED",
        date: "20 SEP 2024",
        description: "DISCOVER MORE",
        imgUrl: "https://s1.significados.com/foto/software-og.jpg",
        link: "#", // Placeholder link
    },
    {
        title: "ONE OF A KIND",
        date: "20 SEP 2024",
        description: "DISCOVER MORE",
        imgUrl: "https://s1.significados.com/foto/software-og.jpg",
        link: "#", // Placeholder link
    },
    {
        title: "PAST MODELS",
        date: "20 SEP 2024",
        description: "DISCOVER MORE",
        imgUrl: "https://s1.significados.com/foto/software-og.jpg",
        link: "#", // Placeholder link
    },
    {
        title: "PAST MODELS",
        date: "20 SEP 2024",
        description: "DISCOVER MORE",
        imgUrl: "https://s1.significados.com/foto/software-og.jpg",
        link: "#", // Placeholder link
    },
    {
        title: "PAST MODELS",
        date: "20 SEP 2024",
        description: "DISCOVER MORE",
        imgUrl: "https://s1.significados.com/foto/software-og.jpg",
        link: "#", // Placeholder link
    },
];

const NewsPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const newsPagePosition = document.querySelector('.news-page').offsetTop;
            const scrollPosition = window.scrollY + window.innerHeight;

            // Check if the scroll has reached the "news-page" element
            if (scrollPosition > newsPagePosition) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`news-page ${isVisible ? 'show' : ''}`}>
            {newsItems.map((item, index) => (
                <div className="news-item" key={index}>
                    {/* Wrap image in anchor tag */}
                    <a href={item.link}>
                        <img src={item.imgUrl} alt={item.title} />
                    </a>
                    <div className="news-text">
                        <h3>{item.date}</h3>
                        <h2>{item.title}</h2>
                        <a href={item.link}>
                            <p>{item.description}</p>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsPage;
