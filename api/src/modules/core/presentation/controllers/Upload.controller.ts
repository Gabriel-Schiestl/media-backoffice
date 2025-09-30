import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import CreateUploadUseCase, {
  CreateUploadUseCaseProps,
  CreateImageUploadProps,
  CreateVideoUploadProps,
} from '../../application/usecases/CreateUpload.usecase';
import { UrlProps } from '../../domain/entities/Url';

export interface CreateUploadBaseDto {
  title: string;
  description?: string;
  uploadedBy: string;
  urls: UrlProps[];
}

export interface CreateImageUploadDto extends CreateUploadBaseDto {
  type: 'image';
  altText: string;
}

export interface CreateVideoUploadDto extends CreateUploadBaseDto {
  type: 'video';
  duration: number;
}

export type CreateUploadDto = CreateImageUploadDto | CreateVideoUploadDto;

@Controller('uploads')
export class UploadController {
  constructor(private readonly createUploadUseCase: CreateUploadUseCase) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateUploadDto,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const mediaType = this.detectMediaType(file, dto.type);

    const useCaseProps = this.mapDtoToUseCaseProps(dto, file, mediaType);

    const result = await this.createUploadUseCase.execute(useCaseProps);

    if (result.isFailure()) {
      throw new BadRequestException(result.error.message);
    }

    return {
      success: true,
      uploadId: result.value,
    };
  }

  private detectMediaType(
    file: Express.Multer.File,
    specifiedType?: string,
  ): 'image' | 'video' {
    if (specifiedType === 'image' || specifiedType === 'video') {
      return specifiedType;
    }

    if (file.mimetype.startsWith('image/')) {
      return 'image';
    }

    if (file.mimetype.startsWith('video/')) {
      return 'video';
    }

    throw new BadRequestException(
      'Unsupported file type. Only images and videos are allowed.',
    );
  }

  private mapDtoToUseCaseProps(
    dto: CreateUploadDto,
    file: Express.Multer.File,
    mediaType: 'image' | 'video',
  ): CreateUploadUseCaseProps {
    const baseProps = {
      title: dto.title,
      size: file.size,
      format: file.mimetype,
      content: file.buffer,
      description: dto.description,
      uploadedBy: dto.uploadedBy,
      urls: dto.urls,
    };

    switch (mediaType) {
      case 'image':
        return {
          ...baseProps,
          type: 'image',
          altText: (dto as CreateImageUploadDto).altText,
        } as CreateImageUploadProps;

      case 'video':
        return {
          ...baseProps,
          type: 'video',
          duration: (dto as CreateVideoUploadDto).duration,
        } as CreateVideoUploadProps;

      default:
        throw new BadRequestException('Invalid media type');
    }
  }
}
