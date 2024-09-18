import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api'; // Import API_BASE_URL from api.js

const PostList = () => {
  const { forumId, forumName } = useParams(); // Extract forumId and forumName from URL parameters
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/forums/${forumId}/posts/`); // Use API_BASE_URL
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    getPosts();
  }, [forumId]);

  return (
    <div>
      <h1>Posts from {decodeURIComponent(forumName)}</h1>
      <div className="post-container">
        {posts.map((post) => (
          <div key={post.id} className="post-box">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
