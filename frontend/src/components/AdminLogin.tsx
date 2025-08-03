// components/AdminLogin.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === import.meta.env.VITE_ADMIN_EMAIL && password === import.meta.env.VITE_ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
      setError('');
    } else {
      setError('Invalid credentials. Try again.');
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-black dark:to-green-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 space-y-6 border dark:border-zinc-800">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-green-900 dark:text-green-200">
          Admin Login
        </h2>
        <p className="text-center text-green-600 dark:text-green-400 text-sm">
          Access the Admin Panel
        </p>

        {/* Form */}
        <div className="space-y-5">
          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-600 transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition"
          >
            Login
          </button>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
