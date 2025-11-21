'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Send, Bot, User } from 'lucide-react';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { sendChatMessage } from '@/lib/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI wellness assistant. How can I help you today? You can ask me about services, book appointments, or get answers to your questions.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendChatMessage({
        message: input,
        customerId: session?.user?.email || '',
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message || 'I received your message. How else can I help you?',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again later.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-calm-900 mb-2">
            AI Assistant
          </h1>
          <p className="text-lg text-calm-600">
            Chat with our AI assistant for instant help
          </p>
        </div>

        <Card className="flex flex-col h-[600px]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-sage-100'
                      : 'bg-calm-100'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-sage-700" />
                  ) : (
                    <Bot className="w-4 h-4 text-calm-700" />
                  )}
                </div>
                <div
                  className={`flex-1 max-w-[80%] ${
                    message.role === 'user' ? 'text-right' : ''
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-sage-600 text-white'
                        : 'bg-calm-100 text-calm-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <p className="text-xs text-calm-500 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-calm-100 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-calm-700" />
                </div>
                <div className="bg-calm-100 rounded-lg px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-calm-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-calm-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-calm-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-spa-200 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-lg border border-spa-300 focus:outline-none focus:ring-2 focus:ring-sage-500"
                disabled={loading}
              />
              <Button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </Button>
            </div>
            <p className="text-xs text-calm-500 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mt-6">
          <p className="text-sm text-calm-600 mb-3">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'What services do you offer?',
              'How do I book an appointment?',
              'What are your hours?',
              'Do you accept insurance?',
            ].map((question) => (
              <button
                key={question}
                onClick={() => setInput(question)}
                className="px-3 py-1.5 text-sm bg-white border border-spa-300 rounded-full hover:bg-sage-50 hover:border-sage-300 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
