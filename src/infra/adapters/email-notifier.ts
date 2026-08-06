import { createElement } from "react";
import { Resend } from "resend";
import {
  ISendNotificationService,
  sendNotificationProps,
} from "../../application/ports/email-verification";
import PendingConfirmationEmail from "../templates/pending-email-confirmation";
import ChangePasswordEmail from "../templates/change-password-email";

export class EmailNotificationAdapter implements ISendNotificationService {
  private readonly resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  sendConfirmationEmailNotification = async ({
    to,
    subject,
    text,
    token,
    photographerName,
  }: sendNotificationProps): Promise<void> => {
    const { data, error } = await this.resend.emails.send({
      from: "Photos AI <onboarding@resend.dev>",
      to,
      subject,
      text,
      react: createElement(PendingConfirmationEmail, { token, photographerName }),
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log("Email sent successfully:", data);
  };

  sendChangePasswordEmailNotification = async ({
    to,
    subject,
    text,
    token,
    photographerName,
  }: sendNotificationProps): Promise<void> => {
    const { data, error } = await this.resend.emails.send({
      from: "Photos AI <onboarding@resend.dev>",
      to,
      subject,
      text,
      react: createElement(ChangePasswordEmail, { token, photographerName }),
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log("Email sent successfully:", data);
  };

}
