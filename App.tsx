
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptInput } from './components/PromptInput';
import { ImageCard } from './components/ImageCard';
import { Loader } from './components/Loader';
import { generateImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';

type ImageFile = {
  file: File;
  previewUrl: string;
};

export default function App() {
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setImageFile({
      file,
      previewUrl: URL.createObjectURL(file),
    });
    setGeneratedImageUrl(null);
    setError(null);
  };

  const handleGenerateClick = useCallback(async () => {
    if (!imageFile || !prompt) {
      setError('Please upload an image and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const { base64, mimeType } = await fileToBase64(imageFile.file);
      const newImageUrl = await generateImage(base64, mimeType, prompt);
      setGeneratedImageUrl(newImageUrl);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, prompt]);

  const handleStartOver = () => {
    setImageFile(null);
    setPrompt('');
    setGeneratedImageUrl(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 mt-8">
        {!imageFile && (
          <ImageUploader onImageUpload={handleImageUpload} />
        )}

        {imageFile && (
          <div className="w-full bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col gap-6 transition-all duration-500 ease-in-out">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <img src={imageFile.previewUrl} alt="Uploaded preview" className="w-40 h-40 object-cover rounded-xl shadow-md" />
              <div className="flex-grow">
                <PromptInput
                  prompt={prompt}
                  setPrompt={setPrompt}
                  onSubmit={handleGenerateClick}
                  isLoading={isLoading}
                />
              </div>
            </div>
             <button
                onClick={handleStartOver}
                className="text-sm text-center text-gray-400 hover:text-white transition-colors duration-200"
              >
                Start with a different photo
              </button>
          </div>
        )}

        {isLoading && <Loader />}

        {error && (
          <div className="bg-red-900/50 text-red-300 p-4 rounded-lg w-full text-center">
            <strong>Error:</strong> {error}
          </div>
        )}

        {generatedImageUrl && (
          <div className="w-full flex flex-col items-center gap-4 animate-fade-in">
             <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">Your AI-Generated Image!</h2>
            <ImageCard imageUrl={generatedImageUrl} />
          </div>
        )}
      </main>
      <footer className="text-center p-4 mt-auto text-gray-500 text-sm">
        Powered by Gemini
      </footer>
    </div>
  );
}

// Add fade-in animation to tailwind config (or here in a style tag for simplicity, though not ideal)
const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-in-out;
}
`;
document.head.appendChild(style);
