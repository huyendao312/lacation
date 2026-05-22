import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

interface Props {
  onClose: () => void;
}

export function AIChatSheet({ onClose }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'ai', text: 'Xin chào! I am your AI travel guide. Do you have any questions about your current itinerary or need recommendations nearby?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'That sounds like a great idea! I can help you find more spots like that and adjust your timeline if needed.'
      }]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm">
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full h-[80vh] sm:h-[600px] sm:max-w-md bg-[var(--bg-primary)] rounded-t-[2rem] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[var(--border)]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-2">
            <div className="bg-[var(--accent)] text-white p-1.5 rounded-full">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] leading-tight">AI Travel Guide</h3>
              <span className="text-xs text-[var(--text-secondary)] font-medium">Always here to help</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[var(--bg-primary)] rounded-full transition-colors text-[var(--text-secondary)] active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                  msg.sender === 'ai' ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)]'
                }`}>
                  {msg.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className={`p-3 rounded-2xl text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-tr-sm' 
                    : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-tl-sm border border-[var(--border)]'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex gap-3 max-w-[85%]"
            >
              <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm bg-[var(--accent)] text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] rounded-tl-sm border border-[var(--border)] flex items-center gap-1.5">
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-60" />
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-80" />
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] text-white" />
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[var(--border)] bg-[var(--bg-primary)]">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about your itinerary..."
              className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full py-3.5 pl-5 pr-12 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-2 top-2 p-1.5 bg-[var(--accent)] text-white rounded-full disabled:opacity-50 hover:bg-opacity-90 transition-all active:scale-95"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
