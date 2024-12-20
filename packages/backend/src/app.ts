import express, { Application } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser'; // Correct import
import logger from 'morgan';
import indexRouters from './routes/index.route';
import usersRouters from './routes/users.route';
import authRouters from './routes/auth.route';
import stateRouters from './routes/state.route';
import cityRouters from './routes/city.route';
import warehouseRouters from './routes/warehouse.route';
import connectDB from './config/DBConfig';
import cors from 'cors';

const app: Application = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Connect to the database
connectDB();

//API routes
app.use('/api/', indexRouters);
app.use('/api/auth', authRouters);
app.use('/api/user', usersRouters);
app.use('/api/states', stateRouters);
app.use('/api/cities', cityRouters);
app.use('/api/warehouses', warehouseRouters);

// Catch unhandled promise rejections
process.on('unhandledRejection', (error: Error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1); // Exit the process with failure
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1); // Exit the process with failure
});

// Export the app as a module
export default app;
