import { Temp } from './common/utils/Temp';
import { Logger } from './common/utils/Logger';
import { Connection } from './common/db/Connection';

export function prepare (pkg: { name: string, version: string }): () => void {
  Temp.getInstance()
    .setName(pkg.name)
    .setVersion(pkg.version);

  return run;
}

function run (): void {
  const name = Temp.getInstance().getName();
  const version = Temp.getInstance().getVersion();
  const logger = Logger.getInstance();

  logger.log(`Run ${name}@${version} ...`);
  logger.log('Connecting to database ...');
  Connection.getInstance().connect().then(() => {
    logger.log('Database connected ... starting server ...');
    import('./server').then(server => server.run());
  }).catch(err => {
    logger.err(err);
  });
}
