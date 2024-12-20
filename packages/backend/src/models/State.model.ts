import { Schema, model, Document } from 'mongoose';

// Define TypeScript interface for State
export interface IState extends Document {
  stateName: string;
  stateCode: string;
  status: boolean;
}

// Create the Mongoose schema
const StateSchema = new Schema<IState>({
  stateName: { type: String, required: true, trim: true },
  stateCode: { type: String, required: true, unique: true, trim: true },
  status: { type: Boolean, default: false },
});

// Export the State model
export const State = model<IState>('State', StateSchema);
