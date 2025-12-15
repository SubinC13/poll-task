import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPolls } from '../services/polls.service.js';
import { useAllPollsSocket } from '../hooks/useAllPollsSocket.js';

const AllPolls = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const pollsData = await getAllPolls();
        setPolls(pollsData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  const handlePollCreated = useCallback((newPoll) => {
    setPolls(prevPolls => {
      if (prevPolls.some(poll => poll.id === newPoll.id)) {
        return prevPolls;
      }
      return [newPoll, ...prevPolls];
    });
  }, []);

  useAllPollsSocket(handlePollCreated);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center p-5">
        <div className="text-center text-gray-500 text-sm py-5">
          Loading polls...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-5">
      <div className="bg-white rounded-lg p-8 shadow-sm max-w-4xl w-full border border-gray-200">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-semibold text-gray-900 flex-1">
            All Polls
          </h1>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
          >
            + Create New Poll
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 text-sm">
            {error}
          </div>
        )}

        {polls.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-base mb-4">No polls yet. Create your first poll!</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-medium transition-colors"
            >
              Create Poll
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {polls.map((poll) => (
              <div
                key={poll.id}
                className="border border-gray-300 hover:border-blue-500 rounded-md p-4 cursor-pointer transition-all hover:bg-gray-50"
                onClick={() => navigate(`/poll/${poll.id}`)}
              >
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {poll.question}
                </h3>
                <div className="flex flex-wrap gap-4 mb-2 text-sm text-gray-600">
                  <span>{poll.optionsCount} options</span>
                  <span>{poll.totalVotes} vote{poll.totalVotes !== 1 ? 's' : ''}</span>
                  <span>{formatDate(poll.createdAt)}</span>
                </div>
                <div className="text-blue-600 text-sm font-medium mt-1">
                  View Poll →
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPolls;

