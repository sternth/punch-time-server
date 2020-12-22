import express from 'express';
import bodyParser from 'body-parser';
import argv from './argv';
import api from './api';
import timestamp from './middlewares/timestamp';
import sendApp from './middlewares/sendApp';
import { Logger } from './common/utils/Logger';

const API = /^\/api/;
const NO_API = /^(?!\/api).+/;

export function run (): void {
  const logger = Logger.getInstance();
  const app: express.Application = express();
  const port: number = argv.port || 3000;

  app
    .use(express.static(argv['app-path']))
    .use(timestamp)
    .use(bodyParser.json())
    .use(API, api)
    .use(NO_API, sendApp);

  app.listen(port, () => {
    logger.log(`Server listening at http://localhost:${port}`);
  });
}
