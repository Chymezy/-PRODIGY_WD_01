import { apiService } from './index';
import { ApiResponse } from '../../types/api';

interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

interface TestimonialsResponse {
  items: Testimonial[];
  totalCount: number;
}

export const testimonialService = {
  getAll: async (): Promise<ApiResponse<TestimonialsResponse>> => {
    return apiService.get<TestimonialsResponse>('/testimonials');
  },

  getFeatured: async (): Promise<ApiResponse<TestimonialsResponse>> => {
    return apiService.get<TestimonialsResponse>('/testimonials/featured');
  },

  getByRating: async (minRating: number): Promise<ApiResponse<TestimonialsResponse>> => {
    return apiService.get<TestimonialsResponse>('/testimonials/rating', {
      params: { minRating }
    });
  }
}; 