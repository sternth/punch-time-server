import { Request, Response, NextFunction } from 'express';

export class TasksCtrl {
  private static instance: TasksCtrl;

  protected constructor () {
  }

  public static getInstance (): TasksCtrl {
    if (!TasksCtrl.instance) {
      TasksCtrl.instance = new TasksCtrl();
    }
    return TasksCtrl.instance;
  }

  public getTasks (req: Request, res: Response, next: NextFunction): void {
    try {
      res.send('GET_TASKS');
    } catch (err) {
      next(err);
    }
  }

  public getTask (req: Request, res: Response, next: NextFunction): void {
    try {
      res.send(`GET_TASK: ${req.params.id}`);
    } catch (err) {
      next(err);
    }
  }

  public addTask (req: Request, res: Response, next: NextFunction): void {
    try {
      res.send('ADD_TASK');
    } catch (err) {
      next(err);
    }
  }

  public editTask (req: Request, res: Response, next: NextFunction): void {
    try {
      res.send(`EDIT_TASK: ${req.params.id}`);
    } catch (err) {
      next(err);
    }
  }

  public removeTask (req: Request, res: Response, next: NextFunction): void {
    try {
      res.send(`REMOVE_TASK: ${req.params.id}`);
    } catch (err) {
      next(err);
    }
  }
}
