import express from 'express';
import cors from 'cors';
import pollsRoutes from './routes/polls.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.locals.io = null;

app.use('/polls', pollsRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;

