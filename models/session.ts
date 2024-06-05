import { type Document, model, Schema } from 'mongoose'

interface SessionDocument extends Document {
  userId: string;
  token: string;
  devices: string[];
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema<SessionDocument>({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  devices: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const Session = model<SessionDocument>('Session', sessionSchema)
