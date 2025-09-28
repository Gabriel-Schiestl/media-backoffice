import { Res, Result } from '../../shared/Result';
import { BusinessException } from '../exceptions/Business.exception';
import AbstractEntity, { EntityProps } from './AbstractEntity';

export interface VideoProps extends EntityProps {
  duration: number;
}

export default class Video extends AbstractEntity {
  #duration: number;

  static create(props: VideoProps): Result<BusinessException, Video> {
    const video = new Video();

    video.setUrl(props.url);
    video.setDuration(props.duration);
    video.setTitle(props.title);
    video.setDescription(props.description);

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
