import { Module } from '@nestjs/common';
import UploadS3Repository from './infra/repositories/Upload.S3.repository';
import UploadFileSystemRepository from './infra/repositories/Upload.FileSystem.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'UploadRepository',
      useFactory: (uploadRepository: string) => {
        switch (uploadRepository) {
          case 'UploadS3Repository':
            return new UploadS3Repository();
          case 'UploadFileSystemRepository':
          default:
            return new UploadFileSystemRepository();
        }
      },
      inject: [process.env.UPLOAD_REPOSITORY || 'UploadFileSystemRepository'],
    },
  ],
  exports: [],
})
export default class CoreModule {}
