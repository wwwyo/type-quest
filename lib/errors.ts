export class TestError extends Error {
  override readonly name = "TestError" as const;
  constructor(message: string, options?: { cause: unknown }) {
    super(message, options);

    this.cause = options?.cause;
  }
}

export class ServerError extends Error {
  override readonly name = "ServerError" as const;
  constructor(message: string, options?: { cause: unknown }) {
    super(message, options);

    this.cause = options?.cause;
  }
}
