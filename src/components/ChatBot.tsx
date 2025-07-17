import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = import.meta.env.VITE_GEMINI_API_KEY 
  ? new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
  : null;

// System context about Mainak
const systemContext = `You are Mainak Malay Saha's AI assistant on his personal website. Here's information about him:

**About Mainak:**
- Master's student in Robotics and Autonomous Systems (AI) at Arizona State University (2024-2026)
- Bachelor's in Computer Engineering from Mumbai University (2020-2024)
- Passionate about robotics, AI, computer vision, and real-time systems

**Experience:**
- Graduate Research Assistant at ASU Center for Engagement Science – Adidas, ASU (2024–Present): Motion analysis, real-time feedback, iOS/Swift, OpenCV
- Data Engineering Intern at Looqup.AI, Boston (2024): Revenue forecasting, MLOps, Azure, Docker
- Full-Stack Developer at The Language Network (2021): Built scalable website, SEO, React, Node.js, MongoDB

**Skills:**
- Programming: Python, C++, JavaScript, TypeScript, Swift
- Frameworks: React, Node.js, ROS, OpenCV, TensorFlow, PyTorch
- Technologies: AI/ML, Computer Vision, Robotics, Full-stack development
- Tools: Docker, Azure, Firebase, MongoDB

**Contact:**
- Email: msaha4@asu.edu
- GitHub: https://github.com/MAINAKSAHA07
- Resume: Available on the website

**Interests:**
- Robotics and AI research
- Sports analytics and computer vision
- Football enthusiast
- Building innovative tech solutions

Keep responses concise, helpful, and friendly. If asked about topics outside of Mainak's background, politely redirect to his expertise areas or suggest contacting him directly.`;

interface Message {
  from: 'user' | 'bot';
  text: string;
  timestamp?: Date;
}

const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Hi! I am Mainak\'s AI assistant. How can I help you learn more about Mainak\'s work and experience?', timestamp: new Date() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const getBotResponse = async (userMsg: string): Promise<string> => {
    try {
      const model = genAI?.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `${systemContext}

User Question: ${userMsg}

Please provide a helpful response about Mainak Malay Saha based on the context provided. Keep it concise and friendly.`;

      const result = await model?.generateContent(prompt);
      const response = await result?.response;
      return response?.text() || '';
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return "I'm sorry, I'm having trouble connecting right now. Please try again later or contact Mainak directly at msaha4@asu.edu.";
    }
  };

  const fallbackResponses = {
    greeting: "Hello! I'm Mainak's AI assistant. I'd love to help you learn more about his work and experience!",
    experience: "Mainak is currently a Graduate Research Assistant at ASU Center for Engagement Science working with Adidas on motion analysis and real-time feedback systems. He has also worked as a Data Engineering Intern at Looqup.AI and as a Full-Stack Developer at The Language Network.",
    skills: "Mainak is skilled in Python, C++, JavaScript, TypeScript, Swift, React, Node.js, ROS, OpenCV, TensorFlow, PyTorch, Docker, Azure, and Firebase. He specializes in AI/ML, Computer Vision, Robotics, and Full-stack development.",
    education: "Mainak is pursuing his Master's in Robotics and Autonomous Systems (AI) at Arizona State University (2024-2026) and completed his Bachelor's in Computer Engineering from Mumbai University (2020-2024).",
    contact: "You can reach Mainak at msaha4@asu.edu or check out his projects on GitHub at https://github.com/MAINAKSAHA07",
    default: "I'm here to help you learn about Mainak's background in robotics, AI, and software development. Feel free to ask about his experience, skills, education, or projects!"
  };

  const getKeywords = (text: string) => text.toLowerCase().split(' ');

  const getFallbackResponse = (userMsg: string): string => {
    const keywords = getKeywords(userMsg);
    
    if (keywords.some(word => ['hi', 'hello', 'hey', 'greetings'].includes(word))) {
      return fallbackResponses.greeting;
    }
    
    if (keywords.some(word => ['experience', 'work', 'job', 'position', 'role'].includes(word))) {
      return fallbackResponses.experience;
    }
    
    if (keywords.some(word => ['skills', 'technologies', 'programming', 'languages', 'tools'].includes(word))) {
      return fallbackResponses.skills;
    }
    
    if (keywords.some(word => ['education', 'degree', 'university', 'college', 'study'].includes(word))) {
      return fallbackResponses.education;
    }
    
    if (keywords.some(word => ['contact', 'email', 'reach', 'github', 'connect'].includes(word))) {
      return fallbackResponses.contact;
    }
    
    return fallbackResponses.default;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setMessages((msgs) => [...msgs, { from: 'user', text: userMsg, timestamp: new Date() }]);
    setInput('');
    setIsLoading(true);
    
    try {
      let response;
      if (genAI) {
        response = await getBotResponse(userMsg);
      } else {
        response = getFallbackResponse(userMsg);
      }
      setMessages((msgs) => [...msgs, { from: 'bot', text: response, timestamp: new Date() }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((msgs) => [...msgs, { 
        from: 'bot', 
        text: "I apologize, but I'm having trouble processing your request right now. Please try again later.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
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
              placeholder="Ask about Mainak's experience, projects, or skills..."
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
