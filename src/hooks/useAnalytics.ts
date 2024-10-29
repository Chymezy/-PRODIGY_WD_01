import { useCallback } from 'react';
import { analyticsService } from '../services/api/analytics';

export const useAnalytics = () => {
  const trackEvent = useCallback(async (
    category: string,
    action: string,
    label?: string,
    value?: number
  ) => {
    try {
      await analyticsService.trackEvent({
        eventName: `${category}_${action}`,
        category,
        action,
        label,
        value
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }, []);

  const trackInteraction = useCallback(async (elementId: string, action: string) => {
    try {
      await analyticsService.trackUserInteraction(elementId, action);
    } catch (error) {
      console.error('Failed to track interaction:', error);
    }
  }, []);

  return {
    trackEvent,
    trackInteraction
  };
}; 