import api from './api.js';

export const getAllPolls = async () => {
  try {
    const response = await api.get('/polls');
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 'Failed to fetch polls'
    );
  }
};

export const getPollById = async (id) => {
  try {
    const response = await api.get(`/polls/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 'Failed to fetch poll'
    );
  }
};

export const createPoll = async (pollData) => {
  try {
    const response = await api.post('/polls', pollData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 'Failed to create poll'
    );
  }
};

export const votePoll = async (id, optionIndex) => {
  try {
    const response = await api.post(`/polls/${id}/vote`, { optionIndex });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 'Failed to vote'
    );
  }
};

