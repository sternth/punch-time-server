import dayjs from 'dayjs';
import { Temp } from './Temp';

export class Logger {
  private static instance: Logger;

  private readonly project: string;
  private readonly template: string;

  protected constructor () {
    this.project = Temp.getInstance().getName();
    this.template = 'YYYY-MM-DD HH:mm:ss:sss';
  }

  public static getInstance (): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log (...args: unknown[]): void {
    console.log(this.project, '[LOG]', this.time(), ...args);
  }

  public err (...args: unknown[]): void {
    console.error(this.project, '[ERR]', this.time(), ...args);
  }

  public debug (...args: unknown[]): void {
    if (process.env.PUNCH_TIME_DEBUG === '1') {
      console.log(this.project, '[DEBUG]', this.time(), ...args);
    }
  }

  private time (): string {
    return dayjs().format(this.template);
  }
}
