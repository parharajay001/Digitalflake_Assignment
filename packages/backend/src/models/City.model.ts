import { Schema, model, Document, Types } from 'mongoose';
import { IState } from './State.model'; // Import IState interface from State file

// Define TypeScript interface for City
export interface ICity extends Document {
  cityName: string;
  cityCode: string;
  state: Types.ObjectId | IState; // Reference to the State schema
  status: boolean;
}

// Create the Mongoose schema
const CitySchema = new Schema<ICity>({
  cityName: { type: String, required: true, trim: true },
  cityCode: { type: String, required: true, unique: true, trim: true },
  state: { type: Schema.Types.ObjectId, ref: 'State', required: true },
  status: { type: Boolean, default: false },
});

// Export the City model
export const City = model<ICity>('City', CitySchema);
