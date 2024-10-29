import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { testimonialService } from '../services/api/testimonials';
import LazyImage from './LazyImage';

interface TestimonialProps {
  author: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({
  author,
  role,
  company,
  content,
  rating,
  avatar
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
  >
    <div className="flex items-center mb-4">
      {avatar && (
        <div className="mr-4">
          <LazyImage
            src={avatar}
            alt={author}
            className="w-12 h-12 rounded-full"
            aria-hidden={true}
          />
        </div>
      )}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{author}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{role} at {company}</p>
      </div>
    </div>
    <div className="mb-4">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`text-${index < rating ? 'yellow' : 'gray'}-400`}
        >
          ★
        </span>
      ))}
    </div>
    <p className="text-gray-700 dark:text-gray-200">{content}</p>
  </motion.div>
);

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState<TestimonialProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        const response = await testimonialService.getFeatured();
        setTestimonials(response.data.items);
      } catch (err) {
        setError('Failed to load testimonials');
        console.error('Error loading testimonials:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mr-4"></div>
              <div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              </div>
            </div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AnimatePresence>
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.author} {...testimonial} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Testimonials; 