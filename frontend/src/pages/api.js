import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const signup = async (data) => {
  try {
    const response = await api.post('/signup', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};