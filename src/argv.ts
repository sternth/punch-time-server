import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { appPath } from 'punch-time';

console.log('appPath:', appPath);

export default yargs(hideBin(process.argv))
  .detectLocale(false)
  .option('debug', {
    type: 'boolean',
    description: 'Run service in debug mode',
  })
  .option('port', {
    alias: 'p',
    type: 'number',
    description: 'Start service on port',
    default: parseInt(process.env.PUNCH_TIME_PORT) || 3000,
  })
  .option('app-path', {
    type: 'string',
    description: 'Path to application to host',
    default: process.env.PUNCH_TIME_APP_PATH || appPath,
  })
  .argv;
