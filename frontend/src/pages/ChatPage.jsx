import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { connectSocket, disconnectSocket, getSocket } from '../utils/socket';
import { getUsers, fetchMessages, postMessage } from '../utils/api';
import ChatSidebar from '../components/ChatSidebar';
import ChatWindow from '../components/ChatWindow';

export default function ChatPage() {
  const { user, token, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!user || !token) return;
    socketRef.current = connectSocket(user.id);
    socketRef.current.on('receive_message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });
    return () => disconnectSocket();
  }, [user, token]);

  useEffect(() => {
    if (!token) return;
    (async ()=>{
      const list = await getUsers(token);
      setUsers(list.filter(u=>u._id !== user.id));
    })();
  }, [token]);

  useEffect(() => {
    if (!token) return;
    (async ()=>{
      const msgs = await fetchMessages(token, selectedUser ? selectedUser._id : null);
      setMessages(msgs);
    })();
  }, [selectedUser, token]);

  const send = async (text) => {
    if (!text.trim()) return;
    try {
      const saved = await postMessage(token, { text, to: selectedUser?._id || null });
      const payload = { ...saved, from: { _id: saved.from._id, username: saved.from.username } };
      setMessages(prev => [...prev, payload]);
      const socket = getSocket();
      socket?.emit('send_message', { from: user.id, to: selectedUser?._id || null, text, _id: saved._id, createdAt: saved.createdAt });
    } catch (err) { console.error(err); }
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(prev => prev.filter(m => m._id !== messageId));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500">
        <div className="max-w-xl w-full p-8 rounded-2xl glass shadow-xl text-center">
          <div className="text-6xl">💬</div>
          <h2 className="text-3xl font-bold text-slate-900 mt-4">Welcome to ChatBridge</h2>
          <p className="text-slate-700 mt-2">Connect with friends, collaborate instantly, and keep your conversations flowing.</p>

          <blockquote className="mt-6 italic text-slate-700 bg-white/5 p-4 rounded-lg border border-white/10">
            “Conversations are the bridges we build — come back anytime to continue yours.”
          </blockquote>

          <div className="mt-6 flex items-center justify-center gap-4">
            <Link to="/login" className="px-6 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:scale-105 transition">Login</Link>
            <Link to="/register" className="px-6 py-2 border border-indigo-200 text-indigo-700 rounded-lg bg-white/30 hover:bg-white/40 transition">Register</Link>
          </div>

          <div className="mt-4 text-xs text-slate-500">You were logged out or not signed in — sign in to view your chats.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <ChatSidebar users={users} me={user} onSelect={setSelectedUser} selected={selectedUser} onLogout={logout} />
      <ChatWindow messages={messages} me={user} onSend={send} selectedUser={selectedUser} onDeleteMessage={handleDeleteMessage} />
    </div>
  );
}