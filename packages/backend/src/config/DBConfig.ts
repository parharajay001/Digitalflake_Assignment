import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // Load .env file

// Function to connect to the database
const connectDB = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/digital_flake');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
