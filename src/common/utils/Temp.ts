export class Temp {
  private static instance: Temp;

  private readonly store: Record<string, string>;
  private name: string;
  private version: string;

  protected constructor () {
    this.store = {};
  }

  public static getInstance (): Temp {
    if (!this.instance) {
      this.instance = new Temp();
    }
    return this.instance;
  }

  public get (key: string): string {
    return this.store[key];
  }

  public set (key: string, val: string): Temp {
    this.store[key] = val;
    return this;
  }

  public setName (name: string): Temp {
    this.name = name;
    return this;
  }

  public getName (): string {
    return this.name;
  }

  public setVersion (version: string): Temp {
    this.version = version;
    return this;
  }

  public getVersion (): string {
    return this.version;
  }
}
