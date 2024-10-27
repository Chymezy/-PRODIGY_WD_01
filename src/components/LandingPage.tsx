import React, { useEffect, useState, memo } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../hooks/useTranslation';
import Footer from './Footer';
import LazyImage from './LazyImage';
import ErrorBoundary from './ErrorBoundary';
import applicationBg from '../assets/application-bg.jpg'; // Import the image
import revolutionizeImage from '../assets/revolutionize-business.webp'; // Import the image
import { logEvent } from '../services/analytics';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold">{question}</span>
        <span className="text-2xl">{isOpen ? '−' : '+'}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-gray-600"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type NewsletterFormData = z.infer<typeof schema>;

interface NewsletterSignupProps {
  onSubmit?: (email: string) => void;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewsletterFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmitForm = (data: NewsletterFormData) => {
    if (onSubmit) {
      onSubmit(data.email);
    }
    logEvent('Newsletter', 'Signup', data.email);
    console.log('Newsletter signup:', data.email);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="mt-8 sm:flex">
      <div className="w-full sm:max-w-xs">
        <input
          type="email"
          {...register('email')}
          placeholder="Enter your email"
          className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
          aria-label="Email for newsletter"
        />
        {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <button
        type="submit"
        className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300"
      >
        Subscribe
      </button>
    </form>
  );
};

// Memoize child components for performance
const MemoizedFAQItem = memo(FAQItem);
const MemoizedNewsletterSignup = memo(NewsletterSignup);

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const trackEvent = (category: string, action: string, label?: string) => {
    logEvent(category, action, label);
  };

  return (
    <div className="pt-16">
      <ErrorBoundary>
        <section id="home" className="relative bg-gradient-to-r from-purple-600 to-indigo-800 text-white py-16 md:py-32 overflow-hidden" role="banner">
          <div className="absolute inset-0 z-0">
            <img
              src={applicationBg} // Use the imported image
              alt="AI Technology Background"
              className="object-cover w-full h-full opacity-30"
            />
          </div>
          <motion.div 
            className="container mx-auto px-6 text-center relative z-10"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-5xl font-bold mb-4">{t('hero.title')}</h1>
            <p className="text-xl mb-8">{t('hero.subtitle')}</p>
            <motion.button 
              className="bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-100 transition-colors duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.cta')}
            </motion.button>
            <p className="mt-4 text-sm">{t('hero.offer')}</p>
          </motion.div>
        </section>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <section id="about" className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800" role="region" aria-label="About NeuraNova">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">{t('about.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-5xl mb-4 text-purple-600 dark:text-purple-400">📈</div>
                <h3 className="text-xl font-semibold mb-2">{t('about.boostRevenue.title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('about.boostRevenue.description')}</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4 text-purple-600">⏱️</div>
                <h3 className="text-xl font-semibold mb-2">{t('about.saveTime.title')}</h3>
                <p className="text-gray-600">{t('about.saveTime.description')}</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4 text-purple-600">🚀</div>
                <h3 className="text-xl font-semibold mb-2">{t('about.scaleFaster.title')}</h3>
                <p className="text-gray-600">{t('about.scaleFaster.description')}</p>
              </div>
            </div>
          </div>
        </section>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <section id="services" className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">Our Cutting-Edge AI Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Predictive Analytics', icon: '🔮', description: 'Forecast trends and make proactive decisions' },
                { name: 'Natural Language Processing', icon: '💬', description: 'Understand and leverage customer sentiment' },
                { name: 'Computer Vision', icon: '👁️', description: 'Gain insights from images and video data' }
              ].map((service) => (
                <div key={service.name} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">{service.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <section id="testimonials" className="py-20 bg-purple-100 dark:bg-purple-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <p className="text-gray-600 dark:text-gray-300 mb-4">"NeuraNova transformed our business. We've seen a 50% increase in customer retention and a 40% boost in sales."</p>
                <p className="font-semibold text-gray-800 dark:text-white">- John Doe, CEO of TechCorp</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <p className="text-gray-600 dark:text-gray-300 mb-4">"The AI-driven insights we've gained have been game-changing. Our productivity has skyrocketed!"</p>
                <p className="font-semibold text-gray-800 dark:text-white">- Jane Smith, CTO of InnovateCo</p>
              </div>
            </div>
          </div>
        </section>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <section id="contact" className="py-20 bg-gradient-to-r from-purple-600 to-indigo-800 text-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 flex flex-col justify-center mb-8 md:mb-0">
                <h2 className="text-4xl font-bold mb-8">Ready to Revolutionize Your Business?</h2>
                <p className="text-xl mb-8">Join the AI revolution and stay ahead of your competition. Contact us now!</p>
                <button 
                  className="bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-100 transition-colors duration-300 shadow-lg self-start"
                  onClick={() => {
                    trackEvent('CTA', 'Click', 'Schedule Consultation');
                    alert('Thank you for your interest! Our team will contact you shortly to schedule your free consultation.');
                  }}
                >
                  Schedule Your Free Consultation
                </button>
                <p className="mt-4">Or reach us at: <a href="mailto:info@neuranova.com" className="underline">info@neuranova.com</a></p>
              </div>
              <div className="w-full md:w-1/2 md:pl-8 flex justify-center items-center">
                <div className="w-full" style={{ maxWidth: '300px' }}>
                  <img 
                    src={revolutionizeImage} 
                    alt="Revolutionize Your Business with AI" 
                    className="w-full h-auto object-contain rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <section id="clients" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Trusted by Industry Leaders</h2>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {[
                { name: 'Google', svg: 'M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z' },
                { name: 'Microsoft', svg: 'M3 3h4v4H3V3zm0 5h4v4H3V8zm5 0h4v4H8V8zm5 0h4v4h-4V8zm0-5h4v4H8V3zm-5 0h4v4H8V3zm5 10h4v4h-4v-4zm-5 0h4v4H8v-4zm-5 0h4v4H3v-4z' },
                { name: 'Amazon', svg: 'M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z' },
                { name: 'Apple', svg: 'M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z' },
                { name: 'Facebook', svg: 'M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z' },
              ].map((company) => (
                <motion.div
                  key={company.name}
                  className="w-32 h-16 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-full h-full text-gray-600"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={company.svg} />
                  </svg>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <section id="faq" className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <MemoizedFAQItem 
                question="What is AI-powered analytics?" 
                answer="AI-powered analytics uses artificial intelligence and machine learning algorithms to analyze large datasets, identify patterns, and generate insights that would be difficult or impossible for humans to discover on their own."
              />
              <MemoizedFAQItem 
                question="How can NeuraNova benefit my business?" 
                answer="NeuraNova can help your business make data-driven decisions, predict future trends, optimize operations, and gain a competitive edge in your industry."
              />
              <MemoizedFAQItem 
                question="Is my data safe with NeuraNova?" 
                answer="Yes, we take data security very seriously. We use state-of-the-art encryption and security measures to protect your data, and we comply with all relevant data protection regulations."
              />
            </div>
          </div>
        </section>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <section id="newsletter" className="py-20 bg-gray-100 dark:bg-gray-800" role="region" aria-label="Newsletter Signup">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Stay Updated with NeuraNova</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Subscribe to our newsletter for the latest AI insights and updates.</p>
            <NewsletterSignup onSubmit={(email) => {
              console.log(`Submitted email: ${email}`);
              // Here you would typically send the email to your backend API
            }} />
          </div>
        </section>
      </ErrorBoundary>

      <Footer />
    </div>
  );
};

export default LandingPage;
