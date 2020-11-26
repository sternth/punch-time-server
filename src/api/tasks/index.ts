import express from 'express';
import { TasksCtrl } from './TasksCtrl';

const router: express.Router = express.Router();
const taskCtrl: TasksCtrl = TasksCtrl.getInstance();

router
  .get('', taskCtrl.getTasks)
  .get('/:id', taskCtrl.addTask)
  .post('', taskCtrl.addTask)
  .put('/:id', taskCtrl.editTask)
  .delete('/:id', taskCtrl.removeTask);

export default router;
