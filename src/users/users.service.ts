import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.shcema';
import { Model } from 'mongoose';
import { RabbitSubscribe } from 'src/decorators/rabbit-subscribe.decorator';
import { UserType } from 'src/types/user.type';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  @RabbitSubscribe(UserType.CREATED)
  create(data: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(data);
    return createdUser.save();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }
}
