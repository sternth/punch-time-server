import mongoose from 'mongoose';
import { Logger } from '../utils/Logger';
import { Config} from './Config';

export class Connection {
  private static instance: Connection;

  private readonly logger: Logger;
  private readonly config: Config;

  protected constructor () {
    this.logger = Logger.getInstance();
    this.config = Config.getInstance();
  }

  public static getInstance (): Connection {
    if (!Connection.instance) {
      Connection.instance = new Connection();
    }
    return Connection.instance;
  }

  public async connect (): Promise<void> {
    const { uri, options } = this.config;

    return new Promise((resolve, reject) => {
      mongoose.connect(uri, options, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
