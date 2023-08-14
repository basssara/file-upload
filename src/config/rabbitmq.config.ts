import { registerAs } from '@nestjs/config';
import { ConfigName } from 'src/enums/config-name.enum';

export interface RabbitMQConfigInterface {
  uri: string;
}

export const rabbitMQConfig = registerAs(
  ConfigName.RABBIT_MQ,
  (): RabbitMQConfigInterface => ({
    uri: String(process.env.RABBITMQ_URI),
  }),
);
