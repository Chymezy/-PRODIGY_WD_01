import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middleware/error.middleware';
import { apiKeyAuth } from './middleware/auth.middleware';
import { routes } from './routes';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));

// Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Authentication middleware for /api routes
app.use('/api', apiKeyAuth);

// Mount routes - Note the path change here
app.use('/api', routes);  // Changed from '/api/v1' to '/api'

// Error handling
app.use(errorHandler);

export default app; 