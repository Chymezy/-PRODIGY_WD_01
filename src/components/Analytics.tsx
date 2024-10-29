import React, { useEffect, useCallback } from 'react';
import { analyticsService } from '../services/api/analytics';

interface AnalyticsProps {
  children: React.ReactNode;
}

const Analytics: React.FC<AnalyticsProps> = ({ children }) => {
  const trackPageView = useCallback(async () => {
    try {
      await analyticsService.trackPageView(window.location.pathname);
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }, []);

  const handleClick = useCallback(async (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target && ['button', 'a', 'input', 'select'].includes(target.tagName.toLowerCase())) {
      try {
        await analyticsService.trackUserInteraction(
          target.id || target.className,
          'click'
        );
      } catch (error) {
        console.error('Failed to track click interaction:', error);
      }
    }
  }, []);

  const handleSubmit = useCallback(async (event: SubmitEvent) => {
    const form = event.target as HTMLFormElement;
    try {
      await analyticsService.trackUserInteraction(
        form.id || form.className,
        'submit'
      );
    } catch (error) {
      console.error('Failed to track form submission:', error);
    }
  }, []);

  useEffect(() => {
    // Track initial page view
    trackPageView();

    // Add interaction listeners
    document.addEventListener('click', handleClick);
    document.addEventListener('submit', handleSubmit);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('submit', handleSubmit);
    };
  }, [trackPageView, handleClick, handleSubmit]);

  return <>{children}</>;
};

export default Analytics; 