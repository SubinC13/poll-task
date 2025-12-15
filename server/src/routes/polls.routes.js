import express from 'express';
import { createPoll, getAllPollsController, getPollController, votePollController } from '../controllers/polls.controller.js';

const router = express.Router();

router.post('/', createPoll);
router.get('/', getAllPollsController);
router.get('/:id', getPollController);
router.post('/:id/vote', votePollController);

export default router;

