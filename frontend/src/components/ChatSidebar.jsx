import React, { useState } from 'react';

const formatLastSeen = (date) => {
  const now = new Date();
  const lastSeen = new Date(date);
  const diffMs = now - lastSeen;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return lastSeen.toLocaleDateString();
};

const getAvatar = (username) => {
  return (username || 'U')[0].toUpperCase();
};

export default function ChatSidebar({ users, me, onSelect, selected, onLogout }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="w-96 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700 flex flex-col h-screen text-white">
      {/* Header with profile */}
      <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-indigo-600/20 to-purple-600/20">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {getAvatar(me.username)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-white truncate">{me.username}</div>
            <div className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Online
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors duration-200 text-red-400 hover:text-red-300"
            title="Logout"
          >
            🚪
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-slate-700 transition-all duration-200"
          />
          <span className="absolute right-3 top-2.5 text-slate-400">🔍</span>
        </div>
      </div>

      {/* Contacts list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {/* General channel */}
        <div className="p-4 space-y-2">
          <div className="text-xs text-slate-400 font-semibold uppercase px-2 mb-3">Channels</div>
          <div
            onClick={() => onSelect(null)}
            className={`p-3 rounded-xl cursor-pointer transition-all duration-200 flex items-center gap-3 ${
              !selected?._id
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg'
                : 'hover:bg-slate-700/50'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-lg font-bold">
              #
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white">General</div>
              <div className="text-xs text-slate-400">Public channel</div>
            </div>
          </div>
        </div>

        {/* Users section */}
        {filteredUsers.length > 0 && (
          <div className="p-4 space-y-2">
            <div className="text-xs text-slate-400 font-semibold uppercase px-2 mb-3">
              Direct Messages ({filteredUsers.length})
            </div>
            {filteredUsers.map((u) => (
              <div
                key={u._id}
                onClick={() => onSelect(u)}
                className={`p-3 rounded-xl cursor-pointer transition-all duration-200 flex items-center gap-3 group ${
                  selected?._id === u._id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg'
                    : 'hover:bg-slate-700/50'
                }`}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {getAvatar(u.username)}
                  </div>
                  {u.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-800"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white truncate">{u.username}</div>
                  <div className="text-xs text-slate-400">{formatLastSeen(u.lastSeen)}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {searchQuery && filteredUsers.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            <div className="text-3xl mb-2">🔍</div>
            <p className="text-sm">No contacts found</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700 text-xs text-slate-500 text-center">
        ChatBridge v1.0
      </div>
    </aside>
  );
}