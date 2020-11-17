import axios from 'axios';
import jwt_decode from 'jwt-decode';

import history from './history';

const instance = axios.create({
  baseURL: 'http://localhost:3333/',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token && `Bearer ${token}`;

  if (token && isTokenExpired(token)) {
    history.push('/logout');
    localStorage.clear();
    setTimeout(() => {
      history.push('/');
      history.go(0);
    }, 3000);
  }

  return config;
});

const isTokenExpired = (token) => new Date().getTime() > jwt_decode(token).exp * 1000;

export default instance;
