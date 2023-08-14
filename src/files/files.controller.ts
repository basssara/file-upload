import {
  Controller,
  Post,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  Param,
  UseInterceptors,
  Get,
  Delete,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('user/:id/avatar')
  @UseInterceptors(FileInterceptor('file', { storage: fileStorage }))
  create(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.filesService.create(id, file);
  }

  @Get('user/:userId/avatar')
  getAvatar(@Param('userId') id: string) {
    return this.filesService.getAvatar(id);
  }

  @Delete('user/:fileId/avatar')
  removeAvatar(@Param('fileId') id: string) {
    return this.filesService.removeAvatar(id);
  }
}
