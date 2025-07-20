import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

console.log('API URL:', API);

// Create axios instance with config
const axiosInstance = axios.create({
  baseURL: API,
  timeout: 60000, // Increased to 60 seconds to wait for DB connection
  headers: {
    'Content-Type': 'application/json'
  }
});

export function setAuthHeader(token) {
  axiosInstance.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : undefined;
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : undefined;
}

export async function register(body) { 
  const res = await axiosInstance.post(`/api/auth/register`, body); 
  return res.data; 
}

export async function loginAPI(body) { 
  const res = await axiosInstance.post(`/api/auth/login`, body); 
  return res.data; 
}

export async function getUsers(token) { 
  setAuthHeader(token); 
  const res = await axiosInstance.get(`/api/auth/users`); 
  return res.data; 
}

export async function getMe(token) { 
  setAuthHeader(token); 
  const res = await axiosInstance.get(`/api/auth/me`).catch(()=>null); 
  return res?.data || JSON.parse(localStorage.getItem('user')) || null; 
}

export async function fetchMessages(token, withUser) { 
  setAuthHeader(token); 
  const url = `/api/messages${withUser ? `?withUser=${withUser}` : ''}`; 
  const res = await axiosInstance.get(url); 
  return res.data; 
}

export async function postMessage(token, payload) { 
  setAuthHeader(token); 
  const res = await axiosInstance.post(`/api/messages`, payload); 
  return res.data; 
}

export async function deleteMessage(token, messageId) { 
  setAuthHeader(token); 
  const res = await axiosInstance.delete(`/api/messages/${messageId}`); 
  return res.data; 
}