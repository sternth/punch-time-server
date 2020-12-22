import express from 'express';
import argv from '../../argv';
import timestamp from '../../middlewares/timestamp';
import bodyParser from 'body-parser';
import api from '../../api';
import sendApp from '../../middlewares/sendApp';
import errorHandler from '../../middlewares/errorHandler';

export class Server {
  private static instance: Server;
  private static API = /^\/api/;
  private static NO_API = /^(?!\/api).+/;

  public readonly app: express.Application;

  protected constructor () {
    this.app = express();
  }

  public static getInstance (): Server {
    if (!Server.instance) {
      Server.instance = new Server();
    }
    return Server.instance;
  }

  public start (): Promise<number> {
    const appPath = argv['app-path'];
    const { port } = argv;

    return new Promise(resolve => {
      this.app
        .use(express.static(appPath))
        .use(timestamp)
        .use(bodyParser.json())
        .use(Server.API, api)
        .use(Server.NO_API, sendApp)
        .use(errorHandler)
        .listen(port, () => resolve(port));
    });
  }
}
