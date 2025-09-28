export interface EntityProps {
  url: string[];
  title: string;
  size: number;
  format: string;
  description?: string;
}

export default abstract class AbstractEntity {
  readonly #id: string;
  #url: string[];
  #title: string;
  #size: number;
  #format: string;
  #description?: string;

  protected constructor(id?: string) {
    this.#id = id ?? crypto.randomUUID();
  }

  get id(): string {
    return this.#id;
  }

  get url(): string[] {
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

  get description(): string | undefined {
    return this.#description;
  }

  protected setUrl(url: string[]) {
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

  protected setDescription(description: string | undefined) {
    this.#description = description;
  }
}
