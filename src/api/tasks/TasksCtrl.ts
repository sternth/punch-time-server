import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { TaskService } from '../../services/TaskService';
import { TaskNotFoundError } from '../../common/errors/TaskNotFoundError';

export class TasksCtrl {
  private static instance: TasksCtrl;

  private readonly service: TaskService;

  protected constructor () {
    this.service = TaskService.getInstance();
  }

  public static getInstance (): TasksCtrl {
    if (!TasksCtrl.instance) {
      TasksCtrl.instance = new TasksCtrl();
    }
    return TasksCtrl.instance;
  }

  public getTasks (req: Request, res: Response, next: NextFunction): void {
    const lastDays = parseInt(req.query.lastDays.toString());
    this.service.getAll(lastDays).then(tasks => {
      res.send(tasks);
    }).catch(err => {
      next(err);
    });
  }

  public getTask (req: Request, res: Response, next: NextFunction): void {
    this.service.get(req.params.id).then(task => {
      res.send(task);
    }).catch(err => {
      if (err instanceof TaskNotFoundError) {
        res.status(404).send(err.message);
      } else {
        next(err);
      }
    });
  }

  public addTask (req: Request, res: Response, next: NextFunction): void {
    this.service.add(req.body).then(task => {
      res.send(task);
    }).catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send(err.message);
      } else {
        next(err);
      }
    });
  }

  public editTask (req: Request, res: Response, next: NextFunction): void {
    this.service.edit(req.params.id, req.body).then(task => {
      res.send(task);
    }).catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send(err.message);
      } else if (err instanceof TaskNotFoundError) {
        res.status(404).send(err.message);
      } else {
        next(err);
      }
    });
  }

  public removeTask (req: Request, res: Response, next: NextFunction): void {
    this.service.remove(req.params.id).then(task => {
      res.status(200).send(task);
    }).catch(err => {
      next(err);
    });
  }
}
