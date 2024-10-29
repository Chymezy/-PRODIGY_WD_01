import { apiService } from './index';
import { ApiResponse } from '../../types/api';

interface NewsletterResponse {
  success: boolean;
  message: string;
}

export const newsletterService = {
  subscribe: async (email: string): Promise<ApiResponse<NewsletterResponse>> => {
    return apiService.post<NewsletterResponse>('/newsletter/subscribe', { email });
  }
}; 