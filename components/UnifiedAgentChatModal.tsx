import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToClaude, Message } from '../services/claudeService';
import { FloatingOrbs } from './FloatingOrbs';

interface Props {
  onBack: () => void;
}

export const UnifiedAgentChatModal: React.FC<Props> = ({ onBack }) => {
  const [apiKey, setApiKey] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingMessage]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    if (!apiKey) {
      setShowApiKeyModal(true);
      return;
    }

    const userMessage: Message = { role: 'user', content: textToSend };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setStreamingMessage('');

    try {
      let fullResponse = '';
      await sendMessageToClaude(
        updatedMessages,
        apiKey,
        (chunk) => {
          fullResponse += chunk;
          setStreamingMessage(fullResponse);
        }
      );

      const assistantMessage: Message = { role: 'assistant', content: fullResponse };
      setMessages([...updatedMessages, assistantMessage]);
      setStreamingMessage('');
    } catch (error: any) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: `Error: ${error.message}. Please check your API key and try again.`,
      };
      setMessages([...updatedMessages, errorMessage]);
      setStreamingMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  // Format message content to render markdown (bold and links)
  const formatMessageContent = (content: string) => {
    const parts: React.ReactNode[] = [];
    let remainingText = content;
    let keyCounter = 0;

    // Process the text to handle both bold and links
    const processText = (text: string): React.ReactNode[] => {
      const result: React.ReactNode[] = [];
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const boldRegex = /\*\*([^*]+)\*\*/g;

      let lastIndex = 0;
      const tokens: Array<{ type: 'link' | 'bold' | 'text'; start: number; end: number; data?: any }> = [];

      // Find all links
      let match;
      while ((match = linkRegex.exec(text)) !== null) {
        tokens.push({
          type: 'link',
          start: match.index,
          end: match.index + match[0].length,
          data: { text: match[1], url: match[2] }
        });
      }

      // Find all bold text
      while ((match = boldRegex.exec(text)) !== null) {
        tokens.push({
          type: 'bold',
          start: match.index,
          end: match.index + match[0].length,
          data: { text: match[1] }
        });
      }

      // Sort tokens by start position
      tokens.sort((a, b) => a.start - b.start);

      // Build the result
      tokens.forEach((token) => {
        // Add text before token
        if (token.start > lastIndex) {
          result.push(text.substring(lastIndex, token.start));
        }

        // Add the formatted token
        if (token.type === 'link') {
          result.push(
            <a
              key={`link-${keyCounter++}`}
              href={token.data.url}
              className="text-blue-600 underline hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              {token.data.text}
            </a>
          );
        } else if (token.type === 'bold') {
          result.push(
            <strong key={`bold-${keyCounter++}`}>{token.data.text}</strong>
          );
        }

        lastIndex = token.end;
      });

      // Add remaining text
      if (lastIndex < text.length) {
        result.push(text.substring(lastIndex));
      }

      return result.length > 0 ? result : [text];
    };

    return processText(content);
  };

  return (
    <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center animate-fade-in overflow-hidden">

      {/* Floating Orbs Background */}
      <FloatingOrbs />

      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-8 left-8 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
        </svg>
        <span className="font-medium">Back to Roadmap</span>
      </button>

      {/* API Key Input */}
      <div className="fixed top-8 right-8 z-10">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
          </svg>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Claude API Key..."
            className="text-xs bg-transparent border-none focus:outline-none text-slate-600 placeholder:text-slate-400 w-48"
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-5xl mx-auto px-8 flex flex-col items-center justify-center h-full relative z-20">

        {/* Sidekick Logo */}
        <div className="mb-8">
          <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
            <path d="M32 4L20 16L32 28L44 16L32 4Z" fill="#86efac" />
            <path d="M32 28L20 40L32 52L44 40L32 28Z" fill="#4ade80" />
            <path d="M20 16L8 28L20 40L32 28L20 16Z" fill="#22c55e" />
            <path d="M44 16L32 28L44 40L56 28L44 16Z" fill="#16a34a" />
          </svg>
        </div>

        {/* Header - Only show if no messages */}
        {messages.length === 0 && !isLoading && (
          <>
            <h1 className="text-4xl font-bold text-slate-900 mb-3 text-center">Hi, how can I help you today?</h1>
            <p className="text-slate-600 text-lg mb-12 text-center">
              All 8 agents from the roadmap are unified into one intelligent interface.<br/>Ask me anything about payroll.
            </p>
          </>
        )}

        {/* Chat Messages */}
        {(messages.length > 0 || isLoading) && (
          <div className="w-full max-w-3xl mb-8 bg-white rounded-2xl shadow-lg border border-slate-200 p-6 max-h-[500px] overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block max-w-[80%] px-4 py-3 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-slate-900 text-white rounded-tr-sm'
                      : 'bg-slate-100 text-slate-800 rounded-tl-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{formatMessageContent(msg.content)}</p>
                </div>
              </div>
            ))}

            {/* Streaming message */}
            {streamingMessage && (
              <div className="mb-4 text-left">
                <div className="inline-block max-w-[80%] px-4 py-3 rounded-2xl bg-slate-100 text-slate-800 rounded-tl-sm">
                  <p className="text-sm whitespace-pre-wrap">{formatMessageContent(streamingMessage)}</p>
                </div>
              </div>
            )}

            {/* Typing indicator */}
            {isLoading && !streamingMessage && (
              <div className="mb-4 text-left">
                <div className="inline-block px-4 py-3 rounded-2xl bg-slate-100 rounded-tl-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Suggestion Cards - Only show if no messages */}
        {messages.length === 0 && !isLoading && (
          <div className="w-full max-w-3xl grid grid-cols-2 gap-4 mb-12">
            <button
              onClick={() => handleSuggestionClick("Show me an employee's current salary and recurring allowances")}
              className="bg-white border border-slate-200 rounded-xl p-3 text-left hover:border-slate-300 hover:shadow-md transition-all group min-h-[72px]"
            >
              <div className="flex items-start gap-3">
                <div className="text-xl mt-0.5">✨</div>
                <p className="text-slate-700 text-sm leading-relaxed group-hover:text-slate-900">
                  Show me an employee's current salary and recurring allowances
                </p>
              </div>
            </button>

            <button
              onClick={() => handleSuggestionClick("Process the next payroll run")}
              className="bg-white border border-slate-200 rounded-xl p-3 text-left hover:border-slate-300 hover:shadow-md transition-all group min-h-[72px]"
            >
              <div className="flex items-start gap-3">
                <div className="text-xl mt-0.5">✨</div>
                <p className="text-slate-700 text-sm leading-relaxed group-hover:text-slate-900">
                  Process the next payroll run
                </p>
              </div>
            </button>

            <button
              onClick={() => handleSuggestionClick("Explain how withholding tax is calculated")}
              className="bg-white border border-slate-200 rounded-xl p-3 text-left hover:border-slate-300 hover:shadow-md transition-all group min-h-[72px]"
            >
              <div className="flex items-start gap-3">
                <div className="text-xl mt-0.5">✨</div>
                <p className="text-slate-700 text-sm leading-relaxed group-hover:text-slate-900">
                  Explain how withholding tax is calculated
                </p>
              </div>
            </button>

            <button
              onClick={() => handleSuggestionClick("Generate the BIR Form 1601C for this month")}
              className="bg-white border border-slate-200 rounded-xl p-3 text-left hover:border-slate-300 hover:shadow-md transition-all group min-h-[72px]"
            >
              <div className="flex items-start gap-3">
                <div className="text-xl mt-0.5">✨</div>
                <p className="text-slate-700 text-sm leading-relaxed group-hover:text-slate-900">
                  Generate the BIR Form 1601C for this month
                </p>
              </div>
            </button>
          </div>
        )}

        {/* Input Area */}
        <div className="w-full max-w-3xl relative">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message Sidekick..."
                disabled={isLoading}
                className="flex-1 text-slate-600 placeholder:text-slate-400 text-base focus:outline-none bg-transparent disabled:opacity-50"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
                className="text-slate-400 hover:text-sprout-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* API Key Required Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[200] animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 animate-scale-in">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-sprout-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-sprout-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">API Key Required</h2>
            <p className="text-slate-600 text-center mb-6 leading-relaxed">
              To test this prototype, please request an API key from the <strong>Sprout Product Team</strong> and enter it in the top-right corner.
            </p>

            <button
              onClick={() => setShowApiKeyModal(false)}
              className="w-full px-6 py-3 bg-sprout-600 hover:bg-sprout-700 text-white font-semibold rounded-lg transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
