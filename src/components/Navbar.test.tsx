import React from 'react';

const Navbar: React.FC = () => {
  // ... (previous state and handlers)

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white dark:bg-gray-800 shadow-lg' : 'bg-black bg-opacity-30'
      }`}
      aria-label="Main navigation"
    >
      {/* ... rest of navbar content ... */}
    </nav>
  );
};

export default Navbar;
