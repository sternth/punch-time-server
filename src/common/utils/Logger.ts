import dayjs from 'dayjs';

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
    console.log('[LOG]', this.time(), ...args);
  }

  public err (...args: unknown[]): void {
    console.error('[ERR]', this.time(), ...args);
  }

  public debug (...args: unknown[]): void {
    if (process.env.PUNCH_TIME_DEBUG === '1') {
      console.log('[DEBUG]', this.time(), ...args);
    }
  }

  private time (): string {
    return dayjs().format(this.template);
  }
}
