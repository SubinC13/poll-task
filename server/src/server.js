import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { setupPollSocket } from './socket/poll.socket.js';

const PORT = process.env.PORT || 3001;

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

app.locals.io = io;

setupPollSocket(io);

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Socket connected`);
});

