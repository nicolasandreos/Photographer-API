import { describe, it, expect } from "vitest";
import {
  RedisConnectionError,
  RedisRateLimitExceededException,
} from "../../../exceptions/redis";

describe("Redis exceptions", () => {
  it("should create RedisConnectionError with status 500", () => {
    const error = new RedisConnectionError();

    expect(error).toBeInstanceOf(Error);
    expect(error.details).toBe("Failed to connect to Redis");
    expect(error.statusCode).toBe(500);
  });

  it("should create RedisRateLimitExceededException with retry after message", () => {
    const error = new RedisRateLimitExceededException(30);

    expect(error.details).toBe("Rate limit exceeded. Retry after 30 seconds.");
    expect(error.statusCode).toBe(429);
  });

  it("should create RedisRateLimitExceededException without retry after", () => {
    const error = new RedisRateLimitExceededException();

    expect(error.details).toBe("Rate limit exceeded.");
    expect(error.statusCode).toBe(429);
  });
});
