import React from 'react';

interface AccessibilityWrapperProps {
  children: React.ReactNode;
}

const AccessibilityWrapper: React.FC<AccessibilityWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-purple-700"
      >
        Skip to main content
      </a>

      <header>
        {/* Navbar will be rendered here by App.tsx */}
      </header>

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
};

export default AccessibilityWrapper;
