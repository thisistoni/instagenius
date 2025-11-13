import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptInput } from './components/PromptInput';
import { ImageCard } from './components/ImageCard';
import { Loader } from './components/Loader';
import { generateImage, generatePromptSuggestions, enhancePrompt } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { PromptSuggestions } from './components/PromptSuggestions';
import { StylePresets } from './components/StylePresets';

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
  const [promptSuggestions, setPromptSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState<boolean>(false);
  const [isEnhancingPrompt, setIsEnhancingPrompt] = useState<boolean>(false);

  const handleImageUpload = (file: File) => {
    setImageFile({
      file,
      previewUrl: URL.createObjectURL(file),
    });
    setGeneratedImageUrl(null);
    setError(null);
  };
  
  const getSuggestions = useCallback(async () => {
    if (!imageFile) return;

    setIsLoadingSuggestions(true);
    setPromptSuggestions([]); // Clear old ones
    try {
        const { base64, mimeType } = await fileToBase64(imageFile.file);
        const suggestions = await generatePromptSuggestions(base64, mimeType);
        setPromptSuggestions(suggestions);
    } catch (err) {
        console.error("Failed to get prompt suggestions:", err);
        setPromptSuggestions([]); 
    } finally {
        setIsLoadingSuggestions(false);
    }
  }, [imageFile]);

  useEffect(() => {
    if (imageFile) {
        getSuggestions();
    } else {
        setPromptSuggestions([]);
    }
  }, [imageFile, getSuggestions]);


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

  const handleEnhancePrompt = useCallback(async () => {
    if (!prompt.trim() || isEnhancingPrompt) return;

    setIsEnhancingPrompt(true);
    try {
      const enhanced = await enhancePrompt(prompt);
      setPrompt(enhanced);
    } catch (err) {
      console.error("Failed to enhance prompt:", err);
      // Error is handled in the service, which returns the original prompt
    } finally {
      setIsEnhancingPrompt(false);
    }
  }, [prompt, isEnhancingPrompt]);

  const handleStartOver = () => {
    setImageFile(null);
    setPrompt('');
    setGeneratedImageUrl(null);
    setError(null);
    setIsLoading(false);
    setIsEnhancingPrompt(false);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
  };
  
  const handleSelectPreset = (keywords: string) => {
    setPrompt(prev => {
        if (prev.trim() === '') return keywords.substring(2); // remove leading ", "
        if (prev.endsWith(' ') || prev.endsWith(',')) return prev + keywords.substring(1); // remove leading ","
        return prev + keywords;
    });
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
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img src={imageFile.previewUrl} alt="Uploaded preview" className="w-40 h-40 object-cover rounded-xl shadow-md flex-shrink-0" />
              <div className="flex-grow flex flex-col gap-4 w-full">
                <PromptInput
                  prompt={prompt}
                  setPrompt={setPrompt}
                  onSubmit={handleGenerateClick}
                  isLoading={isLoading}
                  onEnhancePrompt={handleEnhancePrompt}
                  isEnhancingPrompt={isEnhancingPrompt}
                />
                <PromptSuggestions
                  suggestions={promptSuggestions}
                  isLoading={isLoadingSuggestions}
                  onSelectSuggestion={handleSelectSuggestion}
                  onRefresh={getSuggestions}
                />
              </div>
            </div>
            <StylePresets onSelectPreset={handleSelectPreset} />
             <button
                onClick={handleStartOver}
                className="text-sm text-center text-gray-400 hover:text-white transition-colors duration-200 self-center"
              >
                Start with a different photo
              </button>
          </div>
        )}

        {isLoading && (
            <div className="relative w-full max-w-md flex items-center justify-center my-8">
                {imageFile && (
                    <img 
                        src={imageFile.previewUrl} 
                        alt="Generating from" 
                        className="w-full max-w-md object-cover rounded-2xl shadow-lg opacity-30 filter blur-md"
                    />
                )}
                <div className="absolute">
                    <Loader />
                </div>
            </div>
        )}

        {error && (
          <div className="bg-red-900/50 text-red-300 p-4 rounded-lg w-full text-center">
            <strong>Error:</strong> {error}
          </div>
        )}

        {generatedImageUrl && !isLoading && (
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