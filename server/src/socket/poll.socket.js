import { getPoll, updatePollVote } from '../data/polls.store.js';

export const setupPollSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join-poll', (pollId) => {
      socket.join(`poll-${pollId}`);
      console.log(`Socket ${socket.id} joined poll-${pollId}`);
    });

    socket.on('leave-poll', (pollId) => {
      socket.leave(`poll-${pollId}`);
      console.log(`Socket ${socket.id} left poll-${pollId}`);
    });

    socket.on('vote', ({ pollId, optionIndex }) => {
      const poll = updatePollVote(pollId, optionIndex);
      
      if (!poll) {
        socket.emit('error', { message: 'Poll not found or invalid option index' });
        return;
      }

      io.to(`poll-${pollId}`).emit('poll-updated', poll);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

