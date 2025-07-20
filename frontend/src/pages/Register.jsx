import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../utils/api';
import useAuth from '../hooks/useAuth';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const { token, user } = await register({ username, password });
      login(token, user);
      navigate('/chat');
    } catch (err) {
      console.error('Registration error details:', err);
      const message = err.response?.data?.message || err.message || 'Network Error - Backend is not responding';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-4000"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header animation */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="text-5xl animate-bounce-slow">✨</div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">ChatBridge</h1>
          <p className="text-indigo-100">Join the conversation</p>
        </div>

        {/* Main card with glass effect */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 animate-slide-up">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Create Account</h2>

          {/* Error message with animation */}
          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-400/50 rounded-lg text-red-200 text-sm animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            {/* Username input */}
            <div className="relative group">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all duration-300 backdrop-blur-sm group-hover:border-white/30"
                required
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Password input */}
            <div className="relative group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (min 6 chars)"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all duration-300 backdrop-blur-sm group-hover:border-white/30"
                required
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Confirm password input */}
            <div className="relative group">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all duration-300 backdrop-blur-sm group-hover:border-white/30"
                required
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block animate-spin">⏳</span>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 text-white/70">OR</span>
            </div>
          </div>

          {/* Login link */}
          <p className="text-center text-white/80">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-purple-300 hover:text-blue-300 font-semibold transition-colors duration-300 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Bottom decorative text */}
        <p className="text-center text-white/50 text-sm mt-8 animate-fade-in delay-300">
          Your messages, your rules, your community
        </p>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .delay-2000 {
          animation-delay: 2s;
        }

        .delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}