import React, { useState } from 'react';
import { deleteMessage } from '../utils/api';

export default function MessageBubble({ message, me, onDelete }) {
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fromId = message.from?._id || message.from?.id || message.from;
  const isMe = fromId === me.id || fromId === me._id;

  const handleDelete = async () => {
    if (!window.confirm('Delete this message?')) return;
    setDeleting(true);
    try {
      await deleteMessage(localStorage.getItem('token'), message._id);
      onDelete?.(message._id);
      setShowDelete(false);
    } catch (err) {
      console.error('Failed to delete message:', err);
      alert('Failed to delete message');
    } finally {
      setDeleting(false);
    }
  };

  // Generate avatar with gradients
  const getAvatar = () => {
    const username = message.from?.username || 'U';
    const gradients = [
      'from-blue-400 to-cyan-400',
      'from-purple-400 to-pink-400',
      'from-orange-400 to-red-400',
      'from-green-400 to-teal-400',
      'from-yellow-400 to-orange-400'
    ];
    const hash = username.charCodeAt(0) % gradients.length;
    return { initials: username[0].toUpperCase(), gradient: gradients[hash] };
  };

  const avatar = getAvatar();

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (message.isDeleted) {
    return (
      <div className={`flex gap-3 mb-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
        <div className="max-w-xs">
          <div className="px-4 py-2 rounded-xl bg-slate-200 text-slate-400 italic text-sm">
            This message was deleted
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex gap-3 mb-4 group ${isMe ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      {!isMe && (
        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${avatar.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm`}>
          {avatar.initials}
        </div>
      )}

      <div className={`max-w-xs ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
        {!isMe && (
          <div className="text-xs font-semibold text-slate-600 mb-1">
            {message.from?.username || 'Unknown'}
          </div>
        )}
        
        <div className="flex items-end gap-2">
          <div
            className={`px-4 py-2 rounded-2xl break-words ${
              isMe
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none'
                : 'bg-slate-200 text-slate-900 rounded-bl-none'
            } shadow-sm`}
          >
            {message.text}
          </div>

          {isMe && showDelete && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="p-1 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
              title="Delete message"
            >
              {deleting ? '⏳' : '🗑️'}
            </button>
          )}
        </div>

        <div className={`text-xs text-slate-400 mt-1 ${isMe ? 'text-right' : 'text-left'}`}>
          {formatTime(message.createdAt)}
        </div>
      </div>

      {isMe && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm">
          {avatar.initials}
        </div>
      )}
    </div>
  );
}