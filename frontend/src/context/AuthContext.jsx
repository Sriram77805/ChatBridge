import React, { createContext, useState, useEffect } from 'react';
import { getMe } from '../utils/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const me = await getMe(token);
        setUser(me);
        localStorage.setItem('user', JSON.stringify(me));
      } catch (err) {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally { setLoading(false); }
    };
    init();
  }, [token]);

  const login = (tokenValue, userObj) => {
    localStorage.setItem('token', tokenValue);
    localStorage.setItem('user', JSON.stringify(userObj));
    setToken(tokenValue);
    setUser(userObj);
  };
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}