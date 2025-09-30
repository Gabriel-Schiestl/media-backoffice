import { Res, Result } from '../../shared/Result';
import { BusinessException } from '../exceptions/Business.exception';
import AbstractMedia, { MediaProps } from './AbstractMedia';
import Url from './Url';

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

  applyUrls(urls: Url[]): Result<BusinessException, void> {
    const allowedFormats = ['jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff', 'svg'];

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
