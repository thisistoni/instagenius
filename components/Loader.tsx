
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 my-8">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-pink-500"></div>
      <p className="text-gray-400 text-lg">Generating your masterpiece...</p>
    </div>
  );
};
