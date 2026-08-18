export const BULLMQ_PREFIX = "{email}";

export const bullmqConnection = {
    url: process.env.REDIS_URL,
    maxRetriesPerRequest: null as null,
};
