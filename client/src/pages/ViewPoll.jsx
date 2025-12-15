import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PollView from '../components/PollView.jsx';
import PollResult from '../components/PollResult.jsx';
import { usePollSocket } from '../hooks/usePollSocket.js';
import { getPollById, votePoll } from '../services/polls.service.js';

const ViewPoll = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const votedPolls = JSON.parse(sessionStorage.getItem('votedPolls') || '[]');
    if (votedPolls.includes(id)) {
      setHasVoted(true);
    }
  }, [id]);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const pollData = await getPollById(id);
        setPoll(pollData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, [id]);

  const handlePollUpdate = useCallback((updatedPoll) => {
    setPoll(updatedPoll);
  }, []);

  usePollSocket(id, handlePollUpdate);

  const handleVote = async (optionIndex) => {
    if (hasVoted) return;
    try {
      await votePoll(id, optionIndex);
      const votedPolls = JSON.parse(sessionStorage.getItem('votedPolls') || '[]');
      if (!votedPolls.includes(id)) {
        votedPolls.push(id);
        sessionStorage.setItem('votedPolls', JSON.stringify(votedPolls));
      }
      setHasVoted(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center p-5">
        <div className="text-center text-gray-500 text-sm py-5">
          Loading poll...
        </div>
      </div>
    );
  }

  if (error || !poll) {
    return (
      <div className="min-h-screen flex justify-center items-center p-5">
        <div className="bg-white rounded-lg p-8 shadow-sm max-w-2xl w-full border border-gray-200">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 text-sm">
            {error || 'Poll not found'}
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-5">
      <div className="bg-white rounded-lg p-8 shadow-sm max-w-2xl w-full border border-gray-200">
        <div className="flex justify-between items-center mb-6 gap-3 flex-wrap">
          <button
            onClick={() => navigate('/polls')}
            className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            ← All Polls
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Create New Poll
          </button>
        </div>
        {hasVoted ? (
          <PollResult poll={poll} />
        ) : (
          <PollView poll={poll} onVote={handleVote} hasVoted={hasVoted} />
        )}
      </div>
    </div>
  );
};

export default ViewPoll;

