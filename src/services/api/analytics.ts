import { apiService } from './index';
import { ApiResponse } from '../../types/api';

interface EventData {
  eventName: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp?: string;
}

interface AnalyticsResponse {
  success: boolean;
  eventId: string;
}

export const analyticsService = {
  trackEvent: async (data: EventData): Promise<ApiResponse<AnalyticsResponse>> => {
    return apiService.post<AnalyticsResponse>('/analytics/event', {
      ...data,
      timestamp: data.timestamp || new Date().toISOString()
    });
  },

  trackPageView: async (path: string): Promise<ApiResponse<AnalyticsResponse>> => {
    return apiService.post<AnalyticsResponse>('/analytics/pageview', {
      path,
      timestamp: new Date().toISOString()
    });
  },

  trackUserInteraction: async (elementId: string, action: string): Promise<ApiResponse<AnalyticsResponse>> => {
    return apiService.post<AnalyticsResponse>('/analytics/interaction', {
      elementId,
      action,
      timestamp: new Date().toISOString()
    });
  }
}; 