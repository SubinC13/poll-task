import { nanoid } from 'nanoid';
import { addPoll, getPoll, getAllPolls, updatePollVote } from '../data/polls.store.js';

export const createPoll = (req, res) => {
  try {
    const { question, options } = req.body;

    if (!question || !options || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({
        error: 'Question and at least 2 options are required'
      });
    }

    const pollId = nanoid(10);
    const poll = {
      id: pollId,
      question,
      options: options.map(opt => ({
        text: opt,
        votes: 0
      })),
      createdAt: new Date().toISOString(),
      totalVotes: 0
    };

    const createdPoll = addPoll(poll);

    // Emit socket event for new poll creation
    const io = req.app.locals.io;
    if (io) {
      const pollSummary = {
        id: createdPoll.id,
        question: createdPoll.question,
        totalVotes: createdPoll.totalVotes,
        optionsCount: createdPoll.options.length,
        createdAt: createdPoll.createdAt
      };
      console.log('Emitting poll-created event:', pollSummary);
      console.log('Connected clients:', io.sockets.sockets.size);
      io.emit('poll-created', pollSummary);
    } else {
      console.warn('Socket.IO instance not available');
    }

    res.status(201).json(createdPoll);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create poll' });
  }
};

export const getAllPollsController = (req, res) => {
  try {
    const allPolls = getAllPolls();
    const pollsList = allPolls.map(poll => ({
      id: poll.id,
      question: poll.question,
      totalVotes: poll.totalVotes,
      optionsCount: poll.options.length,
      createdAt: poll.createdAt
    }));

    pollsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(pollsList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch polls' });
  }
};

export const getPollController = (req, res) => {
  try {
    const { id } = req.params;
    const poll = getPoll(id);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    res.json(poll);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch poll' });
  }
};

export const votePollController = (req, res) => {
  try {
    const { id } = req.params;
    const { optionIndex } = req.body;
    const io = req.app.locals.io;

    const poll = updatePollVote(id, optionIndex);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found or invalid option index' });
    }

    if (io) {
      io.to(`poll-${id}`).emit('poll-updated', poll);
    }

    res.json(poll);
  } catch (error) {
    res.status(500).json({ error: 'Failed to vote' });
  }
};

