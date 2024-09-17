import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const fetchForums = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/forums/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching forums:', error);
    throw error;
  }
};
