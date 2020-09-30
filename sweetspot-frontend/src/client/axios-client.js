import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3333/',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default instance;
