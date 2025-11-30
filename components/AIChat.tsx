import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, User, Bot, Loader2, ShieldCheck } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const MAX_CHARS = 500;
const COOLDOWN_TIME = 2000; // 2 seconds

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Mannat's AI Assistant. I'm secured and ready to answer questions about his skills and projects." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastSentTime, setLastSentTime] = useState(0);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cooldown Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (cooldownRemaining > 0) {
      interval = setInterval(() => {
        setCooldownRemaining(prev => Math.max(0, prev - 100));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [cooldownRemaining]);

  const handleSendMessage = async () => {
    const now = Date.now();
    
    // Validation checks
    if (!inputValue.trim()) return;
    if (inputValue.length > MAX_CHARS) return;
    if (now - lastSentTime < COOLDOWN_TIME) return;

    const userMessage: ChatMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setLastSentTime(now);
    setCooldownRemaining(COOLDOWN_TIME);

    try {
      const responseText = await sendMessageToGemini(userMessage.text);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, something went wrong. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid newline or scrolling issues
      if (!isLoading && cooldownRemaining === 0) {
        handleSendMessage();
      }
    }
  };

  const charsLeft = MAX_CHARS - inputValue.length;

  return (
    <section id="ai-chat" className="py-24 px-6 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-accent/5 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20 mb-4">
                <Sparkles size={16} />
                <span className="text-xs font-bold tracking-wider uppercase">Powered by Gemini 2.5</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Ask My AI</h2>
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                <ShieldCheck size={14} className="text-emerald-500"/>
                <span>Secured & Rate Limited</span>
            </div>
        </div>

        <div className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col h-[500px]">
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'model' ? 'bg-brand-accent text-white' : 'bg-white text-black'}`}>
                            {msg.role === 'model' ? <Bot size={16} /> : <User size={16} />}
                        </div>
                        <div className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                            msg.role === 'model' 
                            ? 'bg-[#1a1a1a] text-gray-200 rounded-tl-none border border-white/5' 
                            : 'bg-white text-black rounded-tr-none'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center">
                            <Bot size={16} />
                        </div>
                        <div className="bg-[#1a1a1a] px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-2">
                             <span className="text-xs text-gray-400">Thinking</span>
                             <Loader2 size={12} className="animate-spin text-gray-400" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#0a0a0a] border-t border-white/10">
                <div className="flex gap-2 relative">
                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value.slice(0, MAX_CHARS))}
                        onKeyDown={handleKeyPress}
                        disabled={isLoading}
                        placeholder="Ex: What programming languages does Mannat know?"
                        className="flex-1 bg-[#1a1a1a] text-white rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-1 focus:ring-brand-accent border border-white/5 placeholder-gray-600 transition-all disabled:opacity-50"
                    />
                    <span className={`absolute right-16 top-1/2 -translate-y-1/2 text-[10px] ${charsLeft < 50 ? 'text-red-500' : 'text-gray-600'}`}>
                        {charsLeft}
                    </span>
                    <button 
                        onClick={handleSendMessage}
                        disabled={isLoading || !inputValue.trim() || cooldownRemaining > 0}
                        className="bg-white text-black w-12 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center relative overflow-hidden"
                    >
                        {cooldownRemaining > 0 ? (
                            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                                <span className="text-xs font-mono font-bold">{(cooldownRemaining/1000).toFixed(1)}</span>
                            </div>
                        ) : (
                            <Send size={20} />
                        )}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default AIChat;