import dayjs from 'dayjs';
import { project } from '../../pkg';

export class Logger {
  private static instance: Logger;

  private readonly template: string;

  protected constructor () {
    this.template = 'YYYY-MM-DD HH:mm:ss:sss';
  }

  public static getInstance (): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log (...args: unknown[]): void {
    console.log(project, '[LOG]', this.time(), ...args);
  }

  public err (...args: unknown[]): void {
    console.error(project, '[ERR]', this.time(), ...args);
  }

  public debug (...args: unknown[]): void {
    if (process.env.PUNCH_TIME_DEBUG === '1') {
      console.log(project, '[DEBUG]', this.time(), ...args);
    }
  }

  private time (): string {
    return dayjs().format(this.template);
  }
}
