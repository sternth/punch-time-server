import mongoose from 'mongoose';

export class Config {
  private static instance: Config;

  private readonly username: string | null;
  private readonly password: string | null;
  private readonly host: string;
  private readonly port: string;
  private readonly db: string;

  public readonly uri: string;
  public readonly uriWithoutCredentials: string;
  public readonly options: mongoose.ConnectOptions;

  protected constructor () {
    this.username = process.env.MONGO_INITDB_ROOT_USERNAME || null;
    this.password = process.env.MONGO_INITDB_ROOT_PASSWORD || null;
    this.host = process.env.MONGO_HOST || 'localhost';
    this.port = process.env.MONGO_PORT || '27017';
    this.db = process.env.MONGO_DB || 'punchTime';
    this.uri = this.createUri();
    this.uriWithoutCredentials = this.createUri(false);
    this.options = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      socketTimeoutMS: 30000,
      keepAlive: true,
      poolSize: 50,
      autoIndex: false,
      dbName: this.db,
    };
  }

  public static getInstance (): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  private createUri (withCredentials = true): string {
    const credentials = withCredentials ? this.getCredentials() : '';
    const { host, port } = this;

    return `mongodb://${credentials}${host}:${port}`;
  }

  private getCredentials (): string {
    let credentials = '';

    if (this.username && this.password) {
      credentials = `${this.username}:${this.password}@`;
    }

    return credentials;
  }
}
