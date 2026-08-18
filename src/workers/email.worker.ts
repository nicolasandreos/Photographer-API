import { Job, Worker } from "bullmq";
import { EmailNotificationAdapter } from "../infra/adapters/email-notifier";
import { BULLMQ_PREFIX, bullmqConnection } from "../infra/queue/queue-connection";
import { config } from "dotenv";

config({ path: ".env" });
config({ path: ".env.development" });

const emailSender = new EmailNotificationAdapter();

const worker = new Worker("email",
    async (job: Job) => {
        if (job.name === "send-confirmation-email") {
            await emailSender.sendConfirmationEmailNotification(job.data);
            return;
        }

        if (job.name === "send-change-password-email") {
            await emailSender.sendChangePasswordEmailNotification(job.data);
            return;
        }

        throw new Error(`Unknown job name: ${job.name}`);
    },
    { connection: bullmqConnection, prefix: BULLMQ_PREFIX }
);

worker.on("completed", (job) => console.log(`Email job ${job.id} done`));
worker.on("failed", (job, err) => console.error(`Email job ${job?.id} failed`, err));