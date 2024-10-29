import axios from 'axios';
import { ApiResponse, ApiError } from '../../types/api';

interface SanitizedData {
  [key: string]: any;
}

class ApiService {
  private api;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true // For receiving secure cookies from backend
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - Frontend specific security
    this.api.interceptors.request.use(
      (config: any) => {
        // Get CSRF token from meta tag (provided by backend)
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        
        if (csrfToken && config.headers) {
          // Add CSRF token to headers - Backend will validate this
          config.headers['X-CSRF-Token'] = csrfToken;
        }

        // Sanitize request data (frontend specific)
        if (config.data && typeof config.data === 'object') {
          config.data = this.sanitizeData(config.data);
        }

        return config;
      },
      (error: any) => {
        return Promise.reject(this.handleError(error));
      }
    );

    // Response interceptor - Frontend specific handling
    this.api.interceptors.response.use(
      (response: any) => {
        // Only update CSRF if backend provides a new one
        const newCsrfToken = response.headers['x-csrf-token'];
        if (newCsrfToken) {
          const metaTag = document.querySelector('meta[name="csrf-token"]');
          if (metaTag) {
            metaTag.setAttribute('content', newCsrfToken);
          }
        }

        // Sanitize response data (frontend specific)
        if (response.data) {
          response.data = this.sanitizeData(response.data);
        }

        return response;
      },
      (error: any) => {
        // Frontend specific error handling
        if (error.response?.status === 419) { // CSRF token mismatch
          window.location.reload(); // Get fresh CSRF token
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  // Frontend specific data sanitization with proper typing
  private sanitizeData(data: any): any {
    if (typeof data !== 'object') return data;

    const sanitized: SanitizedData = Array.isArray(data) ? [] : {};
    
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        // Basic XSS prevention for displayed data
        sanitized[key] = value
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;')
          .replace(/\//g, '&#x2F;');
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeData(value);
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }

  private handleError(error: any): ApiError {
    // Frontend specific error handling
    return {
      message: this.sanitizeData(error.response?.data?.message) || 'An unexpected error occurred',
      status: error.response?.status || 500,
      code: error.code
    };
  }

  public async get<T>(url: string, config?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.get<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async post<T>(
    url: string, 
    data?: unknown, 
    config?: any
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.post<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

export const apiService = new ApiService();