import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../api';
import DOMPurify from 'dompurify';
import EditableMedia from '../../components/editableimage/EditableImage';
import './PostDetail.css';

const PostDetail = () => {
    const { title } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [commentsLoading, setCommentsLoading] = useState(false);

    // Fetch the post data
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postResponse = await axios.get(`${API_BASE_URL}/forums/1/posts/`);
                const postData = postResponse.data.find((p) => p.title === title);
                setPost(postData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
                setLoading(false);
            }
        };

        fetchPost();
    }, [title]);

    // Fetch the comments only when post data is available
    useEffect(() => {
        if (post?.id) {
            const fetchComments = async () => {
                setCommentsLoading(true);
                try {
                    const commentsResponse = await axios.get(`${API_BASE_URL}/forums/1/posts/${post.id}/comments/`);
                    setComments(commentsResponse.data);
                } catch (error) {
                    console.error('Error fetching comments:', error);
                } finally {
                    setCommentsLoading(false);
                }
            };

            fetchComments();
        }
    }, [post]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/forums/1/posts/${post.id}/comments/?content=${newComment}`, {
                content: newComment,
            });

            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    if (loading) {
        return <div>Loading post...</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    // Sanitize post content for safe rendering
    const sanitizedContent = DOMPurify.sanitize(post.content);

    return (
        <div className="Detail-container">
            <div className="question-detail">
                <p className="posted-by">Posted by u/{post.username}</p>
                <h1>{post.title}</h1>
                <div className='question-body' dangerouslySetInnerHTML={{ __html: sanitizedContent }} />

                {post.title && <EditableMedia mediaTag={post.title} />}

                <div>
                    <h2>Comments</h2>
                    {commentsLoading ? (
                        <p>Loading comments...</p>
                    ) : (
                        <ul className="comments-section">
                            {comments.map((comment) => (
                                <li key={comment.id} className="comment">
                                    {comment.content}
                                </li>
                            ))}
                        </ul>
                    )}

                    <form onSubmit={handleAddComment} className="add-comment-form">
                        <label htmlFor="newComment">Add a comment:</label>
                        <textarea
                            id="newComment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            required
                            placeholder="Write your comment here..."
                        />
                        <button type="submit" className="add-comment-button">
                            Add Comment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
