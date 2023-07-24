import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AppService } from 'src/app.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('files')
export class FileUploadController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './uploads',
      //   storage: diskStorage({
      //     destination: (req, file, cb) => {
      //       console.log(file);
      //       console.log(req);

      //       cb(null, './uploads');
      //     },
      //   }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.appService.handleFileUpload(file);
  }

  @Post('upload-bulk')
  @UseGuards(AuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);

    return this.appService.handleBulkUpload(files);
  }

  @Get(':uuid')
  @UseGuards(AuthGuard)
  async serveFile(
    @Param('uuid') uuid: string,
    @Res() res: Response,
  ): Promise<void> {
    return this.appService.getFile(uuid, res);
  }
}
