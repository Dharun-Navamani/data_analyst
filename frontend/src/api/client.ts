import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.MODE === 'development' ? 'http://localhost:8000' : '');

const apiClient = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
  },
});

// We can add interceptors here later to attach JWT tokens
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default apiClient;
