import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './PostDetail.css';
import SideNav from './component/side-nav/side-nav.js';

const QuestionDetail = () => {
    const { questionTitle } = useParams();
    const location = useLocation();

    // Retrieve question data from location.state or set a fallback for direct access
    const [question, setQuestion] = useState(
        location.state?.question || {
            title: questionTitle,
            body: 'This is the default body text since the question was accessed directly.',
            media: null, // Updated to support media
            username: 'example_user'
        }
    );

    const [comments, setComments] = useState([
        { username: 'comment_user1', text: 'This is a sample comment on the post. The comment area can also have multiple lines.' },
        { username: 'comment_user2', text: 'Another comment to show how comments are structured.' }
    ]);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, { username: 'current_user', text: newComment }]);
            setNewComment('');
        }
    };

    return (
        <div className="Detail-container">
            <SideNav/>
            <div className="question-detail">
                <p className="posted-by">Posted by u/{question.username}</p>
                <h1>{question.title}</h1>
                <p className="question-body">{question.body}</p>

                {question.media && (
                    <div className="media-preview">
                        {question.media.type.startsWith('image') && (
                            <img
                                src={URL.createObjectURL(question.media)}
                                alt="Question Media"
                                style={{ maxWidth: '100%', maxHeight: '300px' }}
                            />
                        )}
                        {question.media.type.startsWith('video') && (
                            <video
                                controls
                                style={{ maxWidth: '100%', maxHeight: '300px' }}
                            >
                                <source src={URL.createObjectURL(question.media)} type={question.media.type} />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                )}

                <h2>Comments</h2>

                <div className="add-comment">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                    ></textarea>
                    <button onClick={handleAddComment} className="add-comment-button">Add Comment</button>
                </div>

                <div className="comments-section">
                    {comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <p className="comment-username">u/{comment.username}</p>
                            <p className="comment-text">{comment.text}</p>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default QuestionDetail;
