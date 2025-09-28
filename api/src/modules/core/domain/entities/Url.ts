import { Res, Result } from '../../shared/Result';
import { BusinessException } from '../exceptions/Business.exception';

export interface UrlProps {
  url: string;
  quality: number;
  format: string;
}

export default class Url {
  readonly #url: string;
  readonly #quality: number;
  readonly #format: string;

  private constructor(props: UrlProps) {
    this.#url = props.url;
    this.#quality = props.quality;
    this.#format = props.format;
  }

  static create(props: UrlProps): Result<BusinessException, Url> {
    const isValid = this.isValid(props);

    if (isValid.isFailure()) {
      return Res.failure(isValid.error);
    }

    return Res.success(new Url(props));
  }

  private static isValid(props: UrlProps): Result<BusinessException, void> {
    if (!props.url.trim().includes('http')) {
      return Res.failure(new BusinessException('Invalid URL'));
    }

    if (props.quality < 0) {
      return Res.failure(new BusinessException('Invalid quality'));
    }

    return Res.success();
  }

  get url(): string {
    return this.#url;
  }

  get quality(): number {
    return this.#quality;
  }

  get format(): string {
    return this.#format;
  }
}
