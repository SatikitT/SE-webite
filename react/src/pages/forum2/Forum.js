import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Forum.css';
// import SideNav from './component/side-nav/side-nav.js';

const PageContainer = () => {
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [media, setMedia] = useState(null);
    const [titleError, setTitleError] = useState(false); // Error state for title
    const [mediaError, setMediaError] = useState(false); // Error state for media
    const navigate = useNavigate();

    const handlePost = () => {
        if (!title.trim()) {
            setTitleError(true); // Show error if title is missing
            return;
        }
        const newQuestion = { title, body: details, media, username: 'example_user' };
        setQuestions([newQuestion, ...questions]);
        setTitle('');
        setDetails('');
        setMedia(null); // Clear media after posting
        setTitleError(false); // Clear error after successful post
        setMediaError(false); // Clear media error after successful post
    };

    const handleMediaUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image')) {
                setMedia(file);
                setMediaError(false); // Clear media error if file is valid
            } else {
                setMedia(null);
                setMediaError(true); // Show error if file is not an image
            }
        }
    };

    const handleViewDetails = (question) => {
        navigate(`/forum/${encodeURIComponent(question.title)}`, {
            state: { question }
        });
    };

    return (
        <div className='forum-main'>
            <div className='forum-container'>

                <main>
                    <div className="post-container">
                        <input
                            type="text"
                            placeholder={
                                titleError
                                    ? '!Title needs to be written before post'
                                    : "What's on your mind, Petch?"
                            }
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                if (e.target.value.trim()) {
                                    setTitleError(false); // Clear error when title is typed
                                }
                            }}
                            style={{
                                borderColor: titleError ? 'red' : '#27ae60', // Change border color
                                color: titleError ? 'red' : 'inherit', // Change text color
                            }}
                        />

                        <textarea
                            placeholder="Details... (Optional)"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                        ></textarea>
                        <div className="actions">
                            <label>
                                🖼️ Photo
                                <input
                                    type="file"
                                    accept="image/*" // Restrict to images only
                                    style={{ display: 'none' }}
                                    onChange={handleMediaUpload}
                                />
                            </label>
                            <button>😊 Feeling/Activity</button>
                        </div>

                        {mediaError && (
                            <p className="error-text">Only image files are allowed!</p>
                        )}

                        {media && (
                            <div className="media-preview">
                                <img
                                    src={URL.createObjectURL(media)}
                                    alt="Preview"
                                    style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px' }}
                                />
                            </div>
                        )}

                        <button className="post-button" onClick={handlePost}>
                            Post
                        </button>
                    </div>

                    {questions.map((question, index) => (
                        <div 
                            key={index} 
                            className="post hoverable" 
                            onClick={() => handleViewDetails(question)}
                        >
                            <h3 className="hoverable-text">{question.title}</h3>
                            <p className="hoverable-text">{question.body}</p>
                            {question.media && (
                                <div className="question-media hoverable">
                                    <img
                                        src={URL.createObjectURL(question.media)}
                                        alt="Posted media"
                                        className="hoverable-media"
                                    />
                                </div>
                            )}
                        </div>
                    ))}

                </main>
            </div>
        </div>
    );
};

export default PageContainer;
