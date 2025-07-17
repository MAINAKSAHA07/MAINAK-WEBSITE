# Gemini AI ChatBot Setup

## Overview
The ChatBot component has been upgraded to use Google's Gemini AI for intelligent conversations about Mainak's background, skills, and experience.

## Setup Instructions

### 1. Get a Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a new project or select an existing one
3. Generate an API key for the Gemini API
4. Copy the API key

### 2. Configure Environment Variables
1. Open the `.env` file in the project root
2. Replace `your_gemini_api_key_here` with your actual API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

### 3. Features

#### Enhanced UI
- Modern chat interface with user and bot avatars
- "Gemini" badge in the header
- Loading animation with bouncing dots
- Improved styling with gradient backgrounds

#### Smart Responses
- Powered by Gemini 1.5 Flash model
- Context-aware responses about Mainak's background
- Fallback error handling for API failures
- Comprehensive system context about Mainak's experience, skills, and projects

#### Technical Improvements
- Async/await for API calls
- Loading states and error handling
- TypeScript interfaces for type safety
- Optimized message handling

## Usage
The chatbot will automatically use the Gemini API when users interact with it. If the API key is not configured or there are connection issues, it will show appropriate error messages.

## Testing
1. Start the development server: `npm run dev`
2. Click on the chat bubble in the bottom-right corner
3. Ask questions about Mainak's experience, skills, or projects
4. The bot should respond with intelligent, context-aware answers

## Dependencies
- `@google/generative-ai`: Already installed in package.json
- `lucide-react`: For icons (Bot, User, MessageCircle, X, Send)
- `react`: For component state and lifecycle management
