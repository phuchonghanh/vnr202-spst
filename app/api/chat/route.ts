import { NextRequest, NextResponse } from 'next/server';
import { GeminiChatService, ChatMessage } from '@/lib/geminiService';

export async function POST(request: NextRequest) {
  try {
    const { message, chatHistory } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Tin nhắn không hợp lệ' },
        { status: 400 }
      );
    }

    const chatService = new GeminiChatService();
    const response = await chatService.sendMessage(message, chatHistory || []);

    return NextResponse.json({
      success: true,
      response: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Lỗi API chat:', error);
    return NextResponse.json(
      { 
        error: 'Đã có lỗi xảy ra khi xử lý yêu cầu',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const chatService = new GeminiChatService();
    const suggestedQuestions = await chatService.generateSuggestedQuestions();

    return NextResponse.json({
      success: true,
      suggestedQuestions
    });

  } catch (error) {
    console.error('Lỗi khi tạo câu hỏi gợi ý:', error);
    return NextResponse.json(
      { 
        error: 'Không thể tạo câu hỏi gợi ý',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}