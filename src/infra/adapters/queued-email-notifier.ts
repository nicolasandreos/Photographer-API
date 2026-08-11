import { ISendNotificationService, sendNotificationProps } from "../../application/ports/email-verification";
import { emailQueue } from "../queue/email-queue";

export class QueuedEmailNotifier implements ISendNotificationService {
    async sendConfirmationEmailNotification(props: sendNotificationProps) {
      await emailQueue.add("send-confirmation-email", props, {
        attempts: 3,
        backoff: { type: "exponential", delay: 2000 },
        removeOnComplete: true,
      });
    }
  
    async sendChangePasswordEmailNotification(props: sendNotificationProps) {
      await emailQueue.add("send-change-password-email", props, {
        attempts: 3,
        backoff: { type: "exponential", delay: 2000 },
        removeOnComplete: true,
      });
    }
  }