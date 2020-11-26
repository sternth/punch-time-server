import { Request, Response, NextFunction } from 'express';
import { Logger } from '../common/utils/Logger';

const logger: Logger = Logger.getInstance();

export default function (req: Request, res: Response, next: NextFunction): void {
  logger.log(req.method, req.path);
  next();
}
