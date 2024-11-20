import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../api';
import './Forum.css';
import Footer from '../../components/footer/Footer';

const Forum = ({ username }) => {
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [media, setMedia] = useState(null);
    const [titleError, setTitleError] = useState(false);
    const [mediaError, setMediaError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = () => {
        fetch(`${API_BASE_URL}/forums/1/posts/`)
            .then((res) => res.json())
            .then((data) => setQuestions(data))
            .catch((err) => console.error(err));
    };

    const handlePost = async () => {
        if (!title.trim()) {
            setTitleError(true);
            return;
        }

        const postPayload = { title, content: details, username };
        try {
            const response = await axios.post(`${API_BASE_URL}/forums/1/posts/?title=${title}&content=${details}&username=${username}`);

            if (response.status === 200) {
                const newPost = response.data;
                setQuestions([newPost, ...questions]);

                if (media) {
                    const formData = new FormData();
                    formData.append('tag', newPost.title);
                    formData.append('file', media);

                    await axios.post(`${API_BASE_URL}/update-image`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });
                }

                // Reset form
                setTitle('');
                setDetails('');
                setMedia(null);
                setTitleError(false);
                setMediaError(false);

                fetchPost();
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleMediaUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image')) {
            setMedia(file);
            setMediaError(false);
        } else {
            setMedia(null);
            setMediaError(true);
        }
    };

    const handleViewDetails = (question) => {
        console.log(question);
        navigate(`/forum/${encodeURIComponent(question.title)}`, { state: { question } });
    };

    return (
        <>
            <div className="forum-main">
                <div className="forum-container">
                    <main>
                        <div className="post-container">
                            <input
                                type="text"
                                placeholder={
                                    titleError
                                        ? '! Title is required'
                                        : "What's on your mind?"
                                }
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    if (e.target.value.trim()) setTitleError(false);
                                }}
                                style={{
                                    borderColor: titleError ? '#ff6961' : '#d1d1d1',
                                    color: titleError ? '#ff6961' : 'inherit',
                                }}
                            />

                            <textarea
                                placeholder="Details... (Optional)"
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                            ></textarea>

                            {mediaError && (
                                <p className="error-text">Only image files are allowed!</p>
                            )}

                            {media && (
                                <div className="media-preview">
                                    <img
                                        src={URL.createObjectURL(media)}
                                        alt="Preview"
                                        style={{ maxWidth: '100%' }}
                                    />
                                </div>
                            )}

                            <div className="actions">
                                <label>
                                    + Add Photo
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleMediaUpload}
                                    />
                                </label>
                                <button className="post-button" onClick={handlePost}>
                                    Post
                                </button>
                            </div>
                        </div>

                        {questions.map((question, index) => (
                            <div
                                key={index}
                                className="post hoverable"
                                onClick={() => handleViewDetails(question)}
                            >
                                <h3>{question.title}</h3>
                                <p>
                                    {question.content.length > 100
                                        ? `${question.content.slice(0, 100)}...`
                                        : question.content}
                                </p>
                            </div>
                        ))}
                    </main>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default Forum;
