import DOMPurify from 'dompurify';

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
