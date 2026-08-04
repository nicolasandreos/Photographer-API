export interface sendNotificationProps {
    to: string
    subject: string
    text: string
}

export interface ISendNotificationService {
    sendNotification(props: sendNotificationProps): Promise<void>;
}