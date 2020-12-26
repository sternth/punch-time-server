import { Logger } from '../common/utils/Logger';
import { TaskData } from '../common/types/TaskData';
import { Task, ITask } from '../common/models/task';
import { TaskNotFoundError } from '../common/errors/TaskNotFoundError';
import dayjs from 'dayjs';

export class TaskService {
  private static instance: TaskService;

  private readonly logger: Logger;

  protected constructor () {
    this.logger = Logger.getInstance();
  }

  public static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }
    return TaskService.instance;
  }

  public async add (data: TaskData): Promise<ITask> {
    await Task.validate(data);
    return Task.create(data);
  }

  public async get (id: string): Promise<ITask> {
    const filter = { _id: id };
    const task = await Task.findOne(filter);

    if (!task) {
      throw new TaskNotFoundError(id);
    }
    return task;
  }

  public async getAll (lastDays = 7): Promise<ITask[]> {
    const lastDate = dayjs()
      .startOf('day')
      .subtract(lastDays, 'day')
      .valueOf();

    return Task
      .find({
        start: { $gte: lastDate },
      });
  }

  public async edit (id: string, data: TaskData): Promise<ITask> {
    const filter = { _id: id };
    const exist = await Task.exists(filter);

    if (!exist) {
      throw new TaskNotFoundError(id);
    }

    await Task.validate(data);
    await Task.findOneAndUpdate(filter, data);
    return Task.findOne(filter);
  }

  public async remove (id: string): Promise<ITask> {
    return Task.findByIdAndDelete(id);
  }
}
