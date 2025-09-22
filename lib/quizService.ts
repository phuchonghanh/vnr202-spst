import fs from 'fs';
import path from 'path';

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}

export class QuizService {
  private static questions: QuizQuestion[] | null = null;

  static async loadAllQuestions(): Promise<QuizQuestion[]> {
    if (this.questions) {
      return this.questions;
    }

    const quizPath = path.join(process.cwd(), 'public', 'quiz', 'quiz.txt');
    
    try {
      if (!fs.existsSync(quizPath)) {
        console.error('Quiz file not found:', quizPath);
        return [];
      }

      const content = fs.readFileSync(quizPath, 'utf-8');
      const questions = this.parseQuizContent(content);
      
      this.questions = questions;
      return questions;
    } catch (error) {
      console.error('Lỗi khi đọc file quiz:', error);
      return [];
    }
  }

  private static parseQuizContent(content: string): QuizQuestion[] {
    const questions: QuizQuestion[] = [];
    const lines = content.split('\n').filter(line => line.trim() !== '');
    
    let currentQuestion: Partial<QuizQuestion> = {};
    let questionCounter = 0;

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Phát hiện câu hỏi mới
      if (trimmedLine.match(/^Câu \d+[\.\s]/)) {
        // Lưu câu hỏi trước đó nếu có
        if (currentQuestion.question && currentQuestion.options && currentQuestion.correctAnswer) {
          questions.push(currentQuestion as QuizQuestion);
        }
        
        // Bắt đầu câu hỏi mới
        questionCounter++;
        currentQuestion = {
          id: questionCounter,
          question: trimmedLine.replace(/^Câu \d+[\.\s]/, '').trim(),
          options: { A: '', B: '', C: '', D: '' }
        };
      }
      // Phát hiện các đáp án A, B, C, D (hỗ trợ cả viết hoa và viết thường)
      else if (trimmedLine.match(/^\s*[ABCDabcd][\.\s]/)) {
        const optionMatch = trimmedLine.match(/^\s*([ABCDabcd])[\.\s](.+)$/);
        if (optionMatch && currentQuestion.options) {
          const option = optionMatch[1].toUpperCase() as 'A' | 'B' | 'C' | 'D';
          let optionText = optionMatch[2].trim();
          
          // Kiểm tra nếu có ✅ trong đáp án
          if (optionText.includes('✅')) {
            optionText = optionText.replace('✅', '').trim();
            currentQuestion.correctAnswer = option;
          }
          
          currentQuestion.options[option] = optionText;
        }
      }
      // Phát hiện đáp án đúng theo format "👉 Đáp án đúng [chữ cái]"
      else if (trimmedLine.includes('👉 Đáp án đúng')) {
        const correctMatch = trimmedLine.match(/đúng\s+([ABCDabcd])/i);
        if (correctMatch) {
          currentQuestion.correctAnswer = correctMatch[1].toUpperCase() as 'A' | 'B' | 'C' | 'D';
        }
      }
    }

    // Lưu câu hỏi cuối cùng
    if (currentQuestion.question && currentQuestion.options && currentQuestion.correctAnswer) {
      questions.push(currentQuestion as QuizQuestion);
    }

    return questions;
  }

  static async getRandomQuestions(count: number = 10): Promise<QuizQuestion[]> {
    const allQuestions = await this.loadAllQuestions();
    
    if (allQuestions.length <= count) {
      return allQuestions;
    }

    // Shuffle array và lấy số lượng câu hỏi cần thiết
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  static calculateScore(userAnswers: Record<number, string>, questions: QuizQuestion[]): {
    score: number;
    total: number;
    percentage: number;
    details: Array<{
      question: QuizQuestion;
      userAnswer: string;
      isCorrect: boolean;
    }>;
  } {
    const details = questions.map(question => {
      const userAnswer = userAnswers[question.id] || '';
      const isCorrect = userAnswer === question.correctAnswer;
      
      return {
        question,
        userAnswer,
        isCorrect
      };
    });

    const score = details.filter(detail => detail.isCorrect).length;
    const total = questions.length;
    const percentage = Math.round((score / total) * 100);

    return {
      score,
      total,
      percentage,
      details
    };
  }
}