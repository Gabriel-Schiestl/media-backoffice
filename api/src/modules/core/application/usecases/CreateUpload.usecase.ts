import { Injectable } from '@nestjs/common';
import { AbstractUseCase } from '../../shared/AbstractUseCase';
import { BusinessException } from '../../domain/exceptions/Business.exception';
import { Res, Result } from '../../shared/Result';
import Image, { ImageProps } from '../../domain/entities/Image';
import Video, { VideoProps } from '../../domain/entities/Video';
import Upload from '../../domain/entities/Upload';
import Url, { UrlProps } from '../../domain/entities/Url';
import type UploadRepository from '../../domain/repositories/UploadRepository';
export interface BaseCreateUploadProps {
  title: string;
  size: number;
  format: string;
  content: Buffer;
  description?: string;
  uploadedBy: string;
}

export interface CreateImageUploadProps extends BaseCreateUploadProps {
  type: 'image';
  altText: string;
}

export interface CreateVideoUploadProps extends BaseCreateUploadProps {
  type: 'video';
  duration: number;
}

export type CreateUploadUseCaseProps =
  | CreateImageUploadProps
  | CreateVideoUploadProps;

export type CreateUploadUseCaseExceptions = BusinessException;

@Injectable()
export default class CreateUploadUseCase extends AbstractUseCase<
  CreateUploadUseCaseProps,
  CreateUploadUseCaseExceptions,
  string
> {
  constructor(private readonly uploadRepository: UploadRepository) {
    super();
  }

  protected async onExecute(
    props: CreateUploadUseCaseProps,
  ): Promise<Result<BusinessException, string>> {
    const mediaResult = this.createMedia(props);
    if (mediaResult.isFailure()) {
      return Res.failure(mediaResult.error);
    }

    const uploadResult = Upload.Create({
      media: mediaResult.value,
      uploadedBy: props.uploadedBy,
    });
    if (uploadResult.isFailure()) {
      return Res.failure(uploadResult.error);
    }

    const saveResult = await this.uploadRepository.save(uploadResult.value);
    if (saveResult.isFailure()) {
      return Res.failure(saveResult.error);
    }

    const url = Url.create({
      url: saveResult.value,
      format: props.format,
      quality: 720,
    });
    if (url.isFailure()) {
      return Res.failure(url.error);
    }

    uploadResult.value.media.applyUrls([url.value]);

    return Res.success(uploadResult.value.id);
  }

  private createMedia(
    props: CreateUploadUseCaseProps,
  ): Result<BusinessException, Image | Video> {
    const baseProps = {
      title: props.title,
      size: props.size,
      format: props.format,
      content: props.content,
      description: props.description,
    };

    switch (props.type) {
      case 'image': {
        return Image.create({
          ...baseProps,
          altText: props.altText,
        } as ImageProps);
      }

      case 'video': {
        return Video.create({
          ...baseProps,
          duration: props.duration,
        } as VideoProps);
      }

      default: {
        return Res.failure(new BusinessException('Invalid media type'));
      }
    }
  }
}
