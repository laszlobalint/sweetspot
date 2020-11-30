import axios from 'axios';
import jwt_decode from 'jwt-decode';

import history from './history';

const instance = axios.create({
  baseURL: 'http://localhost:3333/',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token && !isTokenExpired(token)) {
    config.headers.Authorization = token && `Bearer ${token}`;
  } else if (token && isTokenExpired(token)) {
    localStorage.clear('token');
    history.push('/logout');
    history.go(0);
  }

  return config;
});

const isTokenExpired = (token) => new Date().getTime() > jwt_decode(token).exp * 1000;

export default instance;
