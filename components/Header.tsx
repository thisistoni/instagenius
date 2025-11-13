
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
  return (
    <header className="text-center w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-center gap-3">
        <SparklesIcon className="w-10 h-10 text-pink-400" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          InstaGenius
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-400">
        Transform your photos into stunning, AI-powered creations.
      </p>
    </header>
  );
};
