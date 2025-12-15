const PollResult = ({ poll }) => {
  const getPercentage = (votes, total) => {
    if (total === 0) return 0;
    return Math.round((votes / total) * 100);
  };

  const maxVotes = Math.max(...poll.options.map(opt => opt.votes));

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold text-gray-900 text-center mb-1">
        {poll.question}
      </h2>
      <div className="flex flex-col gap-4">
        {poll.options.map((option, index) => {
          const percentage = getPercentage(option.votes, poll.totalVotes);
          const isLeading = option.votes === maxVotes && maxVotes > 0;

          return (
            <div key={index} className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-medium">{option.text}</span>
                <span className="text-sm text-gray-600 font-medium">
                  {option.votes} vote{option.votes !== 1 ? 's' : ''} ({percentage}%)
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isLeading ? 'bg-blue-600' : 'bg-gray-400'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-center text-gray-500 text-sm mt-1">
        Total votes: {poll.totalVotes}
      </p>
    </div>
  );
};

export default PollResult;

