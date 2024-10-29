import { apiService } from './index';
import { ApiResponse } from '../../types/api';

interface ImageOptimizationParams {
  url: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

interface ImageResponse {
  url: string;
  width: number;
  height: number;
  format: string;
}

export const imageService = {
  optimize: async (params: ImageOptimizationParams): Promise<ApiResponse<ImageResponse>> => {
    return apiService.get<ImageResponse>('/image/optimize', { params });
  },

  preload: async (url: string): Promise<void> => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  }
}; 