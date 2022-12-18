import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
    constructor(private prisma: PrismaService) {}

    async create(notification: Notification): Promise<void> {
        await this.prisma.notification.create({
            data: {
                id: notification.id,
                recipientId: notification.recipientId,
                content: notification.content,
                category: notification.category,
            }
        })
    }

}