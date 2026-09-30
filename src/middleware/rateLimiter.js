import rateLimit from 'express-rate-limit';

const respondWithApiError = (req, res) => {
  res.status(429).json({ error: { message: 'Too many requests — please try again later.' } });
};

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: respondWithApiError,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: respondWithApiError,
});