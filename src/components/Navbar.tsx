import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../contexts/DarkModeContext';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useTranslation } from '../hooks/useTranslation';
import { accessibleColors } from '../utils/accessibilityUtils';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { t } = useTranslation();

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
      // Set focus to the section for accessibility
      element.focus();
      element.setAttribute('tabindex', '-1');
    }
  };

  // Add skip link for keyboard users
  const handleSkipToMain = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white dark:bg-gray-800 shadow-lg' : 'bg-black bg-opacity-30'
      }`}
      aria-label="Site navigation"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">
            <a 
              href="/" 
              className={`transition-colors duration-300 ${
                scrolled 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-100'
              }`}
            >
              NeuraPulse
            </a>
          </div>
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'services', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`transition-colors duration-300 ${
                    scrolled 
                      ? 'text-gray-900 hover:text-purple-800 dark:text-white dark:hover:text-purple-300' 
                      : 'text-gray-100 hover:text-white'
                  }`}
                >
                  {t(`navbar.${item}`)}
                </a>
              ))}
            </div>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${accessibleColors.button.secondary.base} ${accessibleColors.button.secondary.dark} focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-300`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <motion.div
                animate={{ rotate: darkMode ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {darkMode ? (
                  <HiMoon className={`w-5 h-5 ${accessibleColors.text.accent.dark}`} />
                ) : (
                  <HiSun className="w-5 h-5 text-yellow-500" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
