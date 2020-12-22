import mongoose from 'mongoose';

interface ITask extends mongoose.Document {
  start: number,
  end: number,
  text: string,
  type: string,
}

const taskSchema = new mongoose.Schema({
  start: { type: Number, required: true },
  end: { type: Number, required: true },
  text: { type: String, required: true },
  type: { type: String, required: false },
}, {
  collection: 'tasks',
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export {
  ITask,
  Task,
};
