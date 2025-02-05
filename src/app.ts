import { startWebSocketServer } from './websocket';
import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import routes from './routes';
import { getPort } from './config';
import logger from './utils/logger';

// 1) Load SSL certs from your filesystem
// Make sure these paths match how you mount them in Docker or on your host
const privateKey = fs.readFileSync('/path/to/ssl.key');
const certificate = fs.readFileSync('/path/to/ssl.crt');
// if you have an intermediate CA file:
// const ca = fs.readFileSync('/path/to/chain.crt');

const credentials = {
  key: privateKey,
  cert: certificate,
  // ca,
};

// 2) Initialize Express
const app = express();
const port = getPort();

// CORS
const corsOptions = { origin: '*' };
logger.info(`🚀 Initializing Server Setup...`);
logger.info(`🛠 CORS Policy Applied: ${JSON.stringify(corsOptions)}`);
app.use(cors(corsOptions));
app.use(express.json());

// Middlewares, Logging
app.use((req, res, next) => {
  logger.info(`📩 API Request - ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
logger.info(`✅ API Routes Initialized`);
app.use('/api', routes);
app.get('/api', (_, res) => {
  logger.info(`🟢 Health Check Endpoint Hit`);
  res.status(200).json({ status: 'ok' });
});

// 3) Create HTTPS server
const server = https.createServer(credentials, app);

// 4) Start listening on your port (could be 3001, 443, etc.)
server.listen(port, () => {
  logger.info(`✅ HTTPS Server is running on port ${port}`);
});

// 5) Initialize WebSocket
logger.info(`📡 Starting WebSocket Server...`);
startWebSocketServer(server);

// Error Handling
process.on('uncaughtException', (err, origin) => {
  logger.error(`🔥 Uncaught Exception at ${origin}: ${err.message}`);
  logger.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`🚨 Unhandled Rejection at: ${promise}`);
  logger.error(`💥 Reason: ${reason}`);
});
