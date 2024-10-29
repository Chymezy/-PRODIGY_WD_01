export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface NewsletterSubscription {
  email: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
} 