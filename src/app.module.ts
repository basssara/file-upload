import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from './files/files.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQModuleConfig } from './config/rabbitmq-module.config';
import { rabbitMQConfig } from './config/rabbitmq.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [rabbitMQConfig] }),
    MongooseModule.forRoot(process.env.DB_PORT),
    RabbitMQModule.forRootAsync(RabbitMQModule, RabbitMQModuleConfig),
    UsersModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
