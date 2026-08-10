import { Request, Response, NextFunction } from "express";
import { IRateLimiter } from "../../application/ports/rate-limiter";
import { RedisRateLimitExceededException } from "../../exceptions/redis";

export const rateLimiterMiddleware = (rateLimiter: IRateLimiter, route: string) => {
    const maxRequest = Number(process.env.REQUEST_RATE_LIMIT_MAX) ?? 5;
    const windowSeconds = Number(process.env.REQUEST_RATE_LIMIT_WINDOW_SECONDS) ?? 60;

    return async (req: Request, res: Response, next: NextFunction) => {
        const ip = req.ip;
        const key = `${route}:${ip}`;

        const result = await rateLimiter.consume(key, maxRequest, windowSeconds);

        res.setHeader('X-RateLimit-Limit', maxRequest.toString());
        res.setHeader('X-RateLimit-Remaining', result.remaining.toString());
        
        if (!result.allowed) {
            res.setHeader('Retry-After', result.retryAfterSeconds.toString());
            throw new RedisRateLimitExceededException(result.retryAfterSeconds);
        }

        next();
    }
}