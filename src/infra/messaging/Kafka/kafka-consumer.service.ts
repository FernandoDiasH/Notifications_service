import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";


@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy{
    
    constructor(){
        super({
            client:{
                clientId:'notifications',
                brokers: ['grown-hedgehog-8197-us1-kafka.upstash.io:9092'],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username: 'Z3Jvd24taGVkZ2Vob2ctODE5NyRhOeG1ZJuzOgtjKO0IUuycsAaS-zf5QId2aXM',
                    password: 'PX437O_yoeQsZmr8W_RA8BQu4y2xp006PNw0iKEyBTejKi3UIUN9o4PCMOefGq9kYPys8w==',
                 },
                ssl: true,
            }
        })
    }
    async onModuleDestroy() {
        await this.close()
    }

}