const polls = {};

export const addPoll = (poll) => {
  polls[poll.id] = poll;
  return poll;
};

export const getPoll = (id) => {
  return polls[id] || null;
};

export const getAllPolls = () => {
  return Object.values(polls);
};

export const updatePollVote = (id, optionIndex) => {
  const poll = polls[id];
  
  if (!poll) {
    return null;
  }

  if (typeof optionIndex !== 'number' || optionIndex < 0 || optionIndex >= poll.options.length) {
    return null;
  }

  poll.options[optionIndex].votes++;
  poll.totalVotes++;

  return poll;
};
