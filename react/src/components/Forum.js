import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [forums, setForums] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const forumsResponse = await axios.get(`${API_BASE_URL}/forums/`);
        setForums(forumsResponse.data);

        let allPosts = [];
        for (const forum of forumsResponse.data) {
          const forumPostsResponse = await axios.get(`${API_BASE_URL}/forums/${forum.id}/posts/`);
          allPosts = [...allPosts, ...forumPostsResponse.data];
        }
        setPosts(allPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    getPosts();
  }, []);

  return (
    <>
      <div style={{ height: "5em" }}></div>
      <h2>All Posts</h2>
      <button>
        <Link to="/add-post">Add Post</Link>
      </button>
      <div className="post-container">
        {posts.map((post) => (
          <div key={post.id} className="post-box">
            <h2>
              <Link to={`/forums/${post.forum_id}/posts/${post.id}`}>
                {post.title}
              </Link>
            </h2>
            <p>{post.content}</p>
            <p>Post created by {post.username}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Forum;
