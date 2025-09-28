import { Res, Result } from '../../shared/Result';
import { BusinessException } from '../exceptions/Business.exception';
import Image from './Image';
import Video from './Video';

export type Media = Video | Image;

export interface UploadProps {
  media: Media;
  uploadDate: Date;
  uploadedBy: string;
}

export default class Upload implements UploadProps {
  #media: Media;
  #uploadDate: Date;
  #uploadedBy: string;

  static Create(props: UploadProps): Result<BusinessException, Upload> {
    const upload = new Upload();

    const isValid = this.isValid(props);
    if (isValid.isFailure()) {
      return Res.failure(isValid.error);
    }

    upload.setMedia(props.media);
    upload.setUploadDate(props.uploadDate);
    upload.setUploadedBy(props.uploadedBy);

    return Res.success(upload);
  }

  private static isValid(props: UploadProps): Result<BusinessException, void> {
    if (props.uploadedBy.trim().length <= 0) {
      return Res.failure(new BusinessException('UploadedBy must be provided'));
    }

    if (props.uploadDate > new Date()) {
      return Res.failure(
        new BusinessException('Upload date cannot be in the future'),
      );
    }

    return Res.success();
  }

  private setMedia(media: Media) {
    this.#media = media;
  }

  private setUploadDate(uploadDate: Date) {
    this.#uploadDate = uploadDate;
  }

  private setUploadedBy(uploadedBy: string) {
    this.#uploadedBy = uploadedBy;
  }

  get media(): Media {
    return this.#media;
  }

  get uploadDate(): Date {
    return this.#uploadDate;
  }

  get uploadedBy(): string {
    return this.#uploadedBy;
  }
}
