import { apiService } from './index';
import { ApiResponse } from '../../types/api';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQResponse {
  items: FAQItem[];
  totalCount: number;
}

export const faqService = {
  getAll: async (): Promise<ApiResponse<FAQResponse>> => {
    return apiService.get<FAQResponse>('/faq');
  },

  getByCategory: async (category: string): Promise<ApiResponse<FAQResponse>> => {
    return apiService.get<FAQResponse>(`/faq/category/${category}`);
  },

  search: async (query: string): Promise<ApiResponse<FAQResponse>> => {
    return apiService.get<FAQResponse>('/faq/search', { params: { query } });
  }
}; 