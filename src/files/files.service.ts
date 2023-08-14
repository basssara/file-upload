import { Injectable, NotFoundException } from '@nestjs/common';
import { Avatar } from './schema/file.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
@Injectable()
export class FilesService {
  constructor(@InjectModel(Avatar.name) private avatarModel: Model<Avatar>) {}

  async create(id: string, file: Express.Multer.File): Promise<Avatar> {
    const createdAvatar = new this.avatarModel({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: id,
    });
    return createdAvatar.save();
  }

  async getAvatar(id: string): Promise<Avatar> {
    const data = await this.avatarModel.findOne({ user: id });

    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  async removeAvatar(id: string): Promise<Avatar> {
    const data = await this.avatarModel.findById(id);
    const link = `${process.env.PATH_FOR_UNLINK}/${data.filename}`;

    if (!data) {
      throw new NotFoundException();
    }

    fs.unlink(link, (err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });

    return await this.avatarModel.findByIdAndRemove(id);
  }
}
