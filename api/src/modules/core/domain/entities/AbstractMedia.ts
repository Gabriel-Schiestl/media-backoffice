import AbstractEvent from '../events/AbstractEvent';
import Url from './Url';

export interface MediaProps {
  url: Url[];
  title: string;
  size: number;
  format: string;
  content: Buffer;
  description?: string;
}

export default abstract class AbstractMedia<T extends MediaProps> {
  readonly #id: string;
  #url: Url[];
  #title: string;
  #size: number;
  #format: string;
  #content: Buffer;
  #events: AbstractEvent<MediaProps>[] = [];
  #description?: string;

  protected constructor(props: T, id?: string) {
    this.#id = id ?? crypto.randomUUID();
    this.setUrl(props.url);
    this.setTitle(props.title);
    this.setSize(props.size);
    this.setFormat(props.format);
    this.setContent(props.content);
    this.setDescription(props.description);
  }

  get id(): string {
    return this.#id;
  }

  get url(): Url[] {
    return this.#url;
  }

  get title(): string {
    return this.#title;
  }

  get size(): number {
    return this.#size;
  }

  get format(): string {
    return this.#format;
  }

  get content(): Buffer {
    return this.#content;
  }

  get description(): string | undefined {
    return this.#description;
  }

  protected setUrl(url: Url[]) {
    this.#url = url;
  }

  protected setTitle(title: string) {
    this.#title = title;
  }

  protected setSize(size: number) {
    this.#size = size;
  }

  protected setFormat(format: string) {
    this.#format = format;
  }

  protected setContent(content: Buffer) {
    this.#content = content;
  }

  protected setDescription(description: string | undefined) {
    this.#description = description;
  }

  protected addEvent(event: AbstractEvent<MediaProps>) {
    this.#events.push(event);
  }

  get pullEvents(): AbstractEvent<MediaProps>[] {
    const events = this.#events.slice();
    this.#events = [];
    return events;
  }
}
