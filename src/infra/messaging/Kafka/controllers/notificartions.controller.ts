import { SendNotification } from "@application/use-cases/send-notification";
import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

interface SendNotificationPayload{
    content:string
    category:string,
    recipientId:string
}


@Controller()
export class NotificationsController {

    constructor(
        private sendNotificarion: SendNotification
    ){}

    @EventPattern('notifications.send-notification')
    async handleSendNotification(@Payload() {category,content,recipientId}:SendNotificationPayload){
        console.log('teste')
        await this.sendNotificarion.execute({
            content,
            category,
            recipientId
        })
    }
}