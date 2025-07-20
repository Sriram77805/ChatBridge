import React, { useRef, useEffect, useState } from 'react';
import MessageBubble from './MessageBubble';

export default function ChatWindow({ messages, me, onSend, selectedUser, onDeleteMessage }) {
  const endRef = useRef();
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(()=> endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
    setIsTyping(false);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  // Chat bubble pattern background
  const chatBgStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='chat-pattern' x='0' y='0' width='200' height='200' patternUnits='userSpaceOnUse'%3E%3Ctext x='20' y='40' font-size='24' fill='%23f0f0f0' opacity='0.05'%3E💬%3C/text%3E%3Ctext x='100' y='80' font-size='20' fill='%23f0f0f0' opacity='0.05'%3E📱%3C/text%3E%3Ctext x='150' y='150' font-size='22' fill='%23f0f0f0' opacity='0.05'%3E💭%3C/text%3E%3Ctext x='50' y='160' font-size='18' fill='%23f0f0f0' opacity='0.05'%3E✉️%3C/text%3E%3C/pattern%3E%3C/defs%3E%3Crect width='200' height='200' fill='%23ffffff'/%3E%3Crect width='200' height='200' fill='url(%23chat-pattern)'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
    backgroundSize: '200px 200px',
    backgroundColor: '#f8f9fa'
  };

  return (
    <main className="flex-1 flex flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-slate-900">
              {selectedUser ? selectedUser.username : '# General'}
            </div>
            <div className="text-sm text-slate-500">
              {selectedUser ? 'Private conversation' : 'Public channel • Everyone can see'}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {selectedUser?.isOnline && (
              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-green-700">Active</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent" style={chatBgStyle}>
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-slate-500 text-lg">No messages yet</p>
              <p className="text-slate-400 text-sm">Be the first to start the conversation!</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((m, i) => (
              <MessageBubble key={m._id || i} message={m} me={me} onDelete={onDeleteMessage} />
            ))}
            <div ref={endRef} />
          </>
        )}
      </div>

      {/* Input area */}
      <div className="p-6 bg-white border-t border-slate-200 shadow-lg">
        <form onSubmit={submit} className="flex items-end gap-4">
          <div className="flex-1 relative">
            <textarea
              value={text}
              onChange={handleInputChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  submit(e);
                }
              }}
              placeholder="Type a message... (Shift+Enter for new line)"
              rows="1"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 resize-none transition-all duration-200 bg-slate-50"
            />
            {isTyping && (
              <div className="absolute right-3 top-3 text-slate-400">✏️</div>
            )}
          </div>
          <button
            type="submit"
            disabled={!text.trim()}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            📤 Send
          </button>
        </form>
        <div className="text-xs text-slate-400 mt-2">Press Enter to send • Shift+Enter for new line</div>
      </div>
    </main>
  );
}