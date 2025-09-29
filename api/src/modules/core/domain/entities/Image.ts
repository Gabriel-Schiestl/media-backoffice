import { Res, Result } from '../../shared/Result';
import { BusinessException } from '../exceptions/Business.exception';
import AbstractMedia, { MediaProps } from './AbstractMedia';

export interface ImageProps extends MediaProps {
  altText: string;
}

export default class Image
  extends AbstractMedia<ImageProps>
  implements ImageProps
{
  #altText: string;

  static create(props: ImageProps): Result<BusinessException, Image> {
    const valid = this.isValid(props);
    if (valid.isFailure()) {
      return Res.failure(valid.error);
    }

    const image = new Image(props);

    image.setAltText(props.altText);

    return Res.success(image);
  }

  private static isValid(props: ImageProps): Result<BusinessException, void> {
    if (props.altText.trim().length <= 0) {
      return Res.failure(new BusinessException('Alt text must be provided'));
    }

    return Res.success();
  }

  get altText(): string {
    return this.#altText;
  }

  private setAltText(altText: string) {
    this.#altText = altText;
  }
}
