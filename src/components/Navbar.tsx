import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../contexts/DarkModeContext';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { t, i18n } = useTranslation();

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

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
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
              {['home', 'about', 'services', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`hover:text-purple-400 transition-colors duration-300 ${
                    scrolled ? 'text-gray-800 dark:text-gray-200' : 'text-white'
                  }`}
                >
                  {t(`navbar.${item}`)}
                </a>
              ))}
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              <motion.div
                animate={{ rotate: darkMode ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {darkMode ? (
                  <HiMoon className="w-5 h-5 text-purple-400" />
                ) : (
                  <HiSun className="w-5 h-5 text-yellow-500" />
                )}
              </motion.div>
            </button>
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`text-3xl focus:outline-none ${scrolled ? 'text-gray-800 dark:text-gray-200' : 'text-white'}`}
              >
                ☰
              </button>
            </div>
            <select onChange={(e) => changeLanguage(e.target.value)} className="bg-transparent">
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800">
          {['home', 'about', 'services', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={(e) => handleNavClick(e, item)}
              className="block py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {t(`navbar.${item}`)}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
