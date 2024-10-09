import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import Quill from 'quill';

import 'quill/dist/quill.snow.css'; 

const AddPost = ({ username }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [forums, setForums] = useState([]);
  const [selectedForumId, setSelectedForumId] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
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

  useEffect(() => {
    const quill = new Quill(editorRef.current, {
      theme: 'snow', // Theme
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
          ['clean']
        ]
      }
    });

    quill.on('text-change', () => {
      setEditorContent(quill.root.innerHTML);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Username of the poster: ${username}`);
    try {
      await axios.post(`${API_BASE_URL}/forums/${selectedForumId}/posts/?title=${title}&content=${editorContent}&username=${username}`);

      navigate(`/forums`);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <>
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
          <div ref={editorRef} style={{ height: '200px' }} /> {/* Quill editor */}
        </div>
        <button type="submit">Add Post</button>
      </form>
    </>
  );
};

export default AddPost;

