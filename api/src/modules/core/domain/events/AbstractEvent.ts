export default abstract class AbstractEvent<T> {
  readonly #id: string;
  readonly #createdAt: Date;
  readonly #props: T;

  constructor(props: T) {
    this.#id = crypto.randomUUID();
    this.#createdAt = new Date();
    this.#props = props;
  }

  get id(): string {
    return this.#id;
  }

  get createdAt(): Date {
    return this.#createdAt;
  }

  get props(): T {
    return this.#props;
  }
}
