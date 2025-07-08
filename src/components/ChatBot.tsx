import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

// Helper to normalize text: lowercase, remove punctuation, trim spaces
function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Smarter Q&A: each entry has keywords (array) and an answer
const staticQA = [
  {
    keywords: ['hi', 'hello', 'hey'],
    answer: 'Hello! How can I help you today?'
  },
  {
    keywords: [
      'what is this site', 'about this site', 'site about', 'who are you', 'your name', 'who is this'
    ],
    answer: 'This is Mainak Malay Saha’s personal website showcasing projects, experience, and skills in robotics, AI, and more.'
  },
  {
    keywords: [
      'contact', 'how can i reach', 'how do i contact', 'email', 'get in touch'
    ],
    answer: 'You can use the Contact section on this site or email msaha4@asu.edu.'
  },
  {
    keywords: [
      'what more can you tell', 'more about him', 'background', 'biography', 'who is mainak', 'mainak background', 'mainak biography', 'mainak malay saha'
    ],
    answer: "Mainak Malay Saha is a Master's student in Robotics and Autonomous Systems (AI) at Arizona State University. He is passionate about robotics, AI, and real-time systems, and has experience in research, development, and leadership roles."
  },
  {
    keywords: [
      'skills', 'what skills', 'what technologies', 'technologies', 'what does he know', 'what can he do', 'mainak skills', 'mainak technologies', 'mainak tech stack'
    ],
    answer: 'Mainak is skilled in Python, C++, JavaScript, React, Node.js, ROS, OpenCV, TensorFlow, PyTorch, and more. He works with robotics, AI, computer vision, and full-stack development.'
  },
  {
    keywords: [
      'interests', 'what are his interests', 'hobbies', 'what does he like', 'mainak interests', 'mainak hobbies'
    ],
    answer: 'Mainak is interested in robotics, artificial intelligence, computer vision, sports analytics, and building innovative tech solutions. He also enjoys playing football and exploring new technologies.'
  },
  {
    keywords: ['bye', 'goodbye', 'see you'],
    answer: 'Goodbye! Have a great day!'
  },
  {
    keywords: [
      'github', 'github project', 'source code', 'show me your code', 'see your code', 'project code', 'see your github', 'mainak github', 'mainak projects', 'open source'
    ],
    answer: 'You can find Mainak’s projects and source code on his GitHub: <a href="https://github.com/MAINAKSAHA07" target="_blank" rel="noopener noreferrer" class="underline text-blue-600 dark:text-blue-400">github.com/MAINAKSAHA07</a>'
  },
  {
    keywords: [
      'experience', 'work experience', 'his exp', 'mainak experience', 'mainak exp', 'professional background', 'jobs', 'internships', 'work history'
    ],
    answer: `<b>Experience:</b><br/>
- Graduate Research Assistant at ASU Center for Engagement Science – Adidas, ASU (2024–Present): Motion analysis, real-time feedback, iOS/Swift, OpenCV.<br/>
- Data Engineering Intern at Looqup.AI, Boston (2024): Revenue forecasting, MLOps, Azure, Docker.<br/>
- Full-Stack Developer at The Language Network (2021): Built scalable website, SEO, React, Node.js, MongoDB.`
  },
  {
    keywords: [
      'education', 'degree', 'school', 'university', 'mainak education', 'mainak degree', 'academic background'
    ],
    answer: `<b>Education:</b><br/>
- M.S. in Robotics and Autonomous Systems (AI), Arizona State University (2024–2026, expected)<br/>
- B.E. in Computer Engineering, Mumbai University (2020–2024)`
  },
  {
    keywords: [
      'awards', 'achievements', 'honors', 'recognition', 'mainak awards', 'mainak achievements'
    ],
    answer: 'Mainak has received multiple academic scholarships, won hackathons, and has been recognized for his research and leadership in robotics and AI.'
  },
  {
    keywords: [
      'publications', 'papers', 'research papers', 'mainak publications', 'mainak papers'
    ],
    answer: 'Mainak has contributed to research in robotics and AI, with papers in motion analysis and real-time feedback systems. (Ask for more details!)'
  },
  {
    keywords: [
      'fun fact', 'something fun', 'hobbies', 'random', 'tell me something fun', 'mainak fun fact'
    ],
    answer: 'Fun fact: Mainak is a football enthusiast and loves exploring new tech gadgets in his free time!'
  },
  {
    keywords: [
      'thank you', 'thanks', 'appreciate', 'grateful'
    ],
    answer: 'You’re welcome! If you have more questions, just ask.'
  },
  {
    keywords: [
      'how are you', 'how is it going', 'how do you do'
    ],
    answer: 'I’m just a bot, but I’m here to help you 24/7!'
  },
  {
    keywords: [
      'resume', 'cv', 'download resume', 'mainak resume', 'mainak cv'
    ],
    answer: 'You can view or download Mainak’s resume <a href="/assets/MAINAKSAHA_RESUME_jun22.pdf" target="_blank" rel="noopener noreferrer" class="underline text-blue-600 dark:text-blue-400">here</a>.'
  },
  {
    keywords: [
      'blog', 'blogs', 'blog posts', 'mainak blog', 'mainak blogs', 'articles'
    ],
    answer: 'Check out Mainak’s latest blog posts in the Blog section for insights on robotics, AI, and technology!'
  },
  {
    keywords: [
      'projects', 'mainak projects', 'project list', 'show me projects', 'portfolio'
    ],
    answer: 'You can explore Mainak’s projects in the Projects section, including robotics, AI, computer vision, and more!'
  },
];

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

  function getBotResponse(userMsg: string) {
    const normMsg = normalize(userMsg);
    for (const qa of staticQA) {
      for (const keyword of qa.keywords) {
        const normKeyword = normalize(keyword);
        if (normKeyword.split(' ').length === 1) {
          // Single word: match as whole word
          const regex = new RegExp(`\\b${normKeyword}\\b`);
          if (regex.test(normMsg)) {
            return qa.answer;
          }
        } else {
          // Phrase: match as substring
          if (normMsg.includes(normKeyword)) {
            return qa.answer;
          }
        }
      }
    }
    return defaultResponse;
  }

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((msgs) => [...msgs, { from: 'user', text: userMsg }]);
    setInput('');
    setTimeout(() => {
      const response = getBotResponse(userMsg);
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
        {/* Custom icon: Favicon image */}
        <img src="/src/IMages/favicon-32x32.png" alt="Chat Icon" className="w-7 h-7 rounded-full border-2 border-blue-600 bg-white shadow-md object-cover" />
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
                  {msg.from === 'bot' && msg.text.includes('<a')
                    ? <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                    : msg.text}
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