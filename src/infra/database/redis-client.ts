import Redis from "ioredis";
import { RedisConnectionError } from "../../exceptions/redis";

let redis: Redis | null = null;

export const getRedisClient = () => {
    
    if (!redis) {
        const url = process.env.REDIS_URL;
        if (!url) {
            throw new RedisConnectionError();
        }
        redis = new Redis(url, {
            maxRetriesPerRequest: 3,
            lazyConnect: true,
        });
    }
    
    return redis;
}