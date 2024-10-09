// src/components/Post.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import DOMPurify from 'dompurify';

const Post = () => {
  const { forumId, postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await axios.get(`${API_BASE_URL}/forums/${forumId}/posts/`);
        const postData = postResponse.data.find(p => p.id === parseInt(postId));
        setPost(postData);

        const commentsResponse = await axios.get(`${API_BASE_URL}/forums/${forumId}/posts/${postId}/comments/`);
        setComments(commentsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching post or comments:', error);
        setLoading(false);
      }
    };
    fetchPostAndComments();
  }, [forumId, postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/forums/${forumId}/posts/${postId}/comments/?content=${newComment}`, {
        content: newComment,
      });

      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <>
      <h1>{post.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      
      <div>
        <h2>Comments</h2>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>

        <form onSubmit={handleAddComment}>
          <div>
            <label>Add a comment:</label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </>
  );
};

export default Post;
