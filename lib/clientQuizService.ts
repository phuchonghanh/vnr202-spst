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

export class ClientQuizService {
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