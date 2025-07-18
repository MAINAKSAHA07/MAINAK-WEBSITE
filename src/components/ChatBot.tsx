import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = import.meta.env.VITE_GEMINI_API_KEY 
  ? new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
  : null;

// Debug: Check if API key is loaded
console.log('Gemini API Key loaded:', !!import.meta.env.VITE_GEMINI_API_KEY);

interface Message {
  from: 'user' | 'bot';
  text: string;
  timestamp?: Date;
}

const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Hi there! 👋 I\'m Mainak\'s AI assistant. I can help you learn about his robotics projects, AI research, experience, and skills. I can also answer general questions! What would you like to know?', timestamp: new Date() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  // Cache for responses to avoid repeated API calls
  const responseCache = useRef<Map<string, string>>(new Map());

  // Check if question is specifically about Mainak (use fallback for speed)
  const isMainakSpecific = (userMsg: string): boolean => {
    const mainakKeywords = [
      'mainak', 'your', 'his', 'contact', 'email', 'github', 
      'skills', 'experience', 'education', 'projects', 'resume', 'cv'
    ];
    const normalizedMsg = userMsg.toLowerCase();
    return mainakKeywords.some(keyword => normalizedMsg.includes(keyword));
  };

  const getBotResponse = async (userMsg: string): Promise<string> => {
    // Check cache first
    const cacheKey = userMsg.toLowerCase().trim();
    if (responseCache.current.has(cacheKey)) {
      return responseCache.current.get(cacheKey)!;
    }

    // Only use fallback if genAI is not available
    if (!genAI) {
      const response = getFallbackResponse(userMsg);
      responseCache.current.set(cacheKey, response);
      return response;
    }

    try {
      console.log('Attempting to call Gemini API...');
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: {
          maxOutputTokens: 300, // Increased for better responses
          temperature: 0.7,
        },
      });
      
      // Enhanced prompt for all questions
      const prompt = `You are Mainak Malay Saha's AI assistant on his personal website. You're knowledgeable, helpful, and can answer both questions about Mainak and general topics.

About Mainak:
- MS in Robotics & Autonomous Systems (AI) at Arizona State University
- Graduate Research Assistant working on motion analysis & real-time feedback with Adidas
- Skilled in Python, C++, JavaScript, React, AI/ML, Robotics, Computer Vision
- Email: msaha4@asu.edu | GitHub: github.com/MAINAKSAHA07

User Question: ${userMsg}

Instructions:
- Answer any question helpfully and accurately
- If it's about Mainak, provide specific details from his background
- If it's a general question (science, math, technology, programming, etc.), answer knowledgeably
- If it's about AI/ML/Robotics, you can reference how it relates to Mainak's work
- Keep responses informative but conversational
- Use emojis sparingly for friendliness
- If you're unsure about something, be honest about it

Response:`;

      // Set a timeout for the API call
      const timeoutPromise = new Promise<string>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 10000) // Increased timeout
      );

      const apiPromise = model.generateContent(prompt).then(result => {
        console.log('Gemini API response received');
        return result.response.text();
      });

      const response = await Promise.race([apiPromise, timeoutPromise]);
      console.log('Response:', response);
      responseCache.current.set(cacheKey, response);
      return response;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorObj = error as Error;
      console.error('Error details:', {
        message: errorObj.message,
        name: errorObj.name,
        stack: errorObj.stack
      });
      
      // Provide a more helpful error message
      const errorMessage = `I'm having trouble connecting to my AI service right now. Error: ${errorObj.message}. For questions about Mainak, I can still help with his experience, skills, projects, and contact info. Please try again in a moment!`;
      responseCache.current.set(cacheKey, errorMessage);
      return errorMessage;
    }
  };

  const fallbackResponses = {
    greeting: "Hi! 👋 I'm Mainak's AI assistant. I can help with questions about Mainak's work, or answer general questions too!",
    experience: "🎓 Mainak is a Graduate Research Assistant at ASU working with Adidas on motion analysis & real-time feedback. Previously: Data Engineering Intern at Looqup.AI (Boston) and Full-Stack Developer at The Language Network.",
    skills: "💻 **Tech Stack:** Python, C++, JavaScript, React, Node.js, ROS, OpenCV, TensorFlow, PyTorch, Docker, Azure, Firebase. **Specialties:** AI/ML, Computer Vision, Robotics, Full-stack development.",
    education: "🎓 **Current:** MS in Robotics & Autonomous Systems (AI) at Arizona State University (2024-2026). **Previous:** BE in Computer Engineering, Mumbai University (2020-2024).",
    contact: "📧 Email:msaha4@asu.edu | 💻 GitHub: [github.com/MAINAKSAHA07](https://github.com/MAINAKSAHA07) | 📄 **Resume:** Available on this website!",
    projects: "🚀 Check out the Projects section to see Mainak's work in robotics, AI, computer vision, sports analytics, and full-stack development!",
    research: "🔬 Mainak's current research focuses on motion analysis and real-time feedback systems using AI/ML, computer vision, and iOS development at ASU's Center for Engagement Science.",
    general: "I'm Mainak's AI assistant and I can help with both questions about Mainak and general topics! What would you like to know?",
    default: "I'm here to help with questions about Mainak's background in robotics, AI, and software development, or I can try to answer general questions too! What can I help you with? 🤖"
  };

  const getKeywords = (text: string) => text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);

  const getFallbackResponse = (userMsg: string): string => {
    const keywords = getKeywords(userMsg);
    
    // Mainak-specific questions
    if (keywords.some(word => ['experience', 'work', 'job', 'position', 'role', 'career', 'employment'].includes(word))) {
      return fallbackResponses.experience;
    }
    
    if (keywords.some(word => ['skills', 'technologies', 'programming', 'languages', 'tools', 'tech', 'stack'].includes(word))) {
      return fallbackResponses.skills;
    }
    
    if (keywords.some(word => ['education', 'degree', 'university', 'college', 'study', 'school', 'academic'].includes(word))) {
      return fallbackResponses.education;
    }
    
    if (keywords.some(word => ['contact', 'email', 'reach', 'github', 'connect', 'social'].includes(word))) {
      return fallbackResponses.contact;
    }
    
    if (keywords.some(word => ['projects', 'portfolio', 'work', 'built', 'created', 'developed'].includes(word))) {
      return fallbackResponses.projects;
    }
    
    if (keywords.some(word => ['research', 'paper', 'publication', 'study', 'analysis'].includes(word))) {
      return fallbackResponses.research;
    }
    
    // General greetings
    if (keywords.some(word => ['hi', 'hello', 'hey', 'greetings'].includes(word))) {
      return fallbackResponses.greeting;
    }
    
    // For general questions when API is not available
    return "I'd love to help answer that! However, I need my full AI capabilities for general questions. For now, I can quickly answer questions about Mainak's experience, skills, education, projects, or contact info. What would you like to know about Mainak?";
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setMessages((msgs) => [...msgs, { from: 'user', text: userMsg, timestamp: new Date() }]);
    setInput('');
    setIsLoading(true);
    
    // For very common queries, respond immediately
    const quickResponse = getQuickResponse(userMsg);
    if (quickResponse) {
      setTimeout(() => {
        setMessages((msgs) => [...msgs, { from: 'bot', text: quickResponse, timestamp: new Date() }]);
        setIsLoading(false);
      }, 200); // Small delay to feel natural
      return;
    }
    
    try {
      const response = await getBotResponse(userMsg);
      setMessages((msgs) => [...msgs, { from: 'bot', text: response, timestamp: new Date() }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((msgs) => [...msgs, { 
        from: 'bot', 
        text: getFallbackResponse(userMsg),
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Quick responses for instant feedback
  const getQuickResponse = (userMsg: string): string | null => {
    const msg = userMsg.toLowerCase();
    
    if (/^(hi|hello|hey)$/i.test(userMsg.trim())) {
      return "Hi there! 👋 I'm Mainak's AI assistant. I can answer questions about Mainak's work or help with general questions too. What would you like to know?";
    }
    
    if (msg.includes('thank') || msg.includes('thanks')) {
      return "You're welcome! Feel free to ask anything else - about Mainak's projects, experience, or any general questions! 😊";
    }
    
    if (msg.includes('bye') || msg.includes('goodbye')) {
      return "Goodbye! Thanks for visiting Mainak's website. Have a great day! 👋";
    }
    
    // No quick response for other questions - let them go through AI processing
    return null;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating chat bubble */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full p-3 md:p-4 lg:p-5 shadow-lg shadow-blue-500/25 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/40"
        onClick={() => setOpen(true)}
        style={{ display: open ? 'none' : 'flex' }}
        aria-label="Open chat bot"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
          <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-[90vw] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">Mainak's Assistant</span>
              {/* <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Gemini</span> */}
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="hover:text-blue-200 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 px-4 py-2 overflow-y-auto bg-slate-50 dark:bg-slate-800" style={{ minHeight: 200, maxHeight: 320 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`mb-3 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-[85%] ${msg.from === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    msg.from === 'user' 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                      : 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                  }`}>
                    {msg.from === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`px-3 py-2 rounded-lg text-sm ${
                    msg.from === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-600'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="flex items-start space-x-2 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-3 py-2 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-600">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="flex items-center border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-3">
            <input
              type="text"
              className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Ask about Mainak, or any general question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              autoFocus
            />
            <button
              className={`ml-2 p-2 rounded-full transition-all ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105'
              } text-white flex items-center justify-center`}
              onClick={handleSend}
              disabled={isLoading}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
