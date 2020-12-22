import express from 'express';
import bodyParser from 'body-parser';
import { project } from './pkg';
import { Logger } from './common/utils/Logger';
import { Connection } from './common/db/Connection';
import argv from './argv';
import api from './api';
import timestamp from './middlewares/timestamp';
import sendApp from './middlewares/sendApp';

const logger = Logger.getInstance();

init().catch(err => {
  logger.err('Failed to initialize application:', err);
});

async function init (): Promise<void> {
  logger.log(`Initialize ${project} ...`);
  logger.log('Connecting to database ...');
  const dbUri = await Connection.getInstance().connect();
  logger.log(`Connected to database ${dbUri} ...`);
  logger.log('Starting server ...');
  const port = await startServer();
  logger.log(`Server listening at http://localhost:${port} ...`);
}

async function startServer (): Promise<number> {
  const API = /^\/api/;
  const NO_API = /^(?!\/api).+/;

  return new Promise(resolve => {
    express()
      .use(express.static(argv['app-path']))
      .use(timestamp)
      .use(bodyParser.json())
      .use(API, api)
      .use(NO_API, sendApp)
      .listen(argv.port, () => resolve(argv.port));
  });
}
