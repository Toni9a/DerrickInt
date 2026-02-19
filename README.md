# Derrick's Interview Command Centre 🚀

A structured React application designed to help Derrick prepare for his Band 5 Clinical Technologist interview at The Christie NHS Foundation Trust.

## Features

- **Interactive Quiz**: 28 questions across 5 categories (Radiation Physics, X-ray Equipment & QA, Radiation Protection, Situational, Dissertation Spotlight).
- **Live Interview Mode**: Voice-to-text recording with AI evaluation using Google Gemini.
- **Study Notes**: Quick reference panel for dose limits, equations, and Christie values.
- **Progress Tracking**: Persistent scoring and category completion status.
- **Bookmarks**: Flag specific questions for focused review.
- **Dark Medical Aesthetic**: Premium dark mode design with grid background.

## Tech Stack

- **Framework**: Vite + React 18
- **Styling**: CSS Modules + Vanilla CSS
- **AI Integration**: Google Gemini (@google/generative-ai)
- **Voice**: Web Speech API

## Setup Instructions

1.  **Clone/Download** the project folder.
2.  **Install Dependencies**:
    ```bash
    cd derrick-interview
    npm install
    ```
3.  **Configure API Key**:
    - Create a `.env` file in the root directory.
    - Add your Google Gemini API key:
      ```
      VITE_GEMINI_API_KEY=your_actual_key_here
      ```
    - You can get a free key from the [Google AI Studio](https://aistudio.google.com/).

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
5.  **Open in Browser**: Navigate to `http://localhost:5173`.

## Live Interview Mode Tips

- Use a Chrome-based browser for the best Speech Recognition support.
- Allow microphone permissions when prompted.
- Wait for the "LISTENING..." indicator before speaking.
- The AI will evaluate your spoken answer against the model explanation and provide a score + feedback.

## Deployment (Vercel)
1. **Push to GitHub**: Push your code to a GitHub repository.
2. **Connect to Vercel**: 
   - Go to [vercel.com](https://vercel.com) and import your repository.
   - Vercel will automatically detect the Vite settings.
3. **Set Environment Variables**:
   - During the import process (or in Project Settings > Environment Variables), add:
     - Key: `VITE_GEMINI_API_KEY`
     - Value: `your_actual_key_here`
4. **Deploy**: Click deploy. Your site will be live on a `.vercel.app` domain!

Good luck, Derrick! You've got this. 💪
