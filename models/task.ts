import { type Document, model, Schema } from 'mongoose'

interface TaskDocument extends Document {
  userId: string;
  tasks: {
    id: string;
    title: string;
    completed: boolean;
    createdDate: Date;
    dueDate?: Date;
    priority: 'low' | 'medium' | 'high';
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const mongoTaskSchema = new Schema<TaskDocument>({
  userId: { type: String, required: true },
  tasks: [{
    id: { type: String, required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, required: true },
    createdDate: { type: Date, required: true, default: Date.now },
    dueDate: { type: Date },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const Task = model<TaskDocument>('Task', mongoTaskSchema)
