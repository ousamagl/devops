import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import l from './logger';
import errorHandler from '../api/middlewares/error.handler';
import * as OpenApiValidator from 'express-openapi-validator';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import mongoose from 'mongoose';
import { MockMongoose } from 'mock-mongoose';
const app = express();
import dbHandler from './db-handler';

export default class ExpressServer {
  private routes: (app: Application) => void;
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));

    /* Swagger Setup start */
    const swaggerFile: any = __dirname + '/swagger/swagger.json';
    const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
    const swaggerDocument = JSON.parse(swaggerData);
    app.use(
      '/api/docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, null, null, null)
    );
    /* Swagger Setup end */
  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(app);
    app.use(errorHandler);
    return this;
  }

  async listen(port: number): Promise<Application> {
    l.info('waiting for DB');
    await dbHandler.connect();
    l.info(`Connected to ${process.env.NODE_ENV} DB`);

    const welcome = (p: number) => (): void =>
      l.info(
        `up and running in ${
          process.env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${p}}`
      );

    http.createServer(app).listen(port, welcome(port));

    return app;
  }
}
