import mongoose from 'mongoose';
import { Config} from './Config';

export class Connection {
  private static instance: Connection;

  private readonly config: Config;

  protected constructor () {
    this.config = Config.getInstance();
  }

  public static getInstance (): Connection {
    if (!Connection.instance) {
      Connection.instance = new Connection();
    }
    return Connection.instance;
  }

  public async connect (): Promise<string> {
    const {
      uri,
      uriWithoutCredentials,
      options,
    } = this.config;

    return new Promise((resolve, reject) => {
      mongoose.connect(uri, options, err => {
        if (err) {
          reject(err);
        } else {
          resolve(uriWithoutCredentials);
        }
      });
    });
  }
}
