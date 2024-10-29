import { apiService } from './index';
import { ApiResponse } from '../../types/api';

interface UserPreferences {
  darkMode: boolean;
  language: string;
  fontSize: 'small' | 'medium' | 'large';
  animations: boolean;
  notifications: boolean;
}

interface PreferencesResponse {
  preferences: UserPreferences;
  lastUpdated: string;
}

export const preferencesService = {
  get: async (): Promise<ApiResponse<PreferencesResponse>> => {
    return apiService.get<PreferencesResponse>('/preferences');
  },

  update: async (preferences: Partial<UserPreferences>): Promise<ApiResponse<PreferencesResponse>> => {
    return apiService.post<PreferencesResponse>('/preferences', preferences);
  },

  reset: async (): Promise<ApiResponse<PreferencesResponse>> => {
    return apiService.post<PreferencesResponse>('/preferences/reset');
  }
}; 