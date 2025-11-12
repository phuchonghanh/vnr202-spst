'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ClientQuizService, QuizQuestion } from '@/lib/clientQuizService';

interface UserAnswer {
  [questionId: number]: string;
}

export default function Quiz() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const response = await fetch('/api/quiz');
      const result = await response.json();
      
      if (result.success) {
        setQuestions(result.data);
      } else {
        console.error('Lỗi API:', result.error);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Lỗi khi tải câu hỏi:', error);
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (option: string) => {
    if (isQuizComplete) return;

    const currentQuestion = questions[currentQuestionIndex];
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: option
    }));

    // Tự động chuyển câu tiếp theo sau 1 giây
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Kết thúc quiz và tính điểm
        finishQuiz();
      }
    }, 1000);
  };

  const finishQuiz = async () => {
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: userAnswers,
          questions: questions
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setQuizResult(result.data);
        setIsQuizComplete(true);
      } else {
        console.error('Lỗi khi tính điểm:', result.error);
        // Fallback: tính điểm client-side
        const clientResult = ClientQuizService.calculateScore(userAnswers, questions);
        setQuizResult(clientResult);
        setIsQuizComplete(true);
      }
    } catch (error) {
      console.error('Lỗi khi gửi kết quả:', error);
      // Fallback: tính điểm client-side
      const clientResult = ClientQuizService.calculateScore(userAnswers, questions);
      setQuizResult(clientResult);
      setIsQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsQuizComplete(false);
    setQuizResult(null);
    setIsLoading(true);
    loadQuestions();
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-green-600';
    return 'text-gray-600';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-yellow-500 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-4">Đang tải câu hỏi...</h2>
          <button
            onClick={() => router.push('/')}
            className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  if (isQuizComplete && quizResult) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/background-img/vietnam-flag.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              🎉 Kết quả Quiz
            </h1>
            
            <div className="mb-8">
              <div className={`text-6xl font-bold mb-4 ${getScoreColor(quizResult.percentage)}`}>
                {quizResult.score}/{quizResult.total}
              </div>
              <div className={`text-3xl font-semibold ${getScoreColor(quizResult.percentage)}`}>
                {quizResult.percentage}%
              </div>
            </div>

            <div className="mb-8">
              {quizResult.percentage >= 80 && (
                <div className="text-2xl text-green-600 font-bold">
                  🏆 Xuất sắc! Bạn hiểu rất rõ về tư tưởng Hồ Chí Minh!
                </div>
              )}
              {quizResult.percentage >= 60 && quizResult.percentage < 80 && (
                <div className="text-2xl text-green-600 font-bold">
                  👍 Khá tốt! Bạn cần ôn luyện thêm một chút.
                </div>
              )}
              {quizResult.percentage < 60 && (
                <div className="text-2xl text-gray-600 font-bold">
                  📚 Hãy học thêm về tư tưởng Hồ Chí Minh nhé!
                </div>
              )}
            </div>

            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => router.push('/')}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-2xl text-xl transition-colors duration-200"
              >
                Trang chủ
              </button>
              <button
                onClick={restartQuiz}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-2xl text-xl transition-colors duration-200"
              >
                Làm lại Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-yellow-500 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy câu hỏi nào!</h2>
          <button
            onClick={() => router.push('/')}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg"
          >
            ← Trở về trang chủ
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const hasAnswered = userAnswers[currentQuestion.id];

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/background-img/vietnam-flag.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center text-white">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg"
              >
                <span>←</span>
                <span>Trang chủ</span>
              </button>
              <h1 className="text-2xl font-bold">Quiz Tư tưởng Hồ Chí Minh</h1>
            </div>
            <div className="text-lg font-semibold">
              {currentQuestionIndex + 1}/{questions.length}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white bg-opacity-20 p-2">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white bg-opacity-30 rounded-full h-3">
              <div 
                className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Section */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-6xl w-full">
            {/* Question */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(currentQuestion.options).map(([option, text]) => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={!!hasAnswered}
                  className={`
                    p-6 rounded-2xl text-white font-bold text-xl md:text-2xl 
                    transition-all duration-200 transform hover:scale-105
                    ${hasAnswered 
                      ? hasAnswered === option
                        ? hasAnswered === currentQuestion.correctAnswer
                          ? 'bg-green-600 shadow-green-300'
                          : 'bg-red-600 shadow-red-300'
                        : option === currentQuestion.correctAnswer
                          ? 'bg-green-600 shadow-green-300'
                          : 'bg-gray-600'
                      : option === 'A' 
                        ? 'bg-red-500 hover:bg-red-600 shadow-red-300'
                        : option === 'B'
                          ? 'bg-blue-500 hover:bg-blue-600 shadow-blue-300'
                          : option === 'C'
                            ? 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-300'
                            : 'bg-green-500 hover:bg-green-600 shadow-green-300'
                    }
                    shadow-lg hover:shadow-xl
                    ${!hasAnswered ? 'cursor-pointer' : 'cursor-default'}
                  `}
                >
                  <div className="flex items-center justify-center min-h-[80px]">
                    <span className="text-center leading-tight">
                      <strong className="block text-3xl mb-2">{option}</strong>
                      {text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}