import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../contexts/DarkModeContext';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white dark:bg-gray-800 shadow-lg' : 'bg-black bg-opacity-30'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">
            <a href="/" className={`transition-colors duration-300 ${scrolled ? 'text-purple-600 dark:text-purple-400' : 'text-white'}`}>NeuraNova</a>
          </div>
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Services', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, item.toLowerCase())}
                  className={`hover:text-purple-400 transition-colors duration-300 ${
                    scrolled ? 'text-gray-800 dark:text-gray-200' : 'text-white'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ rotate: darkMode ? 180 : 0 }}
                transition={{ duration: 0.5 }}
                className={`${darkMode ? 'text-purple-400' : 'text-yellow-500'}`}
              >
                {darkMode ? (
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                ) : (
                  <circle cx="12" cy="12" r="5" />
                )}
                {!darkMode && <line x1="12" y1="1" x2="12" y2="3" />}
                {!darkMode && <line x1="12" y1="21" x2="12" y2="23" />}
                {!darkMode && <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />}
                {!darkMode && <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />}
                {!darkMode && <line x1="1" y1="12" x2="3" y2="12" />}
                {!darkMode && <line x1="21" y1="12" x2="23" y2="12" />}
                {!darkMode && <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />}
                {!darkMode && <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />}
              </motion.svg>
            </button>
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`text-3xl focus:outline-none ${scrolled ? 'text-gray-800 dark:text-gray-200' : 'text-white'}`}
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800">
          {['Home', 'About', 'Services', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, item.toLowerCase())}
              className="block py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
