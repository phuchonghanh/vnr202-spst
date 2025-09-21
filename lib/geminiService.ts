import { GoogleGenerativeAI } from '@google/generative-ai';
import { ContextService } from './contextService';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export class GeminiChatService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private systemContext: string = '';

  constructor() {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_API_KEY not found in environment variables');
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    this.initializeContext();
  }

  private async initializeContext(): Promise<void> {
    try {
      this.systemContext = await ContextService.getContextAsString();
    } catch (error) {
      console.error('Lỗi khi khởi tạo context:', error);
      this.systemContext = 'Tôi là chatbot hỗ trợ tìm hiểu về tư tưởng Hồ Chí Minh.';
    }
  }

  async sendMessage(
    userMessage: string, 
    chatHistory: ChatMessage[] = []
  ): Promise<string> {
    try {
      // Đảm bảo context đã được load
      if (!this.systemContext) {
        await this.initializeContext();
      }

      // Tạo prompt với context và lịch sử chat
      let prompt = `${this.systemContext}\n\n`;
      
      // Thêm lịch sử chat gần đây (giới hạn 5 tin nhắn cuối)
      const recentHistory = chatHistory.slice(-5);
      if (recentHistory.length > 0) {
        prompt += "Lịch sử cuộc trò chuyện gần đây:\n";
        recentHistory.forEach(msg => {
          prompt += `${msg.role === 'user' ? 'Người dùng' : 'Trợ lý'}: ${msg.content}\n`;
        });
        prompt += "\n";
      }

      prompt += `Câu hỏi của người dùng: ${userMessage}\n\nTrả lời:`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return text || 'Xin lỗi, tôi không thể tạo phản hồi lúc này.';
    } catch (error) {
      console.error('Lỗi khi gọi Gemini API:', error);
      return 'Xin lỗi, đã có lỗi xảy ra khi xử lý câu hỏi của bạn. Vui lòng thử lại sau.';
    }
  }

  async generateSuggestedQuestions(): Promise<string[]> {
    try {
      const prompt = `${this.systemContext}\n\n
      Dựa trên tài liệu trên, hãy tạo 5 câu hỏi gợi ý thú vị mà người dùng có thể hỏi về tư tưởng Hồ Chí Minh. 
      Mỗi câu hỏi trên một dòng, không đánh số, ngắn gọn và dễ hiểu.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Tách thành array và loại bỏ dòng trống
      const questions = text.split('\n')
        .map((q: string) => q.trim())
        .filter((q: string) => q.length > 0 && !q.match(/^\d+\./))
        .slice(0, 5);

      return questions.length > 0 ? questions : [
        'Cơ sở thực tiễn hình thành tư tưởng Hồ Chí Minh là gì?',
        'Hồ Chí Minh đã kế thừa những giá trị truyền thống nào của dân tộc?',
        'Chủ nghĩa Mác-Lênin ảnh hưởng như thế nào đến tư tưởng Hồ Chí Minh?',
        'Nhân tố chủ quan nào đã hình thành nên Hồ Chí Minh?',
        'Tư tưởng Hồ Chí Minh có đóng góp gì cho cách mạng Việt Nam?'
      ];
    } catch (error) {
      console.error('Lỗi khi tạo câu hỏi gợi ý:', error);
      return [
        'Cơ sở thực tiễn hình thành tư tưởng Hồ Chí Minh là gì?',
        'Hồ Chí Minh đã kế thừa những giá trị truyền thống nào của dân tộc?',
        'Chủ nghĩa Mác-Lênin ảnh hưởng như thế nào đến tư tưởng Hồ Chí Minh?',
        'Nhân tố chủ quan nào đã hình thành nên Hồ Chí Minh?',
        'Tư tưởng Hồ Chí Minh có đóng góp gì cho cách mạng Việt Nam?'
      ];
    }
  }
}