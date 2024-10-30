import React from 'react';
import LazyImage from '../components/LazyImage';
import ErrorBoundary from '../components/ErrorBoundary';
import Contact from '../components/Contact';
import { useAnalytics } from '../hooks/useAnalytics';
import { imageService } from '../services/api/image';

const ProductPage: React.FC = () => {
  const { trackEvent } = useAnalytics();

  // Only create new components specific to this page
  // Reuse all the existing components and services

  return (
    <div>
      <ErrorBoundary>
        {/* New product-specific content */}
        <section>
          <h1>Product Details</h1>
          <LazyImage src="product.jpg" alt="Product" />
        </section>
      </ErrorBoundary>

      {/* Reuse existing components */}
      <Contact />
    </div>
  );
}; 