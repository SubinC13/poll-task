import { useEffect, useRef } from 'react';
import { createSocket } from '../services/socket.js';

export const useAllPollsSocket = (onPollCreated) => {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = createSocket();
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket connected for AllPolls:', socket.id);
    });

    socket.on('poll-created', (newPoll) => {
      console.log('Received poll-created event:', newPoll);
      if (onPollCreated) {
        onPollCreated(newPoll);
      }
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.removeAllListeners();
        socketRef.current.disconnect();
      }
    };
  }, [onPollCreated]);
};

