import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api';

const AddPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [forums, setForums] = useState([]);
  const [selectedForumId, setSelectedForumId] = useState('');

  useEffect(() => {
    // Fetch forums to populate the dropdown
    const fetchForums = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/forums/`);
        setForums(response.data);
        if (response.data.length > 0) {
          setSelectedForumId(response.data[0].id);
        }
      } catch (error) {
        console.error('Error fetching forums:', error);
      }
    };

    fetchForums();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/forums/${selectedForumId}/posts/?title=${title}&content=${content}`, {
        title: title,
        content: content,
      });

      navigate(`/forums`);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h1>Add Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Forum:</label>
          <select
            value={selectedForumId}
            onChange={(e) => setSelectedForumId(e.target.value)}
            required
          >
            {forums.map((forum) => (
              <option key={forum.id} value={forum.id}>
                {forum.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
