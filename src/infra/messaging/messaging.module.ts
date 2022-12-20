import { SendNotification } from "@application/use-cases/send-notification";
import { DatabaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common"
import { NotificationsController } from "./Kafka/controllers/notificartions.controller";
import { KafkaConsumerService } from "./Kafka/kafka-consumer.service";


@Module({
    imports:[DatabaseModule],
    providers:[KafkaConsumerService, SendNotification],
    controllers:[NotificationsController]
})

export class MessagingModule{}