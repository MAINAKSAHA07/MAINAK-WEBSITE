import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const staticResponses: { [key: string]: string } = {
  'hi': 'Hello! How can I help you today?',
  'hello': 'Hi there! Ask me anything about this website.',
  'what is this site?': 'This is Mainak Malay Saha’s personal website showcasing projects, experience, and skills in robotics, AI, and more.',
  'how can i contact you?': 'You can use the Contact section on this site or email msaha4@asu.edu.',
  'who are you?': 'I am an AI bot for Mainak’s website. Mainak is a Robotics & AI enthusiast at ASU.',
  'bye': 'Goodbye! Have a great day!',
};

const defaultResponse = "I'm Mainak's AI assistant. Try asking about the site, contact, or say hi!";

const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ from: 'user' | 'bot'; text: string }>>([
    { from: 'bot', text: 'Hi! I am Mainak\'s AI assistant. How can I help you?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((msgs) => [...msgs, { from: 'user', text: userMsg }]);
    setInput('');
    setTimeout(() => {
      const key = userMsg.toLowerCase();
      const response = staticResponses[key] || defaultResponse;
      setMessages((msgs) => [...msgs, { from: 'bot', text: response }]);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating chat bubble */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-colors"
        onClick={() => setOpen(true)}
        style={{ display: open ? 'none' : 'flex' }}
        aria-label="Open chat bot"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-[90vw] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between px-4 py-3 bg-blue-600 dark:bg-blue-800 text-white">
            <span className="font-semibold">AI Assistant</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="hover:text-blue-200">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 px-4 py-2 overflow-y-auto bg-slate-50 dark:bg-slate-800" style={{ minHeight: 200, maxHeight: 320 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${msg.from === 'user' ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex items-center border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-2">
            <input
              type="text"
              className="flex-1 bg-transparent outline-none px-2 py-1 text-sm text-slate-800 dark:text-slate-100"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button
              className="ml-2 p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
              onClick={handleSend}
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