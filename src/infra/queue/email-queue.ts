import { Queue } from "bullmq";
import { bullmqConnection } from "./queue-connection";

export const emailQueue = new Queue("email", {
    connection: bullmqConnection
});