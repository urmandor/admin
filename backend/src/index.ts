import 'reflect-metadata';
import { createServer } from './config/express';
import { AddressInfo } from 'net';
import { useExpressServer } from 'routing-controllers';
import * as path from 'path';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '5000';

async function startServer() {
  const app = createServer();
  const server = useExpressServer(app, {
    routePrefix: '/api',
    controllers: [path.join(__dirname + '/controllers/*.ts')],
  }).listen({ host, port }, () => {
    const addressInfo = server.address() as AddressInfo;
    console.info(`Server ready at http://${addressInfo.address}:${addressInfo.port}`);
  });
}

startServer();
