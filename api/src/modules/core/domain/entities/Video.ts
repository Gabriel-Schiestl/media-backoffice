import { Res, Result } from '../../shared/Result';
import { BusinessException } from '../exceptions/Business.exception';
import AbstractMedia, { MediaProps } from './AbstractMedia';

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
}
