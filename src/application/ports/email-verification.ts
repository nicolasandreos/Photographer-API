export interface sendNotificationProps {
    to: string
    subject: string
    text: string
    token: string
    photographerName: string
}

export interface ISendNotificationService {
    sendConfirmationEmailNotification(props: sendNotificationProps): Promise<void>;
    sendChangePasswordEmailNotification(props: sendNotificationProps): Promise<void>;
}