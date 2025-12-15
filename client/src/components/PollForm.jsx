import { useState, useRef } from 'react';

const PollForm = ({ onSubmit }) => {
  const questionRef = useRef(null);
  const optionsRefs = useRef([]);
  const [optionCount, setOptionCount] = useState(2);

  const addOption = () => {
    setOptionCount(prev => prev + 1);
  };

  const removeOption = (index) => {
    if (optionCount > 2) {
      optionsRefs.current.splice(index, 1);
      setOptionCount(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const question = questionRef.current?.value.trim() || '';
    const validOptions = optionsRefs.current
      .filter(ref => ref)
      .map(ref => ref.value.trim())
      .filter(opt => opt !== '');
    
    if (question && validOptions.length >= 2) {
      onSubmit({ question, options: validOptions });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="question" className="font-medium text-gray-700 text-sm">
          Poll Question
        </label>
        <input
          type="text"
          id="question"
          ref={questionRef}
          placeholder="Enter your poll question..."
          className="px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700 text-sm">Options</label>
        {Array.from({ length: optionCount }).map((_, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              ref={el => {
                optionsRefs.current[index] = el;
              }}
              placeholder={`Option ${index + 1}`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            {optionCount > 2 && (
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md w-8 h-8 flex items-center justify-center text-lg transition-colors"
                aria-label="Remove option"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addOption}
          className="border border-dashed border-gray-300 hover:border-gray-400 px-4 py-2 rounded-md text-gray-600 hover:text-gray-700 transition-colors text-sm font-medium"
        >
          + Add Option
        </button>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-medium transition-colors mt-2"
      >
        Create Poll
      </button>
    </form>
  );
};

export default PollForm;

