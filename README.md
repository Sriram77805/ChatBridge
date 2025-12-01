# 🗨️ ChatBridge – Real-Time MERN Chat Application

ChatBridge is a **full-stack real-time chat application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** with **Socket.IO** for live messaging.  
The app supports **user authentication, channels, direct messages, typing indicators, online status**, and a beautiful **modern UI with TailwindCSS**.

---

## 🚀 Features

### 🔐 Authentication
- Register & Login (JWT-based)
- Password hashing (bcryptjs)
- Protected API routes
- Login using Email or Username

### 💬 Real-Time Chat (Socket.IO)
- Public channels (like **#General**)
- Private one-to-one messages
- Typing indicator
- Online/offline status
- Instant message delivery

### 👥 User System
- User profile
- Contact search
- Online users list
- Direct messages

### 🎨 Modern UI (React + Tailwind)
- Beautiful gradient design
- Responsive layout
- Smooth UI interactions

### 🛠️ Backend (Node.js)
- Express REST API
- MongoDB + Mongoose models
- JWT authentication middleware
- Morgan logging
- Multer setup for file uploads

---

## 📁 Project Structure
ChatBridge/
│
├── backend/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ ├── package.json
│ └── .env
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ ├── tailwind.config.js
│ └── postcss.config.js
│
└── README.md



---

## 🧪 Tech Stack

### **Frontend**
- React 19  
- React Router DOM  
- TailwindCSS  
- Vite  
- Socket.IO Client  

### **Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Socket.IO  
- JWT  
- bcryptjs  
- Multer  
- Morgan  

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository
```sh
git clone https://github.com/YOUR_USERNAME/chatbridge.git
cd chatbridge

