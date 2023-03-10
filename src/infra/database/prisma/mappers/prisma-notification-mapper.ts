import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { Notification as rawNotification } from "@prisma/client";

export class PrismaNotificationMapper{
    static toPrisma(notification : Notification){
        return {
            id: notification.id,
            content: notification.content.value,
            category: notification.category,
            recipientId: notification.recipientId,
            readAt: notification.readAt,
            canceledAt:notification.canceledAt,
            createdAt: notification.createdAt,
          }
    }

    static toDomain(raw:rawNotification): Notification{
        return new Notification({
            category: raw.category,
            content: new Content(raw.content),
            recipientId: raw.recipientId,
            readAt: raw.readAt,
            createdAt: raw.createdAt,
            canceledAt: raw.canceledAt
        }, raw.id)
    }
}
