const PollView = ({ poll, onVote, hasVoted }) => {
  const handleVote = (optionIndex) => {
    if (!hasVoted) {
      onVote(optionIndex);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold text-gray-900 text-center mb-1">
        {poll.question}
      </h2>
      <div className="flex flex-col gap-2">
        {poll.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleVote(index)}
            disabled={hasVoted}
            className={`border px-4 py-3 rounded-md transition-all flex justify-between items-center text-left ${
              hasVoted
                ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
            }`}
          >
            <span className="text-gray-900 font-medium">{option.text}</span>
            {hasVoted && (
              <span className="text-sm font-medium text-gray-600">
                {poll.totalVotes > 0
                  ? `${Math.round((option.votes / poll.totalVotes) * 100)}%`
                  : '0%'}
              </span>
            )}
          </button>
        ))}
      </div>
      {hasVoted && (
        <p className="text-center text-gray-500 text-sm mt-1">
          Total votes: {poll.totalVotes}
        </p>
      )}
    </div>
  );
};

export default PollView;

