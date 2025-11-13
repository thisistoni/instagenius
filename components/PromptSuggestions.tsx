import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { RefreshIcon } from './icons/RefreshIcon';

interface PromptSuggestionsProps {
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
  isLoading: boolean;
  onRefresh: () => void;
}

export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ suggestions, onSelectSuggestion, isLoading, onRefresh }) => {
  if (!isLoading && suggestions.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-2">
      <h3 className="text-sm font-semibold text-gray-400 mb-2 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <SparklesIcon className="w-4 h-4 text-pink-400" />
          Inspiration:
        </span>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-1 rounded-full hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Get new suggestions"
        >
          <RefreshIcon className={`w-4 h-4 text-gray-300 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </h3>
      {isLoading ? (
        <div className="text-sm text-gray-400">Generating ideas...</div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSelectSuggestion(suggestion)}
              className="px-3 py-1.5 text-sm bg-gray-700 text-gray-200 rounded-full hover:bg-pink-500 hover:text-white transition-all duration-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
