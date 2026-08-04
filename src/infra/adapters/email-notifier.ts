import { Resend } from "resend";
import { ISendNotificationService, sendNotificationProps } from "../../application/ports/email-verification";

export class EmailNotificationAdapter implements ISendNotificationService {

    private readonly resend: Resend;

    constructor() {
        this.resend = new Resend(process.env.RESEND_API_KEY);
    }

    sendNotification = async ({ to, subject, text }: sendNotificationProps): Promise<void> => {
        const { data, error } = await this.resend.emails.send({
            from: "onboarding@resend.dev",
            to,
            subject,
            text,
        })

        if (error) {
            throw new Error(`Failed to send email: ${error.message}`);
        } else {
            console.log("Email sent successfully:", data);
        }
    }
}