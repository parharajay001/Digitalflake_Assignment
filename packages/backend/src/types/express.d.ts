// src/express.d.ts or src/types/express.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Adjust the type here if you have a more specific type for 'user'
    }
  }
}
