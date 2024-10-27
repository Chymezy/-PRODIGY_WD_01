import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { validateEmail } from '../utils/security';

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .refine(validateEmail, { message: "Invalid email format" })
});

type NewsletterFormData = z.infer<typeof schema>;

interface NewsletterSignupProps {
  onSubmit?: (email: string) => void;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewsletterFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmitForm = async (data: NewsletterFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data.email);
      }
      reset();
    } catch (error) {
      console.error('Newsletter signup failed:', error);
    }
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
        {errors.email && (
          <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto px-6 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors duration-300"
      >
        Subscribe
      </button>
    </form>
  );
};

export default NewsletterSignup;
