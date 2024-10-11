import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import UsePreventZoom from './UsePreventZoom'
import './Forum.css'

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
      <div className='forum-container'>
        <div className='content'>
          <header>
            <h1>All Posts</h1>
            <button style={{marginLeft: "auto", borderRadius: "20px", height: "40px", border: "0px", width: "100px", marginTop: "auto"}}>
              <Link to="/add-post">Add Post</Link>
            </button>
          </header>
          <section className="questions">
            {posts.map((post) => (
              <div key={post.id} className="question">
                <h2>
                  <Link to={`/forums/${post.forum_id}/posts/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                <p>Post created by {post.username}</p>
              </div>
            ))}
          </section>
        </div>
      </div>

    </>
  );
};

export default Forum;
