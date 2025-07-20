import { io } from 'socket.io-client';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
let socket = null;
export function connectSocket(userId) {
  socket = io(API, { transports: ['websocket'] });
  socket.on('connect', () => socket.emit('user_connected', userId));
  return socket;
}
export function getSocket() { return socket; }
export function disconnectSocket() { if (socket) socket.disconnect(); socket = null; }