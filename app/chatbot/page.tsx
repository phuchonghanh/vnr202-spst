'use client';

import { useEffect, useState, useRef } from 'react';
import { useChat } from '@/hooks/useChat';
import Link from 'next/link';

export default function ChatbotPage() {
  const { 
    messages, 
    isLoading, 
    error, 
    sendMessage, 
    clearChat, 
    suggestedQuestions,
    loadSuggestedQuestions 
  } = useChat();
  
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSuggestedQuestions();
  }, [loadSuggestedQuestions]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage;
    if (messageToSend.trim()) {
      await sendMessage(messageToSend);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestionClick = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(to bottom, 
              #374151 0%, 
              #1f2937 100%
            )
          `,
        }}
      >
        {/* Star */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-white text-8xl opacity-20">
            ⭐
          </div>
        </div>
        {/* Overlay pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 1px),
                radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1px, transparent 1px),
                radial-gradient(circle at 40% 60%, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px, 150px 150px, 200px 200px'
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex">
        {/* Left Sidebar - Suggested Questions */}
        <div className="w-80 bg-black bg-opacity-20 backdrop-blur-sm border-r border-white border-opacity-20 p-4 overflow-y-auto">
          <div className="mb-4">
            <Link href="/">
              <button className="w-full bg-white hover:bg-gray-100 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                ← Về trang chủ
              </button>
            </Link>
          </div>
          
          <h2 className="text-white font-bold text-lg mb-4 text-center">
            🇻🇳 Câu hỏi sẵn có
          </h2>
          
          <div className="space-y-3">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestionClick(question)}
                className="w-full text-left p-3 bg-white bg-opacity-90 hover:bg-opacity-95 backdrop-blur-sm rounded-lg transition-all duration-300 text-gray-800 text-sm border border-gray-300 border-opacity-50 hover:border-opacity-70 transform hover:scale-105 hover:shadow-lg"
                disabled={isLoading}
              >
                <div className="flex items-start space-x-2">
                  <span className="text-gray-800 mt-1">📝</span>
                  <span className="leading-relaxed font-medium">{question}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-black bg-opacity-30 backdrop-blur-sm text-white p-4 border-b border-white border-opacity-20">
            <h1 className="text-2xl font-bold text-center">
              🌟 Chatbot Tư tưởng Hồ Chí Minh 🌟
            </h1>
            <p className="text-gray-300 text-center mt-1">
              Hỏi đáp về Đảng Cộng sản Việt Nam ra đời và Cương lĩnh chính trị đầu tiên của Đảng
            </p>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-white bg-black bg-opacity-20 backdrop-blur-sm p-8 rounded-xl border border-white border-opacity-20">
                  <div className="text-6xl mb-4">🤖</div>
                  <p className="text-xl mb-2">Xin chào!</p>
                  <p className="text-gray-300">Tôi là chatbot hỗ trợ tìm hiểu về khoảng thời gian Đảng ra đời và thời kì trước Cách Mạng Tháng 8.</p>
                  <p className="text-gray-300">Hãy chọn câu hỏi bên trái hoặc nhập câu hỏi của bạn!</p>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex items-start space-x-2 max-w-2xl">
                      {message.role !== 'user' && (
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold mt-1">
                          🤖
                        </div>
                      )}
                      <div>
                        <div
                          className={`p-4 rounded-xl backdrop-blur-sm border border-opacity-20 ${
                            message.role === 'user'
                              ? 'bg-blue-600 bg-opacity-80 text-white border-blue-300'
                              : 'bg-white bg-opacity-90 text-gray-800 border-gray-300'
                          }`}
                        >
                          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        </div>
                        <div className="flex items-center mt-1 space-x-2">
                          <p className={`text-xs ${
                            message.role === 'user' ? 'text-blue-200' : 'text-white'
                          }`}>
                            {message.timestamp.toLocaleTimeString('vi-VN')}
                          </p>
                        </div>
                      </div>
                      {message.role === 'user' && (
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mt-1">
                          👤
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
                        🤖
                      </div>
                      <div className="bg-white bg-opacity-90 backdrop-blur-sm p-4 rounded-xl border border-gray-300 border-opacity-20">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          <span className="text-gray-600 ml-2">AI đang suy nghĩ...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-black bg-opacity-30 backdrop-blur-sm border-t border-white border-opacity-20">
            <div className="flex space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập câu hỏi của bạn..."
                  className="w-full p-4 bg-white bg-opacity-90 backdrop-blur-sm border border-gray-300 border-opacity-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-800 placeholder-gray-500"
                  disabled={isLoading}
                />
              </div>
                <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-white hover:bg-gray-100 disabled:bg-gray-400 text-black font-semibold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-lg"
              >
                {isLoading ? 'Đang gửi...' : '📤 Gửi'}
              </button>
            </div>
            
            {error && (
              <div className="mt-2 text-red-300 text-sm bg-red-900 bg-opacity-50 p-2 rounded-lg backdrop-blur-sm">
                ❌ Lỗi: {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}