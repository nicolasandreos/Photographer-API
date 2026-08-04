export interface sendNotificationProps {
    to: string
    subject: string
    text: string
    token: string
    photographerName: string
}

export interface ISendNotificationService {
    sendNotification(props: sendNotificationProps): Promise<void>;
}