// src/components/PostList.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostList = () => {
  const { forumId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/forums/${forumId}/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    getPosts();
  }, [forumId]);

  return (
    <div>
      <h1>Posts in Forum</h1>
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
