import { project } from './pkg';
import { Logger } from './common/utils/Logger';
import { Connection } from './common/db/Connection';
import { Server } from './common/srv/Server';

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
  const port = await Server.getInstance().start();
  logger.log(`Server listening at http://localhost:${port} ...`);
}
