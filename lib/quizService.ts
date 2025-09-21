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
      if (trimmedLine.match(/^Câu \d+\./)) {
        // Lưu câu hỏi trước đó nếu có
        if (currentQuestion.question && currentQuestion.options && currentQuestion.correctAnswer) {
          questions.push(currentQuestion as QuizQuestion);
        }
        
        // Bắt đầu câu hỏi mới
        questionCounter++;
        currentQuestion = {
          id: questionCounter,
          question: trimmedLine.replace(/^Câu \d+\./, '').trim(),
          options: { A: '', B: '', C: '', D: '' }
        };
      }
      // Phát hiện các đáp án A, B, C, D
      else if (trimmedLine.match(/^\s*[ABCD]\./)) {
        const option = trimmedLine.charAt(trimmedLine.indexOf('. ') - 1) as 'A' | 'B' | 'C' | 'D';
        const optionText = trimmedLine.substring(trimmedLine.indexOf('. ') + 2).trim();
        
        if (currentQuestion.options) {
          currentQuestion.options[option] = optionText;
        }
      }
      // Phát hiện đáp án đúng
      else if (trimmedLine.includes('👉 Đáp án đúng')) {
        const correctMatch = trimmedLine.match(/đúng\s+([ABCD])/);
        if (correctMatch) {
          currentQuestion.correctAnswer = correctMatch[1] as 'A' | 'B' | 'C' | 'D';
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