import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://urlshortapi.onrender.com'
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default instance;
