import { rateLimit } from 'express-rate-limit'

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again in 15 minutes.'
});

export default rateLimiter;