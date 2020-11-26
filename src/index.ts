import express from 'express';
import argv from './argv';
import { Temp } from './common/utils/Temp';
import api from './api';
import timestamp from './middlewares/timestamp';
import sendApp from './middlewares/sendApp';

const API = /^\/api/;
const NO_API = /^(?!\/api).+/;

export function run (pkg: { name: string, version: string }): void {
  const temp = Temp.getInstance();
  const app: express.Application = express();
  const port: number = argv.port || 3000;

  temp
    .setName(pkg.name)
    .setVersion(pkg.version);

  app
    .use(express.static(argv['app-path']))
    .use(timestamp)
    .use(API, api)
    .use(NO_API, sendApp);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}
