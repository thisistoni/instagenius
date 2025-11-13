# InstaGenius

Transform your photos into AI-generated creations.

<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

---

## About

**InstaGenius** is a web app that lets you upload a photo, enter a creative prompt, and instantly receive a new AI-generated image powered by Google's Gemini. It's styled for an "Instagram-like" experience with profile previews and fun icons.

## How It Works

- **Upload:** Drag & drop or select an image file (PNG, JPG, or WEBP formats).
- **Prompt:** Enter a creative prompt (example: `Turn me into a superhero, cinematic lighting`).
- **Transform:** The app encodes the image as base64, calls the Gemini API (`gemini-2.5-flash-image`) with your image + prompt, and shows the result.
- **Enjoy:** See your new AI-generated picture in a styled card. Like, comment, or share icons (for UI flair).

## Key Components

- **App.tsx** - Main logic: manages state, uploads, error handling, API call, and rendering.
- **Header** - Banner and subtitle.
- **ImageUploader** - Drag & drop / click-to-upload for user images.
- **PromptInput** - Textarea for prompts with "Enter to submit" and loading states.
- **ImageCard** - Displays the generated image, profile, and icons.
- **Loader** - Loading spinner ("Generating your masterpiece...").
- **Services**
  - **geminiService.ts** - Handles API calls to Google's Gemini, using a base64 image and user prompt.
- **Utils**
  - **fileUtils.ts** - Converts files to base64 for API requests.
- **Styling** via Tailwind CSS.

## Tech Stack

- TypeScript + React (Functional Components)
- Vite (build system)
- Tailwind CSS (styling)
- Gemini API (AI image generation)

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- Google Gemini API key

### Setup & Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variable:**  
   Create `.env.local` in your project root and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**  
   Visit [http://localhost:3000](http://localhost:3000).

## Usage

1. Upload/select a photo (PNG, JPG, WEBP).
2. Type your creative prompt.
3. Click "Generate Image."
4. View and enjoy your AI-generated image!

## Example Prompt Ideas

- “Make me into a cartoon character”
- “Studio portrait with golden hour lighting”
- “Epic fantasy armor, cinematic mood”
- “Retro comic book style, bright colors”

## Powered By

- [Gemini API](https://ai.google.dev/)
- [AI Studio](https://ai.studio/apps/drive/1kjc083qg38XEEzF5iQ3G9nHyCqhBnlpB)

## Project Structure

```
├── App.tsx
├── index.html / index.tsx
├── components/
│   ├── Header.tsx
│   ├── ImageUploader.tsx
│   ├── PromptInput.tsx
│   ├── ImageCard.tsx
│   ├── Loader.tsx
│   └── icons/
├── services/
│   └── geminiService.ts
├── utils/
│   └── fileUtils.ts
├── package.json, vite.config.ts, tsconfig.json, .env.local
```

## Notes

- The app uses environment variables for API keys and expects those to be set up before use.
- Icons and style are handled with SVG and Tailwind CSS for a responsive, modern look.

## License

_No license supplied. Please clarify licensing for production use._

---

Questions or suggestions? Open an issue or PR!
