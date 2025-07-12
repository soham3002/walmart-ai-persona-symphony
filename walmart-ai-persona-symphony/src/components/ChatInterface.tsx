
import React, { useState, useEffect, useRef } from 'react';
import { Send, ShoppingCart, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EmotionAnalyzer } from './EmotionAnalyzer';
import { ProductRecommendations } from './ProductRecommendations';
import { SmartCart } from './SmartCart';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  emotion?: string;
  products?: any[];
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your Walmart AI Personal Shopper. I'm here to help you find exactly what you need, suggest great deals, and make your shopping experience delightful. What can I help you find today?",
      timestamp: new Date(),
      emotion: 'friendly'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [customerEmotion, setCustomerEmotion] = useState('neutral');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processUserMessage = async (message: string) => {
    // Analyze emotion from user input
    const emotion = EmotionAnalyzer.analyzeText(message);
    setCustomerEmotion(emotion);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
      emotion
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = generateAIResponse(message, emotion);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string, emotion: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Intent classification and response generation
    if (lowerMessage.includes('frustrated') || emotion === 'frustrated') {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: "I understand you're feeling frustrated, and I'm here to help make this easier for you. Let me find exactly what you need quickly. Can you tell me what specific product you're looking for?",
        timestamp: new Date(),
        emotion: 'empathetic'
      };
    }
    
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: "I'd love to give you personalized recommendations! Based on popular choices and great value, here are some items I think you'll love:",
        timestamp: new Date(),
        emotion: 'helpful',
        products: [
          { id: 1, name: 'Samsung 55" 4K Smart TV', price: 2.48, category: 'Groceries', rating: 4.5 },
          { id: 2, name: 'iPhone 15 Pro', price: 11.97, category: 'Household', rating: 4.7 },
          { id: 3, name: 'Samsung 55" 4K Smart TV', price: 398.00, category: 'Electronics', rating: 4.6 }
        ]
      };
    }

    if (lowerMessage.includes('electronics') || lowerMessage.includes('tv') || lowerMessage.includes('phone')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: "Great choice! Electronics are one of our strongest categories. Here are some top-rated electronics with excellent value:",
        timestamp: new Date(),
        emotion: 'excited',
        products: [
          { id: 4, name: 'iPhone 15', price: 699.00, category: 'Electronics', rating: 4.8 },
          { id: 5, name: 'Samsung Galaxy Buds', price: 89.99, category: 'Electronics', rating: 4.4 },
          { id: 6, name: 'Nintendo Switch', price: 299.00, category: 'Electronics', rating: 4.9 }
        ]
      };
    }

    if (lowerMessage.includes('groceries') || lowerMessage.includes('food')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: "Perfect! Let me help you with fresh groceries and pantry essentials. Here are some popular items:",
        timestamp: new Date(),
        emotion: 'helpful',
        products: [
          { id: 7, name: 'Great Value Whole Milk', price: 3.18, category: 'Groceries', rating: 4.3 },
          { id: 8, name: 'Wonder Bread', price: 1.28, category: 'Groceries', rating: 4.1 },
          { id: 9, name: 'Fresh Strawberries', price: 4.98, category: 'Groceries', rating: 4.6 }
        ]
      };
    }

    // Default response with general recommendations
    return {
      id: Date.now().toString(),
      type: 'ai',
      content: "I'm here to help! I can assist you with finding products, checking prices, getting recommendations, or answering questions about our services. What would you like to explore?",
      timestamp: new Date(),
      emotion: 'friendly'
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      processUserMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-white">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Walmart AI Personal Shopper</h2>
            <p className="text-blue-100 text-sm">Your intelligent shopping assistant</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl shadow-sm ${
              message.type === 'user' 
                ? 'bg-blue-600 text-white rounded-br-md' 
                : 'bg-white text-gray-800 rounded-bl-md border'
            }`}>
              <p className="text-sm leading-relaxed">{message.content}</p>
              {message.products && (
                <ProductRecommendations products={message.products} />
              )}
              <p className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md border shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything... 'Show me electronics', 'I need groceries', 'Recommend something'"
            className="flex-1 rounded-full border-2 border-gray-200 focus:border-blue-500 px-4 py-3"
          />
          <Button 
            type="submit" 
            size="lg"
            disabled={!inputValue.trim()}
            className="rounded-full bg-blue-600 hover:bg-blue-700 px-6"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
