import { Res, Result } from '../../shared/Result';
import { BusinessException } from '../exceptions/Business.exception';
import AbstractMedia, { MediaProps } from './AbstractMedia';
import Url from './Url';

export interface VideoProps extends MediaProps {
  duration: number;
}

export default class Video
  extends AbstractMedia<VideoProps>
  implements VideoProps
{
  #duration: number;

  static create(props: VideoProps): Result<BusinessException, Video> {
    const video = new Video(props);

    return Res.success(video);
  }

  private static isValid(props: VideoProps): Result<BusinessException, void> {
    if (props.duration <= 0) {
      return Res.failure(
        new BusinessException('Duration must be greater than zero'),
      );
    }

    return Res.success();
  }

  get duration(): number {
    return this.#duration;
  }

  private setDuration(duration: number) {
    this.#duration = duration;
  }

  applyUrls(urls: Url[]): Result<BusinessException, void> {
    const allowedFormats = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'];

    if (urls.length === 0) {
      return Res.failure(new BusinessException('At least one URL must be set'));
    }

    urls.forEach((url) => {
      if (url.url.trim().length === 0) {
        return Res.failure(new BusinessException('URL cannot be empty'));
      }

      if (!allowedFormats.includes(url.format.toLowerCase())) {
        return Res.failure(
          new BusinessException(`Invalid image format: ${url.format}`),
        );
      }
    });

    this.setUrls(urls);
    return Res.success();
  }
}
