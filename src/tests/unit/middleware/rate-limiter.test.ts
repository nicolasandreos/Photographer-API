import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import type { Request, Response, NextFunction } from "express";
import { rateLimiterMiddleware } from "../../../api/middleware/rate-limiter";
import { IRateLimiter } from "../../../application/ports/rate-limiter";
import { RedisRateLimitExceededException } from "../../../exceptions/redis";

describe("rateLimiterMiddleware", () => {
  let rateLimiter: IRateLimiter;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let setHeader: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    process.env.REQUEST_RATE_LIMIT_MAX = "5";
    process.env.REQUEST_RATE_LIMIT_WINDOW_SECONDS = "60";

    rateLimiter = {
      consume: vi.fn(),
    };

    setHeader = vi.fn();
    req = { ip: "127.0.0.1" };
    res = { setHeader };
    next = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should call next and set rate limit headers when request is allowed", async () => {
    vi.mocked(rateLimiter.consume).mockResolvedValue({
      allowed: true,
      remaining: 4,
      retryAfterSeconds: 60,
    });

    const middleware = rateLimiterMiddleware(rateLimiter, "login");
    await middleware(req as Request, res as Response, next);

    expect(rateLimiter.consume).toHaveBeenCalledWith("login:127.0.0.1", 5, 60);
    expect(setHeader).toHaveBeenCalledWith("X-RateLimit-Limit", "5");
    expect(setHeader).toHaveBeenCalledWith("X-RateLimit-Remaining", "4");
    expect(setHeader).not.toHaveBeenCalledWith("Retry-After", expect.anything());
    expect(next).toHaveBeenCalledOnce();
  });

  it("should throw RedisRateLimitExceededException when request is not allowed", async () => {
    vi.mocked(rateLimiter.consume).mockResolvedValue({
      allowed: false,
      remaining: -1,
      retryAfterSeconds: 42,
    });

    const middleware = rateLimiterMiddleware(rateLimiter, "login");

    await expect(
      middleware(req as Request, res as Response, next),
    ).rejects.toThrow(RedisRateLimitExceededException);

    expect(setHeader).toHaveBeenCalledWith("X-RateLimit-Limit", "5");
    expect(setHeader).toHaveBeenCalledWith("X-RateLimit-Remaining", "-1");
    expect(setHeader).toHaveBeenCalledWith("Retry-After", "42");
    expect(next).not.toHaveBeenCalled();
  });

  it("should build the redis key from route and request ip", async () => {
    vi.mocked(rateLimiter.consume).mockResolvedValue({
      allowed: true,
      remaining: 3,
      retryAfterSeconds: 50,
    });

    const middleware = rateLimiterMiddleware(rateLimiter, "administrator-login");
    await middleware(req as Request, res as Response, next);

    expect(rateLimiter.consume).toHaveBeenCalledWith(
      "administrator-login:127.0.0.1",
      5,
      60,
    );
  });
});
