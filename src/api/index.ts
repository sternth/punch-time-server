import express from 'express';
import versionRouter from './version';
import tasksRouter from './tasks';

const router: express.Router = express.Router();

router
  .use('/version', versionRouter)
  .use('/tasks', tasksRouter);

export default router;
