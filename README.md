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
```

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
```



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
# 🖥️ Backend Setup

### 1️⃣ Go to backend folder
```bash
cd backend
```

### 2️⃣ Install backend dependencies
```bash
npm install
```

### 3️⃣ Create `.env` file
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4️⃣ Start backend server
```bash
npm run dev
```
or
```bash
npm start
```

---

# 🎨 Frontend Setup

### 5️⃣ Navigate to the frontend folder
```bash
cd ../frontend
```

### 6️⃣ Install frontend dependencies
```bash
npm install
```

### 7️⃣ Start frontend development server
```bash
npm run dev
```

---

# 🌐 Running the Full App

| Service  | URL |
|----------|-------------------------|
| Backend  | http://localhost:5000   |
| Frontend | http://localhost:5173   |

---

# ⚡ How Real-Time Chat Works

1. User logs in → receives a **JWT token**  
2. Frontend connects to backend using **Socket.IO**  
3. When a user sends a message → `socket.emit()`  
4. Receiver receives message instantly → `socket.on()`  
5. UI updates in real time without refreshing  

---

# 🛡️ Security Features

✔ Passwords encrypted using **bcryptjs**  
✔ JWT-based login authentication  
✔ Protected backend routes  
✔ Environment variables using **.env**  
✔ CORS enabled and configured  

---

# 📸 Screenshots

Create a folder:  
`frontend/public/screenshots/`

Add your images there and link them like this:

```
![Login Page](./frontend/public/screenshots/login.png)
![Chat Window](./frontend/public/screenshots/chat.png)
```

---

# 🚀 Future Improvements

- 📎 File sharing (images / documents)  
- 📝 Message edit & delete  
- 👥 Group chat system  
- 🔔 Push notifications  
- 🌗 Dark / Light theme  
- 🎥 Voice & Video Calling (WebRTC)  

---

# 🤝 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you would like to change.

---

# 📜 License

This project is licensed under the **MIT License**.

---

