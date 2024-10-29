import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { contactService } from '../services/api/contact';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject is too short'),
  message: z.string().min(20, 'Message is too short'),
  company: z.string().optional()
});

type ContactFormData = z.infer<typeof schema>;

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const response = await contactService.submit(data);
      if (response.data.success) {
        setSubmitSuccess(true);
        reset();
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Contact form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          {t('contact.title')}
        </h2>
        <div className="max-w-2xl mx-auto">
          {submitSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-6 bg-green-100 dark:bg-green-900 rounded-lg"
            >
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
                {t('contact.successTitle')}
              </h3>
              <p className="text-green-700 dark:text-green-300">
                {t('contact.successMessage')}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="text-red-600 dark:text-red-400 text-center p-4">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">
                  {t('contact.form.name')}
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                />
                {errors.name && (
                  <p className="mt-1 text-red-600 dark:text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
                  {t('contact.form.email')}
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                />
                {errors.email && (
                  <p className="mt-1 text-red-600 dark:text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="subject">
                  {t('contact.form.subject')}
                </label>
                <input
                  {...register('subject')}
                  type="text"
                  id="subject"
                  className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                />
                {errors.subject && (
                  <p className="mt-1 text-red-600 dark:text-red-400">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="message">
                  {t('contact.form.message')}
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={5}
                  className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-red-600 dark:text-red-400">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300 disabled:opacity-50"
              >
                {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact; 