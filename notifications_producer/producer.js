import   { Kafka } from "kafkajs";
import  { randomUUID } from 'node:crypto'

async function bootstrap(){
    const kafka = new Kafka({
        clientId:'test-producer',
        brokers: ['grown-hedgehog-8197-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username: 'Z3Jvd24taGVkZ2Vob2ctODE5NyRhOeG1ZJuzOgtjKO0IUuycsAaS-zf5QId2aXM',
          password: 'PX437O_yoeQsZmr8W_RA8BQu4y2xp006PNw0iKEyBTejKi3UIUN9o4PCMOefGq9kYPys8w==',
        },
        ssl: true,
      })

    const producer = kafka.producer()

    await producer.connect()

    await producer.send({
        topic:'notifications.send-notification',
        messages:[
            {
                value:JSON.stringify({
                    content:'Nova solicitacao de amizade!',
                    category:'social',
                    recipientId:randomUUID()
                })
            }
        ]
    })
    await producer.disconnect()
}

for(let i = 0; i <  40; i++){
    console.log(i)
    bootstrap()
}