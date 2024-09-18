import axios from 'axios';

export const API_BASE_URL = 'https://se-web-backend-eqa3e3a4gxekhjaq.southeastasia-01.azurewebsites.net';

export const fetchForums = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/forums/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching forums:', error);
    throw error;
  }
};
