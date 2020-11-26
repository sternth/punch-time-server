import { Request, Response } from 'express';
import { join } from 'path';
import argv from '../argv';

export default function (req: Request, res: Response): void {
  res.sendFile(join(argv['app-path'], 'index.html'));
}
