import { useEffect, useRef } from 'react';
import { createSocket } from '../services/socket.js';

export const usePollSocket = (pollId, onPollUpdate) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!pollId) return;

    const socket = createSocket();
    socketRef.current = socket;

    socket.emit('join-poll', pollId);

    socket.on('poll-updated', (updatedPoll) => {
      onPollUpdate(updatedPoll);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.emit('leave-poll', pollId);
        socketRef.current.disconnect();
      }
    };
  }, [pollId, onPollUpdate]);

  const vote = (optionIndex) => {
    if (socketRef.current && pollId) {
      socketRef.current.emit('vote', { pollId, optionIndex });
    }
  };

  return { vote };
};

