import { BaseApiException } from "./base-exception";

export class RedisConnectionError extends BaseApiException {
  constructor() {
    super("Failed to connect to Redis", 500);
  }
}

export class RedisRateLimitExceededException extends BaseApiException {
  constructor(retryAfterSeconds?: number) {
    super(
      retryAfterSeconds
        ? `Rate limit exceeded. Retry after ${retryAfterSeconds} seconds.`
        : "Rate limit exceeded.",
      429,
    );
  }
}
