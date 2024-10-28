import DOMPurify from 'dompurify';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, SAFE_DOMAINS } from './securityConstants';

// Sanitize user input
export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // Only allow text
    ALLOWED_ATTR: []
  });
};

// Validate email format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && !/<[^>]*>/.test(email); // Prevent HTML injection
};

// Encode HTML entities
export const encodeHTML = (str: string): string => {
  return str.replace(/[&<>"']/g, (match) => {
    const entities: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return entities[match];
  });
};

export const generateCSRFToken = (): string => {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
};

export const rateLimit = (() => {
  const requests = new Map<string, number[]>();
  const limit = 100; // requests
  const timeWindow = 3600000; // 1 hour in milliseconds

  return (clientId: string): boolean => {
    const now = Date.now();
    const clientRequests = requests.get(clientId) || [];
    const recentRequests = clientRequests.filter(time => now - time < timeWindow);
    
    if (recentRequests.length >= limit) {
      return false; // Rate limit exceeded
    }

    recentRequests.push(now);
    requests.set(clientId, recentRequests);
    return true;
  };
})();

// Validate file uploads (for future use)
export const validateFile = (file: File): boolean => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    console.error('Invalid file type');
    return false;
  }
  if (file.size > MAX_FILE_SIZE) {
    console.error('File too large');
    return false;
  }
  return true;
};

// Validate URLs
export const validateUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return SAFE_DOMAINS.includes(parsedUrl.hostname);
  } catch {
    return false;
  }
};

// Prevent clickjacking
export const preventClickjacking = (): void => {
  if (window.self !== window.top && window.top) {
    window.top.location = window.self.location;
  }
};

// Sanitize and encode data for display
export const sanitizeForDisplay = (content: string): string => {
  const sanitized = DOMPurify.sanitize(content);
  return encodeHTML(sanitized);
};

// Validate form data
export const validateFormData = (data: Record<string, unknown>): boolean => {
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /data:/gi,
    /vbscript:/gi,
    /onload=/gi,
    /onerror=/gi
  ];

  const stringData = JSON.stringify(data);
  return !suspiciousPatterns.some(pattern => pattern.test(stringData));
};

// Generate nonce for inline scripts (if needed)
export const generateNonce = (): string => {
  return Math.random().toString(36).substring(2, 15);
};
