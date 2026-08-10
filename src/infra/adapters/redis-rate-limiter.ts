import Redis from "ioredis";
import { IRateLimiter, RateLimitResult } from "../../application/ports/rate-limiter";

export class RedisRateLimiter implements IRateLimiter {
    constructor(private readonly redis: Redis) {}

    async consume(key: string, max: number, windowSeconds: number): Promise<RateLimitResult> {
        const count = await this.redis.incr(key);

        if (count === 1) {
            await this.redis.expire(key, windowSeconds);
        }

        const timeLeft = await this.redis.ttl(key);
        const allowed = count <= max
        const remaining = max - count;
        
        return {
            allowed,
            remaining,
            retryAfterSeconds: timeLeft,
        }

    }
}