export class TaskNotFoundError extends Error {
  public readonly id: string;

  constructor (id: string) {
    super(`Task with id ${id} not found.`);
    this.id = id;
  }
}
