import React, { useState } from 'react';
import { Settings, Sun, Moon, Send, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logo1 from '../img/logo3.png';
import logo2 from '../img/logo2.png';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItemClass = (path: string) =>
    `flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
      location.pathname === path
        ? 'text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/30'
        : 'text-green-900 dark:text-green-200 hover:text-black dark:hover:text-white hover:bg-green-50 dark:hover:bg-green-900'
    }`;

  return (
    <header className="bg-white/80 dark:bg-black/90 backdrop-blur-md shadow-sm border-b border-green-100 dark:border-green-900 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/">
            <img
              src={isDark ? logo1 : logo2}
              alt="DevOnDemand Logo"
              className="h-17 w-14 rounded-full shadow-lg border-collapse border-green-400 dark:border-green-300 bg-white dark:bg-green-900"
            /> </Link>
             <Link to="/">
            <span 
            className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-green-600 to-green-400 dark:from-green-300 dark:to-green-500 bg-clip-text text-transparent">
              DevOnDemand
            </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4">
            <button onClick={() => navigate('/')} className={navItemClass('/')}>Home</button>
            <button onClick={() => navigate('/submit')} className={navItemClass('/submit')}>
              <Send className="h-4 w-4" />
              <span>Submit Project</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-green-900 dark:text-green-200 hover:text-black dark:hover:text-white hover:bg-green-50 dark:hover:bg-green-900 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5 animate-bounce-slow" /> : <Moon className="h-5 w-5 animate-bounce-slow" />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-green-900 dark:text-green-200 hover:text-black dark:hover:text-white hover:bg-green-50 dark:hover:bg-green-900 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5 animate-bounce-slow" /> : <Moon className="h-5 w-5 animate-bounce-slow" />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-green-900 dark:text-green-200 hover:text-black dark:hover:text-white hover:bg-green-50 dark:hover:bg-green-900 rounded-lg transition-all duration-300"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            <button onClick={() => { navigate('/'); setMenuOpen(false); }} className={navItemClass('/')}>Home</button>
            <button onClick={() => { navigate('/submit'); setMenuOpen(false); }} className={navItemClass('/submit')}>
              <Send className="h-4 w-4" />
              <span>Submit Project</span>
            </button>
            <button onClick={() => { navigate('/admin'); setMenuOpen(false); }} className={navItemClass('/admin')}>
              <Settings className="h-4 w-4" />
              <span>Admin</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
