import { Injectable } from '@nestjs/common';
import { AbstractUseCase } from '../../shared/AbstractUseCase';
import { BusinessException } from '../../domain/exceptions/Business.exception';
import { Res, Result } from '../../shared/Result';

export interface MediaProps {
  title: string;
  size: number;
  format: string;
  content: Express.Multer.File;
  description?: string;
}

export interface ImageProps extends MediaProps {
  altText: string;
}

export interface VideoProps extends MediaProps {
  duration: number;
}

export type CreateUploadUseCaseProps = ImageProps | VideoProps;

export type CreateUploadUseCaseExceptions = BusinessException;

@Injectable()
export default class CreateUploadUseCase extends AbstractUseCase<
  CreateUploadUseCaseProps,
  CreateUploadUseCaseExceptions,
  string
> {
  protected async onExecute(
    props: CreateUploadUseCaseProps,
  ): Promise<Result<BusinessException, string>> {
    return Res.success('upload-id');
  }
}
