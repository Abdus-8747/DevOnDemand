import React from 'react';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';
import logo1 from '../img/logo3.png';
import logo2 from '../img/logo2.png';
import { useTheme } from '../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <footer className="bg-green-900 dark:bg-black text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src={isDark ? logo1 : logo2}
                alt="DevOnDemand Logo"
                className="h-17 w-14 rounded-full shadow-lg border-collapse border-green-400 dark:border-green-300 bg-white dark:bg-green-900"
              />
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent drop-shadow-lg">
                DevOnDemand
              </span>
            </div>
            <p className="text-green-100 dark:text-green-300 mb-6 max-w-md leading-relaxed">
              Transform your innovative ideas into powerful applications using cutting-edge technologies. 
              From concept to deployment, we bring your vision to life.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-200 hover:text-white hover:scale-110 transition-all duration-300">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-green-200 hover:text-white hover:scale-110 transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-green-200 hover:text-white hover:scale-110 transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-100">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-green-100 dark:text-green-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">About Us</a></li>
              <li><a href="#" className="text-green-100 dark:text-green-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Services</a></li>
              <li><a href="#" className="text-green-100 dark:text-green-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Portfolio</a></li>
              <li><a href="#" className="text-green-100 dark:text-green-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Pricing</a></li>
              <li><a href="#" className="text-green-100 dark:text-green-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">FAQ</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-100">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-green-100 dark:text-green-300 hover:text-white transition-colors duration-300">
                <Mail className="h-4 w-4 text-green-300" />
                <span>devondemand01@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-green-100 dark:text-green-300 hover:text-white transition-colors duration-300">
                <Phone className="h-4 w-4 text-green-300" />
                <span>+91 9265328747</span>
              </div>
              <div className="flex items-center space-x-3 text-green-100 dark:text-green-300 hover:text-white transition-colors duration-300">
                <MapPin className="h-4 w-4 text-green-300" />
                <span>Ahmedabad, India</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-green-800 dark:border-green-700 mt-8 pt-8 text-center">
          <p className="text-green-200 dark:text-green-500">
            © 2025 DevOnDemand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;