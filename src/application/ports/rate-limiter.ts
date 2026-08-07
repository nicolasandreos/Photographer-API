export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    retryAfterSeconds: number;
}

export interface IRateLimiter {
    consume(key: string, max: number, windonwSeconds: number): Promise<RateLimitResult>
}