import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

interface ImageCardProps {
  imageUrl: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({ imageUrl }) => {

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'instagenius-creation.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-3">
          <img
            src="https://picsum.photos/seed/ai-user/40/40"
            alt="User avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="font-bold text-white">InstaGenius</div>
        </div>
        <button 
          onClick={handleDownload} 
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Download image"
        >
          <DownloadIcon className="w-6 h-6 text-gray-300" />
        </button>
      </div>

      <img src={imageUrl} alt="Generated" className="w-full h-auto object-cover" />

      <div className="p-4">
        <div className="flex items-center gap-4">
          <HeartIcon />
          <CommentIcon />
          <ShareIcon />
        </div>
        <p className="text-gray-400 text-sm mt-3">
          <span className="font-bold text-white">InstaGenius</span> Your awesome new AI-generated instagram post! ✨
        </p>
      </div>
    </div>
  );
};

// SVG Icon components
const HeartIcon = () => (
  <svg className="w-7 h-7 text-gray-300 hover:text-red-500 transition-colors cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"></path></svg>
);
const CommentIcon = () => (
  <svg className="w-7 h-7 text-gray-300 hover:text-white transition-colors cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
);
const ShareIcon = () => (
    <svg className="w-7 h-7 text-gray-300 hover:text-white transition-colors cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
);