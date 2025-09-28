import { Res, Result } from '../../shared/Result';
import { BusinessException } from '../exceptions/Business.exception';
import AbstractEntity, { EntityProps } from './AbstractEntity';

export interface ImageProps extends EntityProps {
  altText: string;
}

export default class Image extends AbstractEntity {
  #altText: string;

  static create(props: ImageProps): Result<BusinessException, Image> {
    const image = new Image();

    image.setUrl(props.url);
    image.setAltText(props.altText);
    image.setTitle(props.title);
    image.setDescription(props.description);

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
