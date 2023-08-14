import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigName } from 'src/enums/config-name.enum';

export const RabbitMQModuleConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const config = configService.getOrThrow<RabbitMQConfig>(
      ConfigName.RABBIT_MQ,
    );

    return {
      exchanges: [{ name: 'user', type: 'direct' }],
      uri: config.uri,
    };
  },
};
