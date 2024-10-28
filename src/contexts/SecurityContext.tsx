import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { preventClickjacking } from '../utils/security';

interface SecurityContextType {
  validateContent: (content: string) => boolean;
  isSecureContext: boolean;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const SecurityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Implement security measures on mount
    preventClickjacking();
  }, []);

  const validateContent = (content: string): boolean => {
    // Add your content validation logic here
    return content.length > 0 && content.length < 1000; // Example validation
  };

  const value = {
    validateContent,
    isSecureContext: window.isSecureContext
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = (): SecurityContextType => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
