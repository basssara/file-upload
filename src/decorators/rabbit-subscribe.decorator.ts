import { applyDecorators } from '@nestjs/common';
import { RabbitSubscribe as BaseRabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Channel, ConsumeMessage } from 'amqplib';

export function RabbitSubscribe(event: string) {
  const token = `store-${event}`;

  return applyDecorators(
    BaseRabbitSubscribe({
      exchange: 'user',
      routingKey: [event, token],
      queue: token,
      queueOptions: { autoDelete: false },
      errorHandler: function (
        channel: Channel,
        msg: ConsumeMessage,
        error: unknown,
      ) {
        channel.publish('ems_errors', '', msg.content);
        channel.ack(msg);
      },
    }),
  );
}
