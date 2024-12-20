import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt'; // To hash passwords
import jwt from 'jsonwebtoken'; // To create JWT tokens
import dotenv from 'dotenv';

dotenv.config(); // Load .env file

// Define TypeScript interface for User
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
}

// User schema
const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true, trim: true },
});

// Hash the password before saving to DB
userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, parseInt(process.env.BCRYPT_SALT || '10')); // Hash with salt/
  }
  next();
});

// Compare password function
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  // Replace `process.env.JWT_SECRET` with your secret key
  return jwt.sign({ id: this._id, email: this.email, firstName: this.firstName, lastName: this.lastName }, process.env.JWT_SECRET || 'digital_flake', {
    expiresIn: '1h', // Token will expire in 1 hour
  });
};

// Export the User model
export const User = model<IUser>('User', userSchema);
