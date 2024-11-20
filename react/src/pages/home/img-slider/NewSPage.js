import React, { useEffect, useState } from 'react';
import './NewsPage.css';
import axios from 'axios';
import { API_BASE_URL } from '../../../api';
import EditableMedia from '../../../components/editableimage/EditableImage';

const NewsPage = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/items/`);
                const filteredNews = response.data
                    .filter((item) => item.type === 'news')
                    .slice(-8) 
                    .reverse();
                setNewsItems(filteredNews);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const newsPageElement = document.querySelector('.news-page');
            if (!newsPageElement) return; // Skip execution if the element doesn't exist

            const newsPagePosition = newsPageElement.offsetTop;
            const scrollPosition = window.scrollY + window.innerHeight;

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


    if (newsItems.length === 0) {
        return <div>Loading news...</div>;
    }

    return (
        <div className={`news-page ${isVisible ? 'show' : ''}`}>
            <h2 className="section-title">News and Activity</h2>
            <div className="news-grid">
                {newsItems.map((item, index) => (
                    <div className="news-item" key={index}>
                        <a href={item.link || '#'}>
                            <EditableMedia mediaTag={item.title}/>
                        </a>
                        <div className="news-text">
                            <h2>{item.title}</h2>
                            <a href={item.link || '#'} className="news-link">
                                <p>{item.description || 'Read More'}</p>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
