import { initServer } from './websocketServer';
import http from 'http';
import https from 'https';

export const startWebSocketServer = (
  server: http.Server | https.Server
) => {
  initServer(server);
};
