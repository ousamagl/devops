import { Application } from 'express';
import notesRouter from './api/controllers/loans/router';
export default function routes(app: Application): void {
  app.use('/api/v1/loans', notesRouter);
}
