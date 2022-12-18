import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: [process.env.KAFKA_BROKER],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'Z29vZC1rYW5nYXJvby0xMDk1NyROsJ6GIXMwbJ2vksPwbhcYKHlmDRTIBfTW_M0',
          password: process.env.KAFKA_PASSWORD,
        },
        ssl: true,
      },
    });
  }
  async onModuleDestroy() {
    await this.close();
  }
}
