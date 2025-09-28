import { MediaProps } from '../entities/AbstractMedia';
import AbstractEvent from './AbstractEvent';

export default class MediaCreatedEvent<
  T extends MediaProps,
> extends AbstractEvent<T> {
  constructor(media: T) {
    super(media);
  }
}
