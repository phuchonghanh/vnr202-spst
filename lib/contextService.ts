import fs from 'fs';
import path from 'path';

export interface ContextData {
  fileName: string;
  content: string;
  category: 'đảng cộng sản';
}

export class ContextService {
  private static contextData: ContextData[] | null = null;

  static async loadAllContext(): Promise<ContextData[]> {
    if (this.contextData) {
      return this.contextData;
    }

    const contextPath = path.join(process.cwd(), 'public', 'context');
    const contextData: ContextData[] = [];

    try {
      // Đọc file giáo trình chính
      const giaoTrinhPath = path.join(contextPath, 'giao-trinh.txt');
      if (fs.existsSync(giaoTrinhPath)) {
        const content = fs.readFileSync(giaoTrinhPath, 'utf-8');
        contextData.push({
          fileName: 'giao-trinh.txt',
          content: content,
          category: 'đảng cộng sản'
        });
      }

      this.contextData = contextData;
      return contextData;
    } catch (error) {
      console.error('Lỗi khi đọc context files:', error);
      return [];
    }
  }

  static async getContextAsString(): Promise<string> {
    const contextData = await this.loadAllContext();
    
    let contextString = `Đây là tài liệu về "Đảng Cộng sản Việt Nam ra đời và Cương lĩnh chính trị đầu tiên của Đảng":\n\n`;
    
    contextData.forEach((data, index) => {
      contextString += `=== ${data.fileName.replace('.txt', '').toUpperCase()} ===\n`;
      contextString += `${data.content}\n\n`;
    });

    contextString += `\nHướng dẫn trả lời:
- Ưu tiên sử dụng thông tin từ tài liệu trên để trả lời câu hỏi
- Nếu câu hỏi không liên quan đến tài liệu, hãy nói rằng tài liệu không có thông tin này, nhưng tôi vẫn sẽ cố gắng trả lời dựa trên kiến thức chung
- Luôn trả lời bằng tiếng Việt và tập trung vào chủ đề Đảng Cộng sản Việt Nam ra đời`;

    return contextString;
  }

  static async searchInContext(query: string): Promise<ContextData[]> {
    const allContext = await this.loadAllContext();
    const queryLower = query.toLowerCase();
    
    return allContext.filter(data => 
      data.content.toLowerCase().includes(queryLower) ||
      data.fileName.toLowerCase().includes(queryLower)
    );
  }
}