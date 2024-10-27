import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../contexts/DarkModeContext';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useTranslation } from '../hooks/useTranslation';
import { colors } from '../utils/colors';

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
    <header role="banner">
      {/* Skip to main content link - only visible when focused */}
      <a
        href="#main-content"
        onClick={handleSkipToMain}
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-purple-600"
      >
        {t('accessibility.skipToMain', 'Skip to main content')}
      </a>

      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-white dark:bg-gray-800 shadow-lg' : 'bg-black bg-opacity-30'
        }`}
        role="navigation"
        aria-label={t('accessibility.mainNavigation', 'Main navigation')}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <a 
                href="/" 
                className={`transition-colors duration-300 ${scrolled ? 'text-purple-700 dark:text-purple-300' : 'text-white'}`}
                aria-label={t('accessibility.homeLink', 'NeuraPulse - Return to homepage')}
              >
                NeuraPulse
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex space-x-8" aria-label={t('accessibility.primaryNavigation', 'Primary navigation')}>
                {['home', 'about', 'services', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`hover:text-purple-400 transition-colors duration-300 ${
                      scrolled ? 'text-gray-800 dark:text-gray-200' : 'text-white'
                    }`}
                    aria-current={item === 'home' ? 'page' : undefined}
                  >
                    {t(`navbar.${item}`)}
                  </a>
                ))}
              </nav>

              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-300"
                aria-label={darkMode ? t('accessibility.lightMode', 'Switch to light mode') : t('accessibility.darkMode', 'Switch to dark mode')}
                aria-pressed={darkMode}
              >
                <motion.div
                  animate={{ rotate: darkMode ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {darkMode ? (
                    <HiMoon className="w-5 h-5 text-purple-400" aria-hidden="true" />
                  ) : (
                    <HiSun className="w-5 h-5 text-yellow-500" aria-hidden="true" />
                  )}
                </motion.div>
              </button>

              <select 
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-purple-600"
                aria-label={t('accessibility.languageSelector', 'Select language')}
                value={i18n.language}
              >
                <option value="en">EN</option>
                <option value="es">ES</option>
              </select>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? t('accessibility.closeMenu', 'Close menu') : t('accessibility.openMenu', 'Open menu')}
            >
              <span className="sr-only">
                {mobileMenuOpen ? t('accessibility.closeMenu', 'Close menu') : t('accessibility.openMenu', 'Open menu')}
              </span>
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
          role="region"
          aria-label={t('accessibility.mobileMenu', 'Mobile menu')}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['home', 'about', 'services', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={(e) => handleNavClick(e, item)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-current={item === 'home' ? 'page' : undefined}
              >
                {t(`navbar.${item}`)}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
