import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PollForm from '../components/PollForm.jsx';
import { createPoll } from '../services/polls.service.js';

const CreatePoll = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (pollData) => {
    setLoading(true);
    setError(null);

    try {
      const poll = await createPoll(pollData);
      const pollId = poll.id;
      
      // Redirect to poll view page
      navigate(`/poll/${pollId}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-5">
      <div className="bg-white rounded-lg p-8 shadow-sm max-w-2xl w-full border border-gray-200">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-semibold text-gray-900 flex-1">
            Create a New Poll
          </h1>
          <button
            onClick={() => navigate('/polls')}
            className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            View All Polls
          </button>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 text-sm">
            {error}
          </div>
        )}
        <PollForm onSubmit={handleSubmit} />
        {loading && (
          <div className="text-center text-gray-500 text-sm py-4">
            Creating poll...
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePoll;

