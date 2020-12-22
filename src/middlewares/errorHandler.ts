import { Request, Response, NextFunction } from 'express';
import { Logger } from '../common/utils/Logger';

const logger: Logger = Logger.getInstance();

export default function (err: Error, req: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) {
    return next(err);
  }

  logger.err(err);
  res.status(500).send('Internal Server Error');
}
