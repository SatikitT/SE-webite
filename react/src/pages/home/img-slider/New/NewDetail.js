import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './NewsDetail.module.css';
import Footer from '../../../../components/footer/Footer';
import EditableMedia from '../../../../components/editableimage/EditableImage';

const NewsDetail = () => {
    const location = useLocation();
    const newsItem = location.state;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!newsItem) {
        return (
            <div className={styles.errorMessage}>
                <h2>News Item Not Found</h2>
                <p>We couldn’t find the news item. Explore other topics that help save our planet!</p>
            </div>
        );
    }

    return (
        <div className={styles.newsDetailBG}>
            <div className={styles.newsDetail}>
                <header className={styles.header}>
                    {newsItem.title}
                </header>

                <div className={styles.content}>
                    <EditableMedia mediaTag={newsItem.title} mediaStyle={{ borderRadius: "10px", width: '100px' }} />
                    <p className={styles.detail}>{newsItem.detail}</p>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default NewsDetail;
