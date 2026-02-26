require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');


const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');


const app = express();
const server = http.createServer(app);

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://chat-bridge-orpin.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);


const PORT = process.env.PORT || 5000;


// Socket.io setup
const io = new Server(server, {
cors: { origin: '*', methods: ['GET','POST'] }
});


// Map userId -> socketId
const onlineUsers = new Map();


io.on('connection', (socket) => {
console.log('Socket connected:', socket.id);


socket.on('user_connected', (userId) => {
onlineUsers.set(userId, socket.id);
io.emit('online_users', Array.from(onlineUsers.keys()));
});


socket.on('send_message', (payload) => {
const { to } = payload;
if (to) {
const toSocket = onlineUsers.get(to);
if (toSocket) io.to(toSocket).emit('receive_message', payload);
} else {
// For public messages (to === null) broadcast to all OTHER sockets
// so the sender doesn't receive the message twice (sender already
// appends the message locally after saving to DB).
socket.broadcast.emit('receive_message', payload);
}
});


socket.on('disconnect', () => {
for (let [userId, sId] of onlineUsers.entries()) {
if (sId === socket.id) {
onlineUsers.delete(userId);
break;
}
}
io.emit('online_users', Array.from(onlineUsers.keys()));
});
});


// MongoDB connection with proper error handling
let mongoConnected = false;

mongoose.connect(process.env.MONGO_URI, { 
  connectTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000,
})
.then(() => {
  mongoConnected = true;
  console.log('MongoDB connected successfully');
})
.catch(err => {
  mongoConnected = false;
  console.error('MongoDB connection error:', err.message);
});

// Monitor connection events
mongoose.connection.on('connected', () => {
  mongoConnected = true;
  console.log('MongoDB connection established');
});

mongoose.connection.on('disconnected', () => {
  mongoConnected = false;
  console.error('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  mongoConnected = false;
  console.error('MongoDB error:', err.message);
});

// Add middleware to check DB connection
app.use((req, res, next) => {
  if (!mongoConnected && !req.path.includes('/health')) {
    return res.status(503).json({ message: 'Database connection not available' });
  }
  next();
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});