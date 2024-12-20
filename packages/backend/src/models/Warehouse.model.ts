import { Schema, model, Document, Types } from 'mongoose';
import { IState } from './State.model'; // Import IState interface from State file
import { ICity } from './City.model'; // Import ICity interface from City file

// Define TypeScript interface for Warehouse
interface IWarehouse extends Document {
  warehouseName: string;
  state: Types.ObjectId | IState; // Reference to the State schema
  city: Types.ObjectId | ICity; // Reference to the City schema
  status: boolean;
}

// Create the Mongoose schema
const WarehouseSchema = new Schema<IWarehouse>({
  warehouseName: { type: String, required: true, trim: true },
  state: { type: Schema.Types.ObjectId, ref: 'State', required: true },
  city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
  status: { type: Boolean, default: true },
});

// Export the Warehouse model
export const Warehouse = model<IWarehouse>('Warehouse', WarehouseSchema);
