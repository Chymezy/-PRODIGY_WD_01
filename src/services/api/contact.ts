import { apiService } from './index';
import { ApiResponse } from '../../types/api';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
}

interface ContactResponse {
  success: boolean;
  messageId: string;
  timestamp: string;
}

export const contactService = {
  submit: async (data: ContactFormData): Promise<ApiResponse<ContactResponse>> => {
    return apiService.post<ContactResponse>('/contact', data);
  },

  getStatus: async (messageId: string): Promise<ApiResponse<ContactResponse>> => {
    return apiService.get<ContactResponse>(`/contact/status/${messageId}`);
  }
}; 