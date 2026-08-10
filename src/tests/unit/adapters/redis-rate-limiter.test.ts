import { describe, it, expect, beforeEach, vi } from "vitest";
import type Redis from "ioredis";
import { RedisRateLimiter } from "../../../infra/adapters/redis-rate-limiter";

describe("RedisRateLimiter", () => {
  let redis: {
    incr: ReturnType<typeof vi.fn>;
    expire: ReturnType<typeof vi.fn>;
    ttl: ReturnType<typeof vi.fn>;
  };
  let rateLimiter: RedisRateLimiter;

  beforeEach(() => {
    redis = {
      incr: vi.fn(),
      expire: vi.fn(),
      ttl: vi.fn(),
    };
    rateLimiter = new RedisRateLimiter(redis as unknown as Redis);
  });

  it("should set expire on the first request and allow when under the limit", async () => {
    redis.incr.mockResolvedValue(1);
    redis.expire.mockResolvedValue(1);
    redis.ttl.mockResolvedValue(60);

    const result = await rateLimiter.consume("login:127.0.0.1", 5, 60);

    expect(redis.incr).toHaveBeenCalledWith("login:127.0.0.1");
    expect(redis.expire).toHaveBeenCalledWith("login:127.0.0.1", 60);
    expect(redis.ttl).toHaveBeenCalledWith("login:127.0.0.1");
    expect(result).toEqual({
      allowed: true,
      remaining: 4,
      retryAfterSeconds: 60,
    });
  });

  it("should not set expire on subsequent requests", async () => {
    redis.incr.mockResolvedValue(2);
    redis.ttl.mockResolvedValue(55);

    const result = await rateLimiter.consume("login:127.0.0.1", 5, 60);

    expect(redis.expire).not.toHaveBeenCalled();
    expect(result).toEqual({
      allowed: true,
      remaining: 3,
      retryAfterSeconds: 55,
    });
  });

  it("should allow the request when count equals max", async () => {
    redis.incr.mockResolvedValue(5);
    redis.ttl.mockResolvedValue(40);

    const result = await rateLimiter.consume("login:127.0.0.1", 5, 60);

    expect(result).toEqual({
      allowed: true,
      remaining: 0,
      retryAfterSeconds: 40,
    });
  });

  it("should deny the request when count exceeds max", async () => {
    redis.incr.mockResolvedValue(6);
    redis.ttl.mockResolvedValue(30);

    const result = await rateLimiter.consume("login:127.0.0.1", 5, 60);

    expect(redis.expire).not.toHaveBeenCalled();
    expect(result).toEqual({
      allowed: false,
      remaining: -1,
      retryAfterSeconds: 30,
    });
  });
});
