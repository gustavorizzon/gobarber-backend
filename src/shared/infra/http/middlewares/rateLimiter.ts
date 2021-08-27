import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';

import cacheConfig from '@config/cache';
import AppError from '@shared/errors/AppError';

const storeClient = new Redis(cacheConfig.config.redis);

const limiter = new RateLimiterRedis({
  storeClient,
  keyPrefix: 'rate-limit',
  points: 5,
  duration: 1,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError('Too many requests', 429);
  }
}
