import React from 'react';

interface StylePreset {
  name: string;
  keywords: string;
}

const presets: StylePreset[] = [
  { name: 'Cinematic', keywords: ', cinematic lighting, hyperdetailed, epic composition, 8k' },
  { name: 'Anime', keywords: ', anime style, key visual, vibrant, studio ghibli inspired' },
  { name: 'Vintage', keywords: ', vintage photo, 1970s, grainy, faded colors' },
  { name: 'Watercolor', keywords: ', watercolor painting, splashes of color, paper texture' },
  { name: 'Cyberpunk', keywords: ', cyberpunk theme, neon lights, futuristic, dystopian city' },
];

interface StylePresetsProps {
  onSelectPreset: (keywords: string) => void;
}

export const StylePresets: React.FC<StylePresetsProps> = ({ onSelectPreset }) => {
  return (
    <div className="w-full pt-4 border-t border-gray-700/50">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">
            Add a Style:
        </h3>
        <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
                <button
                    key={preset.name}
                    onClick={() => onSelectPreset(preset.keywords)}
                    className="px-3 py-1.5 text-sm bg-gray-700/50 border border-gray-600 text-gray-300 rounded-full hover:bg-violet-500 hover:text-white hover:border-violet-500 transition-all duration-200"
                >
                    + {preset.name}
                </button>
            ))}
        </div>
    </div>
  );
};
