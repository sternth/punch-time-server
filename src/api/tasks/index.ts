import express from 'express';
import { TasksCtrl } from './TasksCtrl';

const router: express.Router = express.Router();
const taskCtrl: TasksCtrl = TasksCtrl.getInstance();

router
  .get('', taskCtrl.getTasks.bind(taskCtrl))
  .get('/:id', taskCtrl.getTask.bind(taskCtrl))
  .post('', taskCtrl.addTask.bind(taskCtrl))
  .put('/:id', taskCtrl.editTask.bind(taskCtrl))
  .delete('/:id', taskCtrl.removeTask.bind(taskCtrl));

export default router;
