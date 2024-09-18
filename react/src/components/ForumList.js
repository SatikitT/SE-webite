import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchForums } from '../api';

const ForumList = () => {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    const getForums = async () => {
      try {
        const data = await fetchForums();
        setForums(data);
      } catch (error) {
        console.error('Error fetching forums:', error);
      }
    };
    getForums();
  }, []);

  return (
    <div>
      <h1>Forums</h1>
      <ul>
        {forums.map((forum) => (
          <li key={forum.id}>
            {/* Encode the forum name to handle special characters in the URL */}
            <Link to={`/forums/${forum.id}/posts/${encodeURIComponent(forum.name)}`}>
              {forum.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForumList;
