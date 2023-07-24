import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { AppService } from 'src/app.service';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads',
      }),
    }),
    DatabaseModule,
  ],
  controllers: [FileUploadController],
  providers: [AppService],
})
export class FileUploadModule {}
