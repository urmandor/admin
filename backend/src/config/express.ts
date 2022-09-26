import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';

export const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(express.json({ limit: '1mb' }));
  app.use(cors());
  app.disable('x-powered-by');

  app.use(express.static(path.join(__dirname, '../../public')));

  return app;
};
