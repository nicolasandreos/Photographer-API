import { Queue } from "bullmq";
import { BULLMQ_PREFIX, bullmqConnection } from "./queue-connection";

export const emailQueue = new Queue("email", {
    connection: bullmqConnection,
    prefix: BULLMQ_PREFIX,
});