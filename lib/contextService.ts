import fs from 'fs';
import path from 'path';

export interface ContextData {
  fileName: string;
  content: string;
  category: 'thực tiễn' | 'lý luận' | 'nhân tố chủ quan';
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
      // Đọc file cơ sở thực tiễn
      const thucTienPath = path.join(contextPath, 'cơ sở thực tiễn.txt');
      if (fs.existsSync(thucTienPath)) {
        const content = fs.readFileSync(thucTienPath, 'utf-8');
        contextData.push({
          fileName: 'cơ sở thực tiễn.txt',
          content: content,
          category: 'thực tiễn'
        });
      }

      // Đọc file nhân tố chủ quan
      const nhanToPath = path.join(contextPath, 'nhân tố chủ quan Hồ Chí Minh.txt');
      if (fs.existsSync(nhanToPath)) {
        const content = fs.readFileSync(nhanToPath, 'utf-8');
        contextData.push({
          fileName: 'nhân tố chủ quan Hồ Chí Minh.txt',
          content: content,
          category: 'nhân tố chủ quan'
        });
      }

      // Đọc các file trong thư mục cơ sở lý luận
      const lyLuanPath = path.join(contextPath, 'cơ sở lý luận');
      if (fs.existsSync(lyLuanPath)) {
        const lyLuanFiles = fs.readdirSync(lyLuanPath);
        
        for (const file of lyLuanFiles) {
          if (file.endsWith('.txt')) {
            const filePath = path.join(lyLuanPath, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            contextData.push({
              fileName: file,
              content: content,
              category: 'lý luận'
            });
          }
        }
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
    
    let contextString = `Đây là tài liệu về "Cơ sở hình thành tư tưởng Hồ Chí Minh":\n\n`;
    
    contextData.forEach((data, index) => {
      contextString += `=== ${data.fileName.replace('.txt', '').toUpperCase()} ===\n`;
      contextString += `${data.content}\n\n`;
    });

    contextString += `\nHướng dẫn trả lời:
- Ưu tiên sử dụng thông tin từ tài liệu trên để trả lời câu hỏi
- Nếu câu hỏi không liên quan đến tài liệu, hãy trả lời ngắn gọn và lịch sự
- Luôn trả lời bằng tiếng Việt
- Nếu không có thông tin trong tài liệu, hãy nói rõ điều đó`;

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