import React, { useState, useEffect, useRef } from 'react';
import { AgentItem, ChatMessage, ChatScenario } from '../types';

interface Props {
  agent: AgentItem;
}

export const PrototypeView: React.FC<Props> = ({ agent }) => {
  const [activeScenario, setActiveScenario] = useState<ChatScenario | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasAutoPlayed = useRef(false);

  // Download states
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadingFile, setDownloadingFile] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [downloadedFile, setDownloadedFile] = useState<string>("");

  // Handle download click
  const handleDownload = (filename: string) => {
    setDownloadingFile(filename);
    setIsDownloading(true);

    // Simulate download delay
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadedFile(filename);
      setShowSuccessModal(true);

      // Auto-hide success modal after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    }, 1500);
  };

  // Format message text with markdown-like formatting and clickable download links
  const formatMessage = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Check if line contains a download link pattern: **[text]** followed by filename
      const downloadLinkMatch = line.match(/^(.*?)\*\*\[(.*?)\]\*\*\s+(.+)$/);

      if (downloadLinkMatch) {
        const [, prefix, buttonText, filename] = downloadLinkMatch;
        return (
          <div key={idx} className={idx > 0 ? 'mt-1' : ''}>
            {prefix}
            <button
              onClick={() => handleDownload(filename.trim())}
              className="text-blue-600 hover:text-blue-800 underline cursor-pointer font-normal transition-colors"
            >
              {buttonText}
            </button>
            <span className="ml-1 text-slate-700">{filename}</span>
          </div>
        );
      }

      // Handle regular bold text **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formatted = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={partIdx}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <div key={idx} className={idx > 0 ? 'mt-1' : ''}>
          {formatted}
        </div>
      );
    });
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle Scenario Playback
  const playScenario = async (scenario: ChatScenario) => {
    if (isTyping) return; // Prevent double clicks
    setActiveScenario(scenario);
    setMessages([]); // Clear chat
    setIsTyping(false);

    // Play script
    // We iterate through the script with delays to simulate conversation
    let currentMsgs: ChatMessage[] = [];

    for (const msg of scenario.script) {
      if (msg.role === 'user') {
        // User messages appear instantly (or after a tiny delay)
        await new Promise(resolve => setTimeout(resolve, 800));
        currentMsgs = [...currentMsgs, msg];
        setMessages(currentMsgs);
      } else {
        // Agent thinks before typing
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsTyping(false);
        currentMsgs = [...currentMsgs, msg];
        setMessages(currentMsgs);
      }
    }
  };

  // Auto-play the first scenario when component mounts
  useEffect(() => {
    if (agent.chatScenarios.length > 0 && !hasAutoPlayed.current) {
      hasAutoPlayed.current = true;
      playScenario(agent.chatScenarios[0]);
    }
  }, [agent]);
  
  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">

      {/* Animated Gradient Header */}
      <div className="h-8 bg-slate-900 relative overflow-hidden">
        {/* Pulsing green glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sprout-400/60 to-transparent animate-pulse-slow"></div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-slate-50/50 p-6 overflow-y-auto space-y-4">
        
        {/* Welcome Message / Empty State */}
        {messages.length === 0 && !isTyping && (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center space-y-3 opacity-70">
             <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-xl mb-2">👋</div>
             <p className="text-sm">Select a scenario below to<br/>preview this agent's capabilities.</p>
          </div>
        )}

        {/* Message History */}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
            <div className={`max-w-[85%] px-4 py-3 text-sm shadow-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-slate-900 text-white rounded-2xl rounded-tr-sm'
                : 'bg-white text-slate-700 border border-slate-200 rounded-2xl rounded-tl-sm'
            }`}>
              {formatMessage(msg.text)}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
             <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
             </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Scenario Buttons */}
      <div className="bg-white p-6 border-t border-slate-100 shrink-0">
        <div className="flex flex-wrap gap-2">
          {agent.chatScenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => playScenario(scenario)}
              disabled={isTyping}
              className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all text-left flex items-center gap-2
                ${activeScenario?.id === scenario.id
                  ? 'bg-sprout-50 border-sprout-200 text-sprout-700 shadow-sm ring-1 ring-sprout-200'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-sprout-300 hover:text-sprout-600'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <span className="text-base">⚡️</span>
              {scenario.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Overlay */}
      {isDownloading && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 rounded-xl">
          <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-sprout-200 border-t-sprout-600 rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-700">Downloading {downloadingFile}...</p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 rounded-xl animate-fade-in">
          <div className="bg-white rounded-lg shadow-2xl p-6 flex flex-col items-center gap-3 animate-scale-in">
            <div className="w-12 h-12 bg-sprout-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-sprout-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div className="text-center">
              <p className="text-base font-bold text-slate-900">Download Complete!</p>
              <p className="text-sm text-slate-600 mt-1">{downloadedFile}</p>
            </div>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-2 px-4 py-2 bg-sprout-500 hover:bg-sprout-600 text-white text-sm font-medium rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};